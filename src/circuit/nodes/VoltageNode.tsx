import {
  Handle,
  Position,
  type NodeProps,
} from "reactflow";

import { useCircuitStore } from "../../store/circuitStore";

export default function VoltageNode({
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

  return (
    <div
      className={`
        px-3 py-2
        bg-green-500
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
            : "border-green-300"
        }
      `}
    >

      <Handle
        id="negative"
        type="target"
        position={Position.Left}
        style={{
          width: 12,
          height: 12,
        }}
      />

      <div>Voltage</div>

      <div className="text-xs">
        {data.properties?.voltage}V
      </div>

      {
        voltage !== undefined && (
          <div className="text-[10px] font-bold text-cyan-900">
            {voltage.toFixed(2)}V
          </div>
        )
      }

      <Handle
        id="positive"
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