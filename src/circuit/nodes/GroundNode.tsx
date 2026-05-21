import {
  Handle,
  Position,
  type NodeProps,
} from "reactflow";

export default function GroundNode({}: NodeProps) {

  return (
    <div className="flex flex-col items-center">

      <Handle
        id="gnd"
        type="target"
        position={Position.Top}
        style={{
          width: 12,
          height: 12,
        }}
      />

      <div className="text-white text-2xl">
        ⏚
      </div>

      <div className="text-xs text-slate-400">
        GND
      </div>

    </div>
  );
}