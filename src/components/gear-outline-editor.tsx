import { useState, useEffect, useRef } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Minimize2,
  Maximize2,
  Move,
  ArrowLeftToLine,
  ArrowRightToLine,
  X,
} from "lucide-react";
import { BODY_VIEW_OUTLINES } from "@/lib/gear-turntable-assets";

export type Point = { x: number; y: number };

// 将 SVG 路径字符串解析为离散多边形点数组
export function parsePathToPoints(d: string): Point[] {
  if (!d) return [];
  const points: Point[] = [];
  const regex = /([0-9.]+)\s+([0-9.]+)/g;
  let match;
  while ((match = regex.exec(d)) !== null) {
    const x = parseFloat(match[1]!);
    const y = parseFloat(match[2]!);
    if (!isNaN(x) && !isNaN(y)) {
      points.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
    }
  }
  return points;
}

// 将点数组重新构建为 SVG 闭合路径字符串
export function pointsToSvgPath(points: Point[]): string {
  if (points.length < 3) return "";
  const [first, ...rest] = points;
  return `M${first!.x} ${first!.y} ${rest.map((p) => `L${p.x} ${p.y}`).join(" ")} Z`;
}

interface OutlineEditorProps {
  bodyView: number;
  availableItems: Array<{ id: string; name: string }>;
  currentOutlines: Record<string, string>;
  onUpdateOutline: (equipmentId: string, path: string) => void;
  selectedEquipmentId?: string;
  onSelectEquipment?: (id: string) => void;
  onClose?: () => void;
}

