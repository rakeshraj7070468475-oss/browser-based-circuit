import ReactFlow, {
  Background,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

import { useCircuitStore } from "../store/circuitStore";

import ResistorNode from "./nodes/ResistorNode";

import VoltageNode from "./nodes/VoltageNode";

import CapacitorNode from "./nodes/CapacitorNode";

import GroundNode from "./nodes/GroundNode";

const nodeTypes = {
  resistor: ResistorNode,

  voltage: VoltageNode,

  capacitor: CapacitorNode,

  ground: GroundNode,
};

export default function CircuitCanvas() {

  const nodes = useCircuitStore(
    (state) => state.nodes
  );

  const edges = useCircuitStore(
    (state) => state.edges
  );

  const onConnect = useCircuitStore(
    (state) => state.onConnect
  );

  const onNodesChange = useCircuitStore(
    (state) => state.onNodesChange
  );

  const onEdgesChange = useCircuitStore(
    (state) => state.onEdgesChange
  );

  const setSelectedNode = useCircuitStore(
    (state) => state.setSelectedNode
  );

  return (
    <div className="w-full h-full relative">

      {
        nodes.length === 0 && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-slate-500
              pointer-events-none
              z-10
              text-lg
            "
          >
            Add components from the left panel
          </div>
        )
      }

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}

        fitView

        snapToGrid

        snapGrid={[20, 20]}

        defaultEdgeOptions={{
  animated: true,

  style: {
    strokeWidth: 3,
    stroke: "#94a3b8",
  },
}}
        onNodeClick={(_, node) =>
          setSelectedNode(node.id)
        }
      >

        <Background />

        <Controls />
        {
  nodes.length === 0 && (

    <div className="
      absolute
      inset-0
      flex
      flex-col
      items-center
      justify-center
      text-slate-500
      z-10
      pointer-events-none
    ">

      <div className="text-3xl mb-3">
        ⚡
      </div>

      <div className="text-xl font-semibold">
        Browser-Based Circuit Analyzer
      </div>

      <div className="text-sm mt-2">
        Add components or load demo circuit
      </div>

    </div>

  )
}
      </ReactFlow>

    </div>
  );
}