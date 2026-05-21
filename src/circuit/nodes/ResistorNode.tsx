import {
  Handle,
  Position,
  type NodeProps,
} from "reactflow";

import { useCircuitStore } from "../../store/circuitStore";

export default function ResistorNode({
  id,
  data,
}: NodeProps) {

  const issues = useCircuitStore(
    (state) => state.issues
  );

  const simulationResult =
    useCircuitStore(
      (state) => state.simulationResult
    );

  const hasIssue = issues.some(
    (issue) => issue.nodeId === id
  );

  const voltage =
    simulationResult?.nodeVoltages?.[
      id
    ];

  const power =
    simulationResult?.resistorPower?.[
      id
    ] || 0;

  const bgColor =
    power > 1
      ? "bg-red-600 animate-pulse"
      : power > 0.25
      ? "bg-orange-500"
      : "bg-yellow-500";

  return (
    <div
      className={`
        px-3 py-2
        ${bgColor}
        text-black
        rounded
        border-2
        min-w-30
        text-center
        font-semibold
        text-sm
        shadow-lg
        ${
          hasIssue
            ? "border-red-500"
            : "border-yellow-300"
        }
      `}
    >

      <Handle
        id="left"
        type="target"
        position={Position.Left}
        style={{
          width: 12,
          height: 12,
        }}
      />

      <div>Resistor</div>

      <div className="text-xs">
        {data.properties?.resistance}Ω
      </div>

      {
        voltage !== undefined && (
          <div className="text-[10px] font-bold text-cyan-900">
            {voltage.toFixed(2)}V
          </div>
        )
      }

      <div className="text-[10px]">
        {power.toFixed(4)}W
      </div>

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{
          width: 12,
          height: 12,
        }}
      />

    </div>
  );
}