export function GearOutlineEditor({
  bodyView,
  availableItems,
  currentOutlines,
  onUpdateOutline,
  selectedEquipmentId,
  onSelectEquipment,
  onClose,
}: OutlineEditorProps) {
  const [internalSelected, setInternalSelected] = useState<string>(
    selectedEquipmentId || availableItems[0]?.id || "",
  );
  const selectedItem = selectedEquipmentId || internalSelected;

  const [copied, setCopied] = useState(false);
  const [copyAllDone, setCopyAllDone] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isGhost, setIsGhost] = useState(false);

  // 默认位置靠屏幕右侧，避开中央模型；支持拖拽并记住用户位置
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("gear_calibrator_pos");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof parsed.x === "number" && typeof parsed.y === "number") {
            const validX = Math.max(12, Math.min(window.innerWidth - 320, parsed.x));
            const validY = Math.max(12, Math.min(window.innerHeight - 80, parsed.y));
            return { x: validX, y: validY };
          }
        }
      } catch {}
      return {
        x: Math.max(16, window.innerWidth - 330),
        y: 80,
      };
    }
    return { x: 24, y: 80 };
  });

  const isDragging = useRef(false);
  const dragStartPos = useRef({ pointerX: 0, pointerY: 0, panelX: 0, panelY: 0 });

  useEffect(() => {
    if (!availableItems.some((item) => item.id === selectedItem)) {
      if (availableItems[0]) {
        setInternalSelected(availableItems[0].id);
        onSelectEquipment?.(availableItems[0].id);
      }
    }
  }, [bodyView, availableItems, selectedItem, onSelectEquipment]);

  const rawPath = currentOutlines[selectedItem] ?? BODY_VIEW_OUTLINES[bodyView]?.[selectedItem] ?? "";
  const points = parsePathToPoints(rawPath);

  function handleReset() {
    const original = BODY_VIEW_OUTLINES[bodyView]?.[selectedItem] ?? "";
    onUpdateOutline(selectedItem, original);
  }

  function copyCurrentPath() {
    navigator.clipboard.writeText(`"${selectedItem}": "${rawPath}",`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyAllViewOutlines() {
    const viewCode = availableItems
      .map((item) => {
        const p = currentOutlines[item.id] ?? BODY_VIEW_OUTLINES[bodyView]?.[item.id] ?? "";
        return `    "${item.id}": "${p}",`;
      })
      .join("\n");
    const code = `  ${bodyView}: {\n${viewCode}\n  },`;
    navigator.clipboard.writeText(code);
    setCopyAllDone(true);
    setTimeout(() => setCopyAllDone(false), 2000);
  }

  // 窗口拖动控制
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, select, input, a")) return;
    e.preventDefault();
    isDragging.current = true;
    dragStartPos.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      panelX: pos.x,
      panelY: pos.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartPos.current.pointerX;
    const deltaY = e.clientY - dragStartPos.current.pointerY;
    const nextX = Math.max(8, Math.min(window.innerWidth - 100, dragStartPos.current.panelX + deltaX));
    const nextY = Math.max(8, Math.min(window.innerHeight - 50, dragStartPos.current.panelY + deltaY));
    setPos({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        localStorage.setItem("gear_calibrator_pos", JSON.stringify(pos));
      } catch {}
    }
  };

  const dockLeft = () => {
    const next = { x: 20, y: 80 };
    setPos(next);
    try {
      localStorage.setItem("gear_calibrator_pos", JSON.stringify(next));
    } catch {}
  };

  const dockRight = () => {
    const next = { x: Math.max(16, window.innerWidth - 330), y: 80 };
    setPos(next);
    try {
      localStorage.setItem("gear_calibrator_pos", JSON.stringify(next));
    } catch {}
  };

  const handleEquipmentChange = (id: string) => {
    setInternalSelected(id);
    onSelectEquipment?.(id);
  };

  // 最小化状态下的微型悬浮条
  if (isMinimized) {
    return (
      <aside
        className={`gear-outline-editor-panel is-minimized ${isGhost ? "is-ghost" : ""}`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <header
          className="gear-editor-header mini-header"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          title="按住拖动位置"
        >
          <span className="gear-editor-drag-icon">
            <Move size={13} />
          </span>
          <span className="gear-editor-mini-title">⚡ 校准器</span>

          <select
            className="gear-editor-mini-select"
            value={selectedItem}
            onChange={(e) => handleEquipmentChange(e.target.value)}
            title="选择校准部位"
          >
            {availableItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <span className="gear-editor-mini-count">{points.length}点</span>

          <div className="gear-editor-header-tools">
            <button
              type="button"
              className={`gear-editor-tool-btn ${isGhost ? "active" : ""}`}
              onClick={() => setIsGhost(!isGhost)}
              title={isGhost ? "关闭半透明透视" : "开启半透明透视 (Ghost 模式)"}
            >
              {isGhost ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
            <button
              type="button"
              className="gear-editor-tool-btn"
              onClick={() => setIsMinimized(false)}
              title="展开完整面板"
            >
              <Maximize2 size={13} />
            </button>
            {onClose ? (
              <button
                type="button"
                className="gear-editor-tool-btn close"
                onClick={onClose}
                title="关闭校准器"
              >
                <X size={13} />
              </button>
            ) : null}
          </div>
        </header>
      </aside>
    );
  }

  // 完整展开面板
  return (
    <aside
      className={`gear-outline-editor-panel ${isGhost ? "is-ghost" : ""}`}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <header
        className="gear-editor-header"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        title="按住标题栏可随意拖动位置"
      >
        <div className="gear-editor-header-title">
          <span className="gear-editor-drag-icon">
            <Move size={14} />
          </span>
          <h4>⚡ 轮廓可视化校准器</h4>
        </div>

        <div className="gear-editor-header-tools">
          <button
            type="button"
            className="gear-editor-tool-btn"
            onClick={dockLeft}
            title="靠左停靠 (避开中央)"
          >
            <ArrowLeftToLine size={13} />
          </button>
          <button
            type="button"
            className="gear-editor-tool-btn"
            onClick={dockRight}
            title="靠右停靠 (避开中央)"
          >
            <ArrowRightToLine size={13} />
          </button>
          <button
            type="button"
            className={`gear-editor-tool-btn ${isGhost ? "active" : ""}`}
            onClick={() => setIsGhost(!isGhost)}
            title={isGhost ? "关闭半透明透视" : "开启半透明透视 (Ghost 模式)"}
          >
            {isGhost ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
          <button
            type="button"
            className="gear-editor-tool-btn"
            onClick={() => setIsMinimized(true)}
            title="最小化为微型悬浮条"
          >
            <Minimize2 size={13} />
          </button>
          {onClose ? (
            <button
              type="button"
              className="gear-editor-tool-btn close"
              onClick={onClose}
              title="关闭校准器"
            >
              <X size={13} />
            </button>
          ) : null}
        </div>
      </header>

      <div className="gear-editor-control-group">
        <label>当前部位：</label>
        <select
          value={selectedItem}
          onChange={(e) => handleEquipmentChange(e.target.value)}
        >
          {availableItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.id})
            </option>
          ))}
        </select>
      </div>

      <div className="gear-editor-status">
        <span>
          控制点数: <strong>{points.length}</strong>
        </span>
        <span className="gear-editor-drag-hint">按住标题栏可自由拖走 ⇄</span>
      </div>

      <div className="gear-editor-instructions">
        <ul>
          <li><strong>拖拽锚点</strong>：鼠标按住红色锚点即可拖动</li>
          <li><strong>加点</strong>：在两点间连线上<strong>单击一次</strong>（光标显示 ＋）即可插入新点</li>
          <li><strong>删点</strong>：按住 Alt / Option 键点击锚点即可删除</li>
        </ul>
      </div>

      <div className="gear-editor-actions">
        <button
          type="button"
          className={`gear-editor-btn ${copied ? "success" : ""}`}
          onClick={copyCurrentPath}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "已复制当前路径" : "复制当前路径代码"}
        </button>

        <button
          type="button"
          className={`gear-editor-btn ${copyAllDone ? "success" : ""}`}
          onClick={copyAllViewOutlines}
        >
          {copyAllDone ? <Check size={14} /> : <Copy size={14} />}
          {copyAllDone ? "已复制全视角代码" : "复制本视角所有代码"}
        </button>

        <div className="gear-editor-sub-actions">
          <button type="button" onClick={handleReset} title="恢复默认设定">
            <RefreshCw size={13} /> 重置当前
          </button>
        </div>
      </div>
    </aside>
  );
}

