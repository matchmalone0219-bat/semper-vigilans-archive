import data from "@/data/gct-regions.json";
import { GCT_BUILDINGS, GCT_LANDMARKS } from "@/lib/gct-building-plan";
import { planSurfaces } from "@/lib/gotham-plan";

export type TransitRegionId = keyof typeof data.regions;
export type TransitStation = (typeof data.regions.uptown.stations)[number];
export const TRANSIT_REGIONS = data.regions;
export const TRANSIT_LINES = data.lines;

export function getTransitStationDisplayName(station: TransitStation, isZh: boolean) {
  if (!isZh) return station.nameEn;
  return station.nameZh.replace(/（字样待辨）/g, "");
}
type Props = {
  regionId: TransitRegionId;
  isZh: boolean;
  selectedId: string | null;
  transit?: boolean;
  onSelect: (id: string, trigger: HTMLElement | SVGElement) => void;
};

function points(polygon: number[][]) {
  return polygon.map((point) => point.join(",")).join(" ");
}

export function TransitLineBadges({ station, isZh }: { station: TransitStation; isZh: boolean }) {
  return (
    <span className="inline-flex flex-wrap gap-2">
      {station.lines.map((id) => {
        const line = data.lines[id as keyof typeof data.lines];
        return (
          <span key={id} className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4" style={{ background: line.color }} />
            {isZh ? line.nameZh : line.nameEn}
          </span>
        );
      })}
    </span>
  );
}

