#!/usr/bin/env python3
"""Schematic urban plans constrained by the traced GCT land, parks and stations.

Not a recovery of official building footprints. Streets are authored here;
frontage parcels follow those street blocks, with deterministic varied forms.
Requires Shapely and NumPy. The generated polygons serve SVG and 3D together.
"""
import hashlib
import json
import math
from pathlib import Path
import numpy as np
from shapely.geometry import Polygon, LineString, MultiPolygon, box
from shapely.geometry.polygon import orient
from shapely.ops import unary_union, split

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/data/gct-regions.json'
DATA = json.loads(SOURCE.read_text())
LANDMARK_SOURCE = ROOT / 'src/data/gotham-landmarks.json'
LANDMARKS = json.loads(LANDMARK_SOURCE.read_text())
DOWNTOWN_SITES = {'gsg':[612,990], 'city-hall':[641,1018], 'park-row':[653,1068], 'gcpd':[670,1044], 'iceberg':[632,1245], 'riddler-room':[624,1256], 'crown-point':[731.22,1264.81], 'seawall':[753.5,1333.7]}
STREETS = {
 'downtown': [
  [[600,1243],[629,1239],[660,1231],[687,1201],[724,1185],[745,1206],[779,1231]],
  [[597,1265],[629,1262],[663,1258],[692,1241],[737,1249],[782,1262]],
  [[600,1287],[639,1287],[673,1282],[720,1282],[776,1294]],
  [[615,1310],[650,1308],[680,1308],[718,1303],[769,1314]],
  [[635,1342],[679,1332],[713,1334],[748,1332]],
  [[650,1239],[651,1265],[653,1292],[669,1335]],
  [[701,1210],[691,1246],[692,1279],[705,1319],[711,1340]],
  [[736,1226],[744,1260],[739,1299],[741,1321]],
  [[483,987],[529,996],[569,997],[589,986],[616,970],[662,969],[719,952],[754,962]],
  [[478,1025],[534,1018],[572,1028],[611,1034],[663,1031],[719,1023],[772,1020],[845,1030]],
  [[495,1071],[536,1061],[572,1068],[608,1062],[655,1049],[709,1044],[755,1042],[851,1060]],
  [[520,1108],[560,1100],[608,1095],[660,1093],[723,1080],[779,1082],[849,1095]],
  [[545,1138],[590,1128],[634,1138],[681,1135],[728,1123],[778,1120],[835,1140]],
  [[541,1165],[592,1157],[637,1152],[683,1154]],
  [[568,1187],[610,1190],[650,1198]],
  [[532,1000],[538,1058],[560,1100],[568,1123],[574,1174]],
  [[577,969],[587,1012],[580,1059],[594,1107],[609,1151],[613,1190]],
  [[639,942],[635,971],[651,998],[656,1030],[679,1066],[672,1112],[667,1159]],
  [[706,946],[704,989],[710,1020],[721,1057],[736,1094],[741,1121]],
  [[763,985],[780,1020],[793,1062],[799,1104],[804,1144]],
  [[822,1050],[830,1090],[825,1131]],
 ],
 'uptown': [
  [[60,55],[81,92],[119,147],[143,210],[185,247]],
  [[103,39],[110,87],[147,123],[220,126],[294,141],[331,156]],
  [[47,75],[86,72],[127,84]], [[48,107],[88,112],[132,134],[208,146],[260,165],[287,184]],
  [[173,62],[204,103],[220,126],[238,184],[266,219],[325,224]],
  [[94,204],[130,194],[167,201],[203,217],[251,228],[282,226]],
  [[181,179],[202,165],[237,165]],
  [[160,258],[202,273],[251,278],[307,278],[348,292],[401,337],[463,373]],
  [[147,342],[191,334],[215,323],[239,317],[287,312],[319,312],[336,349],[381,365],[454,398]],
  [[225,279],[225,323],[225,362],[221,406],[215,444],[203,484]],
  [[326,280],[326,322],[325,367],[323,422],[326,475]],
  [[143,399],[182,401],[210,406],[231,421]],
  [[344,336],[368,321],[385,328]],
  [[338,387],[381,390],[404,410],[409,449],[386,478]],
  [[145,463],[182,480],[215,480],[254,482],[297,462],[341,468],[363,498]],
  [[170,494],[170,518],[216,510]],
  [[360,451],[402,458],[439,432]],
 ],
 'midtown': [
  [[179,587],[222,577],[273,577],[287,612]],
  [[182,614],[233,618],[254,628],[276,636]],
  [[178,650],[208,651],[230,663],[244,691],[263,723],[279,759],[285,802],[303,833],[332,884],[352,931]],
  [[320,609],[320,648],[347,674],[373,700],[392,735],[396,771]],
  [[272,596],[314,611],[359,629],[405,654]],
  [[335,642],[366,650],[393,672]],
  [[207,694],[228,698],[244,718]],
  [[232,768],[267,753],[283,743]],
  [[317,793],[354,780],[391,780],[435,795]],
  [[327,819],[366,808],[397,810],[434,833]],
  [[328,860],[358,853],[395,844],[415,824]],
  [[330,885],[359,884],[399,898]],
  [[312,915],[351,914],[382,913]],
  [[333,968],[359,973],[382,969]],
  [[370,810],[360,839],[356,883],[363,931],[360,966]],
  [[84,678],[88,710],[102,741],[110,782],[129,809],[133,861],[150,903],[178,947]],
  [[66,718],[100,709],[116,697]],
  [[59,784],[96,778],[132,792]],
  [[84,826],[128,844],[151,864]],
  [[67,881],[109,879],[145,891]],
  [[77,933],[133,932],[174,953],[213,987]],
 ]
}