// 渲染在战衣舞台 SVG 上的交互式锚点和辅助折线
export function InteractiveOutlineHandles({
  pathString,
  onPointChange,
  onAddPoint,
  onDeletePoint,
}: {
  pathString: string;
  onPointChange: (index: number, newPoint: Point) => void;
  onAddPoint: (insertIndex: number, newPoint: Point) => void;
  onDeletePoint: (deleteIndex: number) => void;
}) {
  const points = parsePathToPoints(pathString);
  const draggingPoint = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  if (points.length === 0) return null;

  return (
    <g className="gear-editor-interactive-layer">
      {/* 渲染线段，点击线段可插入点 */}
      {points.map((p, i) => {
        const next = points[(i + 1) % points.length]!;
        const handleLineClick = (e: React.MouseEvent<SVGLineElement>) => {
          e.stopPropagation();
          const svg = e.currentTarget.ownerSVGElement;
          if (svg) {
            const rect = svg.getBoundingClientRect();
            const clickX = Number(
              Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)).toFixed(1),
            );
            const clickY = Number(
              Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)).toFixed(1),
            );
            onAddPoint(i + 1, { x: clickX, y: clickY });
          } else {
            const midX = Number(((p.x + next.x) / 2).toFixed(1));
            const midY = Number(((p.y + next.y) / 2).toFixed(1));
            onAddPoint(i + 1, { x: midX, y: midY });
          }
        };

        return (
          <g key={`edge-${i}`}>
            {/* 宽热区透明线，方便鼠标轻松点中 */}
            <line
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="transparent"
              strokeWidth={3}
              style={{ cursor: "copy" }}
              onClick={handleLineClick}
            />
            {/* 视觉提示虚线 */}
            <line
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              className="gear-editor-edge"
              onClick={handleLineClick}
            />
          </g>
        );
      })}

      {/* 渲染小巧半透明的可拖拽控制锚点 */}
      {points.map((p, i) => (
        <g
          key={`handle-group-${i}`}
          className="gear-editor-handle-group"
          data-dragging={draggingIndex === i}
        >
          {/* 大热区隐形圆，确保鼠标极易抓取 */}
          <circle
            cx={p.x}
            cy={p.y}
            r={2.2}
            className="gear-editor-handle-hit"
            onPointerDown={(e) => {
              e.stopPropagation();
              if (e.altKey) {
                onDeletePoint(i);
                return;
              }
              draggingPoint.current = i;
              setDraggingIndex(i);
              const target = e.currentTarget;
              target.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (draggingPoint.current !== i) return;
              const svg = e.currentTarget.ownerSVGElement;
              if (!svg) return;
              const rect = svg.getBoundingClientRect();
              const relX = ((e.clientX - rect.left) / rect.width) * 100;
              const relY = ((e.clientY - rect.top) / rect.height) * 100;
              const clampedX = Math.max(0, Math.min(100, Number(relX.toFixed(1))));
              const clampedY = Math.max(0, Math.min(100, Number(relY.toFixed(1))));
              onPointChange(i, { x: clampedX, y: clampedY });
            }}
            onPointerUp={(e) => {
              if (draggingPoint.current === i) {
                draggingPoint.current = null;
                setDraggingIndex(null);
                e.currentTarget.releasePointerCapture(e.pointerId);
              }
            }}
            onPointerCancel={(e) => {
              if (draggingPoint.current === i) {
                draggingPoint.current = null;
                setDraggingIndex(null);
                try {
                  e.currentTarget.releasePointerCapture(e.pointerId);
                } catch {}
              }
            }}
            onLostPointerCapture={() => {
              draggingPoint.current = null;
              setDraggingIndex(null);
            }}
          >
            <title>{`点 #${i + 1}: (${p.x}, ${p.y}) - 按住拖动，Alt+点击删除`}</title>
          </circle>

          {/* 小巧半透明视觉锚点圈 (r=0.65，半透明不挡视线) */}
          <circle
            cx={p.x}
            cy={p.y}
            r={0.65}
            className="gear-editor-handle"
          />

          {/* 准星级精确定位微点 (r=0.15) */}
          <circle
            cx={p.x}
            cy={p.y}
            r={0.15}
            className="gear-editor-handle-center"
          />
        </g>
      ))}
    </g>
  );
}