export function GothamTransitMap({ regionId, isZh, selectedId, onSelect, transit = true }: Props) {
  const region = data.regions[regionId];
  const hatchId = `gct-campus-${regionId}`;
  return (
    <svg
      viewBox={region.frame.join(" ")}
      className="size-full"
      data-transit-map={regionId}
      aria-label={
        isZh
          ? "GCT 交通图重绘，点击站点查看详情"
          : "GCT transit reconstruction; select a station for details"
      }
    >
      <defs>
        <pattern
          id={hatchId}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <rect width="5" height="5" fill="#4e4840" />
          <path d="M 0 0 V 5" stroke="#777263" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect
        x={region.frame[0]}
        y={region.frame[1]}
        width={region.frame[2]}
        height={region.frame[3]}
        fill="#11191e"
      />
      {region.land.map((polygon, index) => (
        <polygon
          key={index}
          points={points(polygon)}
          fill="#303436"
          stroke="#87877c"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      ))}
      {region.features.map((feature) => (
        <g key={feature.id} data-land-use={feature.id}>
          <polygon
            points={points(feature.polygon)}
            fill={feature.kind === "inferred-campus" ? `url(#${hatchId})` : "#43513e"}
            stroke={feature.kind === "inferred-campus" ? "#b4a183" : "#7f936c"}
            strokeWidth="0.65"
            strokeDasharray={feature.kind === "inferred-campus" ? "3 2" : undefined}
          />
          {feature.nameEn ? (
            <text
              x={feature.label[0]}
              y={feature.label[1]}
              textAnchor="middle"
              fill="#d8d6bc"
              fontSize="7.5"
              fontWeight="600"
              style={{ paintOrder: "stroke", stroke: "#303436", strokeWidth: 2 }}
            >
              {(isZh ? feature.nameZh : feature.nameEn).split("\n").map((line, index) => (
                <tspan key={index} x={feature.label[0]} dy={index ? 9 : 0}>
                  {line}
                </tspan>
              ))}
            </text>
          ) : null}
        </g>
      ))}
      <g data-building-plan={regionId}>
        {GCT_BUILDINGS[regionId].roads.map((road, index) => (
          <path
            key={index}
            d={[road.polygon, ...road.holes]
              .map((ring) => `M${ring.map((point) => point.join(",")).join("L")}Z`)
              .join(" ")}
            fill="#78786c"
            fillOpacity="0.65"
            fillRule="evenodd"
          />
        ))}
        {GCT_BUILDINGS[regionId].buildings.map((building) => (
          <g key={building.id} data-building-footprint={building.id}>
            <polygon
              points={points(building.polygon)}
              fill={["#686c62", "#7d7b6c", "#616961", "#757869"][building.roof]}
              stroke="#a1a090"
              strokeWidth="0.3"
            />
            {building.roof === 1 ? (
              <polyline
                points={points(building.polygon.slice(0, 3))}
                fill="none"
                stroke="#cac3ae"
                strokeWidth="0.45"
              />
            ) : null}
          </g>
        ))}
        {Object.entries(GCT_LANDMARKS[regionId]).map(([id, plan]) => (
          <g key={id} data-gct-landmark={id}>
            {planSurfaces(id, plan).map((surface, index) => {
              const [left, top, width, height] = region.frame;
              const polygon = surface.polygon.map(([x, y]) => [
                left + (x * width) / 100,
                top + (y * height) / 100,
              ]);
              return (
                <polygon
                  key={index}
                  points={points(polygon)}
                  fill={surface.color}
                  stroke="#c0b9a2"
                  strokeWidth="0.45"
                />
              );
            })}
            {id === "wayne-tower" && !transit ? (
              <text x="390" y="858" textAnchor="middle" fontSize="8" fill="#d1cab6">
                {isZh ? "韦恩塔" : "Wayne Tower"}
              </text>
            ) : null}
          </g>
        ))}
      </g>
      {transit &&
        region.routes.map((route) => (
          <g key={route.id} data-transit-route={route.id} data-closed={route.closed}>
            <polyline
              points={points(route.points)}
              fill="none"
              stroke="#16191c"
              strokeWidth="4.3"
              strokeLinejoin="round"
            />
            <polyline
              points={points(route.points)}
              fill="none"
              stroke={data.lines[route.line as keyof typeof data.lines].color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeDasharray={route.closed ? "2 2.5" : undefined}
            />
          </g>
        ))}
      {region.stations.map((station) => {
        const active = station.id === selectedId;
        if (!transit && !active) return null;
        const [x, y] = station.point;
        const [dx, dy] = station.labelOffset;
        const name = station.nameEn.replace(" (Closed)", "");
        const words = name.split(" ");
        const long = name.length > 18 && words.length > 1;
        const lines = long ? [words.slice(0, -1).join(" "), words.at(-1)!] : [name];
        return (
          <g
            key={station.id}
            role="button"
            tabIndex={0}
            data-transit-station={station.id}
            aria-label={
              isZh
                ? `交通地点：${getTransitStationDisplayName(station, true)}`
                : `Transit location: ${getTransitStationDisplayName(station, false)}`
            }
            aria-expanded={active}
            aria-controls="map-detail-card"
            className="group cursor-pointer outline-none"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => onSelect(station.id, event.currentTarget)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(station.id, event.currentTarget);
              }
            }}
          >
            <title>
              {getTransitStationDisplayName(station, isZh)}
              {station.uncertain
                ? (isZh ? " · 图中字样较模糊" : " · map lettering partially obscured")
                : ""}
            </title>
            <circle cx={x} cy={y} r="9" fill="transparent" />
            <circle
              cx={x}
              cy={y}
              r="7"
              fill="none"
              stroke={active ? "#efb1a0" : "#cfc7b4"}
              strokeWidth="1.1"
              opacity={active ? 1 : 0}
              className="group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            {station.kind === "transfer" ? (
              <polygon
                points={points([
                  [x - 4, y],
                  [x - 2, y - 3.5],
                  [x + 2, y - 3.5],
                  [x + 4, y],
                  [x + 2, y + 3.5],
                  [x - 2, y + 3.5],
                ])}
                fill={active ? "#efb1a0" : "#d2cdbb"}
                stroke="#14191b"
                strokeWidth="1"
              />
            ) : station.kind === "terminal" ? (
              <path
                d={`M${x - 4},${y}H${x + 4} M${x},${y - 3.5}V${y + 3.5}`}
                stroke="#d2cdbb"
                strokeWidth="2"
              />
            ) : station.kind === "parking" ? (
              <text x={x} y={y + 2.5} textAnchor="middle" fontSize="7" fill="#d2cdbb">
                P
              </text>
            ) : (
              <circle
                cx={x}
                cy={y}
                r="2.6"
                fill={station.closed ? "#11191e" : "#d2cdbb"}
                stroke={station.closed ? "#d29455" : "#14191b"}
                strokeWidth="1"
              />
            )}
            {station.closed ? (
              <path d={`M${x - 2},${y - 2}L${x + 2},${y + 2}`} stroke="#d29455" strokeWidth="1" />
            ) : null}
            <text
              x={x + dx}
              y={y + dy}
              textAnchor={dx < 0 ? "end" : dx > 0 ? "start" : "middle"}
              fontSize="7.3"
              fontFamily="Arial, sans-serif"
              fill={active ? "#ffcebb" : "#dedcd0"}
              style={{
                paintOrder: "stroke",
                stroke: "#222a2e",
                strokeWidth: 2.4,
                strokeLinejoin: "round",
              }}
            >
              {lines.map((line, index) => (
                <tspan key={index} x={x + dx} dy={index === 0 ? 0 : 8}>
                  {line}
                  {index === lines.length - 1 && station.uncertain ? " ?" : ""}
                </tspan>
              ))}
              {station.closed ? (
                <tspan x={x + dx} dy="8" fill="#d9a56b">
                  {isZh ? "关闭" : "Closed"}
                </tspan>
              ) : null}
            </text>
          </g>
        );
      })}
      {region.connections.map((connection, index) => (
        <text
          key={index}
          x={connection.point[0]}
          y={Math.max(connection.point[1], region.frame[1] + 12)}
          textAnchor="middle"
          fontSize="7.5"
          fill="#b0b8ba"
          style={{ paintOrder: "stroke", stroke: "#11191e", strokeWidth: 3 }}
        >
          {isZh ? connection.nameZh : connection.nameEn}
        </text>
      ))}
      <g
        transform={`translate(${region.frame[0] + 25},${regionId === "downtown" ? region.frame[1] + 100 : region.frame[1] + region.frame[3] - 35})`}
        fill="#9ba6a9"
        aria-hidden="true"
      >
        <path d="M0 2L-4 14L0 11L4 14Z" />
        <text x="0" y="-4" fontSize="8" textAnchor="middle">
          N
        </text>
      </g>
    </svg>
  );
}