def polygons(value):
 if value.is_empty: return []
 if value.geom_type == 'Polygon': return [value]
 return [p for p in getattr(value, 'geoms', []) if p.geom_type == 'Polygon']

def coords(value):
 return [[round(x, 3), round(y, 3)] for x,y in value.exterior.coords[:-1]]

result = {}
for region_id, region in DATA['regions'].items():
 land = unary_union([Polygon(p).buffer(0) for p in region['land']])
 urban_land = Polygon(region['land'][0]).buffer(0) if region_id == 'uptown' else land
 protected = unary_union([Polygon(f['polygon']) for f in region['features']]).buffer(2)
 if region_id == 'downtown':
  left, top, width, height = region['frame']
  sites = [Polygon([[center[0]+x*width/100*LANDMARKS[id]['siteScale'],center[1]+y*height/100*LANDMARKS[id]['siteScale']] for x,y in LANDMARKS[id]['footprint']]) for id,center in DOWNTOWN_SITES.items()]
  site = sites[0]
  protected = unary_union([protected,*[p.buffer(1) for p in sites]])
 elif region_id == 'midtown':
  site = box(374,815,406,847)
 else: site = Polygon(region['features'][0]['polygon'])
 protected = unary_union([protected, site.buffer(1)])
 if region_id == 'uptown':
  orphanage = region['orphanage']
  orphanage_site = Polygon(orphanage['site'])
 authored = [LineString(p) for p in STREETS[region_id]]
 major_roads = unary_union([line.buffer(1.8, cap_style=2, join_style=2) for line in authored])
 parcels = polygons(urban_land.buffer(-3).difference(unary_union([major_roads, protected])))
 # Split only oversized existing street blocks along their own long axis.
 # Short internal lanes stop at the block boundary, rather than forming a citywide grid.
 lanes = []
 blocks = []
 queue = [(p, 0) for p in parcels]
 while queue:
  poly, depth = queue.pop(0)
  if poly.area < 55: continue
  if poly.area < 900 or depth >= 4:
   blocks.append(poly)
   continue
  bounds = list(poly.minimum_rotated_rectangle.exterior.coords)
  vectors = [np.array(bounds[(i+1)%4])-bounds[i] for i in range(4)]
  long = max(vectors, key=lambda v: np.linalg.norm(v))
  long = long / np.linalg.norm(long)
  cross = np.array([-long[1], long[0]])
  center = np.array(poly.centroid.coords[0]) + long * ((depth%3 - 1)*2.3)
  lane = LineString([center-cross*250, center+cross*250]).intersection(poly)
  smaller = polygons(poly.difference(lane.buffer(.95)))
  if len(smaller) <= 1:
   blocks.append(poly)
  else:
   lanes.append(lane.buffer(.95))
   queue.extend((p,depth+1) for p in smaller)
 road_surface = unary_union([major_roads,*lanes]).intersection(land)
 if region_id == 'uptown':
  driveway = LineString([[42,107],[54,103],[62,96]]).buffer(1.2,cap_style=2)
  road_surface = unary_union([road_surface.difference(orphanage_site.buffer(1)),driveway]).intersection(land)
 buildings=[]
 occupied=[]
 for block_index, block in enumerate(blocks):
  inset = block.buffer(-.8)
  for parcel in polygons(inset):
   parcel = orient(parcel, sign=1)
   edges = list(parcel.exterior.coords)
   for edge_index, (a,b) in enumerate(zip(edges,edges[1:])):
    a,b = np.array(a),np.array(b)
    length=np.linalg.norm(b-a)
    if length < 5.5: continue
    direction=(b-a)/length
    inward=np.array([-direction[1],direction[0]])
    offset=.5
    k=0
    while offset+4 < length:
     seed=block_index*11+edge_index*7+k*13
     width=[5.4,8.2,6.1,10.4,7.3,4.6,11.3][seed%7]
     width=min(width,length-offset-.7)
     depth=[5.2,7.4,9.1,6.5,11.2][(seed//3)%5]
     if region_id=='uptown' and parcel.centroid.y<220:depth*=1.3; width*=1.12
     if width<3.8:break
     start=a+direction*offset
     # Rectangular, chamfered, L and open courtyard footprints share frontage.
     kind=seed%4
     if kind==0: local=[(0,0),(width,0),(width,depth),(0,depth)]
     elif kind==1:local=[(.8,0),(width-.8,0),(width,.8),(width,depth),(0,depth),(0,.8)]
     elif kind==2:local=[(0,0),(width,0),(width,depth*.5),(width*.6,depth*.5),(width*.6,depth),(0,depth)]
     else:local=[(0,0),(width,0),(width,depth),(width*.72,depth),(width*.72,depth*.42),(width*.3,depth*.42),(width*.3,depth),(0,depth)]
     shape=Polygon([start+direction*x+inward*y for x,y in local]).intersection(parcel)
     for candidate in polygons(shape):
      if candidate.area<14 or any(candidate.intersection(other).area>.1 for other in occupied[-400:]):continue
      # Heights reflect illustrative typologies, not measurements.
      h=.17+(seed%17)*.025
      if region_id=='midtown' and 785<candidate.centroid.y<880:h*=1.5
      if region_id=='uptown' and candidate.centroid.y<220:h*=.68
      if candidate.area>75:h*=.72
      occupied.append(candidate)
      buildings.append(dict(id=f'{region_id}-{len(buildings)}',polygon=coords(candidate),height=round(h,3),roof=kind))
     offset+=width+[1.1,1.8,2.4][seed%3]
     k+=1
 if region_id == 'uptown':
  highlands = Polygon(next(f['polygon'] for f in region['features'] if f['id']=='gotham-heights-estates'))
  house_land = highlands.buffer(-2).difference(unary_union([orphanage_site.buffer(4),road_surface.buffer(1)]))
  homes = [(81,29),(108,28),(120,48),(42,66),(48,89),(50,114),(72,119),(104,116),(123,113),(130,96),(130,71),(59,46),(70,52),(30,119)]
  for index,(x,y) in enumerate(homes):
   width,depth = 7+index%4, 6+(index*3)%5
   angle = math.radians([0,14,-12,28][index%4])
   outline = [(-width/2,-depth/2),(width/2,-depth/2),(width/2,depth/2),(-width/2,depth/2)]
   if index%3==0: outline = [(-width/2,-depth/2),(width/2,-depth/2),(width/2,0),(width*.2,0),(width*.2,depth/2),(-width/2,depth/2)]
   shape = Polygon([[x+a*math.cos(angle)-b*math.sin(angle),y+a*math.sin(angle)+b*math.cos(angle)] for a,b in outline]).intersection(house_land)
   for candidate in polygons(shape):
    if candidate.area<18: continue
    buildings.append(dict(id=f'uptown-estate-{index}',polygon=coords(candidate),height=round(.14+(index%5)*.025,3),roof=index%4,district='gotham-heights'))
 roads=[dict(polygon=coords(p),holes=[[[round(x,3),round(y,3)] for x,y in h.coords[:-1]] for h in p.interiors]) for p in polygons(road_surface)]
 result[region_id]=dict(roads=roads,buildings=buildings,sitePolygon=coords(site),landmarkCenter=[390,831] if region_id=='midtown' else [273,392])
 if region_id=='downtown':
  result[region_id]['sitePolygons'] = [coords(p) for p in sites]
  result[region_id]['landmarkCenters'] = DOWNTOWN_SITES
 # Arkham's courtyard complex is confined to the hatched inferred grounds.
 if region_id=='uptown':
  result[region_id]['hospitalParts']=[coords(box(252,364,262,425)),coords(box(287,360,298,425)),coords(box(260,386,290,398)),coords(box(260,425,290,432)),coords(box(268,373,282,386))]
  result[region_id]['orphanageCenter']=orphanage['center']
  result[region_id]['orphanageSite']=coords(orphanage_site)
  result[region_id]['orphanageParts']=orphanage['parts']
  result[region_id]['sitePolygons']=[coords(site),coords(orphanage_site)]
 print(region_id, len(buildings), 'buildings', len(roads), 'road components')
output=dict(sourceSha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest(),landmarkSha256=hashlib.sha256(LANDMARK_SOURCE.read_bytes()).hexdigest(),generatorSha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),evidence='Illustrative roads, frontage parcels and heights, constrained by the GCT prop coastline and land-use patches. Not official architectural footprints.',regions=result)
(ROOT/'src/data/gct-buildings.json').write_text(json.dumps(output,separators=(',',':'),ensure_ascii=False)+'\n')
