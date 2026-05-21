import {
  Handle,
  Position,
  type NodeProps,
} from "reactflow";

import { useCircuitStore } from "../../store/circuitStore";

export default function CapacitorNode({
  id,
  data,
}: NodeProps) {

  const issues = useCircuitStore(
    (state) => state.issues
  );

  const hasIssue = issues.some(
    (issue) => issue.nodeId === id
  );

  return (
    <div
      className={`
        px-3 py-2
        bg-blue-500
        text-black
        rounded
        border-2
        min-w-27.5
        text-center
        font-semibold
        text-sm
        ${
          hasIssue
            ? "border-red-500"
            : "border-blue-300"
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

      <div>Capacitor</div>

      <div className="text-xs">
        {data.properties?.capacitance}F
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