export function GothamTransitIndex({ regionId, isZh, selectedId, onSelect }: Props) {
  const stations = data.regions[regionId].stations;
  return (
    <div className="mt-4" data-transit-index={regionId}>
      <div
        className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted"
        aria-label={isZh ? "交通图图例" : "Transit legend"}
      >
        {Object.entries(data.lines).filter(([id]) => data.regions[regionId].routes.some((route) => route.line === id)).map(([, line]) => (
          <span key={line.nameEn} className="inline-flex items-center gap-2">
            <span className="h-0.5 w-5" style={{ background: line.color }} />
            {isZh ? line.nameZh : line.nameEn}
          </span>
        ))}
        <span>{isZh ? "○ 车站 · ⬡ 换乘 · ┣ 终点" : "○ Station · ⬡ Transfer · ┣ Terminal"}</span>
        <span>{isZh ? "虚线：关闭路段" : "Dashed: closed route"}</span>
        {regionId === "uptown" ? (
          <span>{isZh ? "斜纹：阿卡姆州立医院/疯人院" : "Hatching: Arkham State Hospital"}</span>
        ) : null}
      </div>
      <details className="mt-4 border-t border-fg/15 pt-3" open>
        <summary className="cursor-pointer text-sm font-semibold focus-visible:outline-2 focus-visible:outline-fg">
          {isZh
            ? `交通图地点索引 · ${stations.length} 处`
            : `Transit location index · ${stations.length}`}
        </summary>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {stations.map((station) => (
            <li key={station.id}>
              <button
                type="button"
                onClick={(event) => onSelect(station.id, event.currentTarget)}
                aria-expanded={selectedId === station.id}
                aria-controls="map-detail-card"
                className={`h-full w-full border p-3 text-left focus-visible:outline-2 focus-visible:outline-fg ${selectedId === station.id ? "border-blood bg-blood/10" : "border-fg/10 bg-bg hover:border-fg/40"}`}
              >
                <span className="block text-xs font-semibold text-fg">
                  {getTransitStationDisplayName(station, isZh)}
                </span>
                {isZh ? (
                  <span className="mt-1 block text-[10px] text-faint">{station.nameEn}</span>
                ) : null}
                <span className="mt-2 block text-[10px] text-muted">
                  <TransitLineBadges station={station} isZh={isZh} />
                </span>
                {station.external ? (
                  <span className="mt-1 block text-[10px] text-faint">
                    {isZh ? "跨河接续站" : "Cross-river connection"}
                  </span>
                ) : null}
                {station.uncertain ? (
                  <span className="mt-1 block text-[10px] text-faint">
                    {isZh ? "图中字样较模糊" : "Map lettering partially obscured"}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
