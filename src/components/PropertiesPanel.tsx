import { useCircuitStore } from "../store/circuitStore";

export default function PropertiesPanel() {

  const nodes = useCircuitStore(
    (state) => state.nodes
  );

  const edges = useCircuitStore(
    (state) => state.edges
  );

  const setNodes = useCircuitStore(
    (state: any) => state.setNodes
  );

  const setEdges = useCircuitStore(
    (state: any) => state.setEdges
  );

  const selectedNodeId = useCircuitStore(
    (state) => state.selectedNodeId
  );

  const updateNodeData = useCircuitStore(
    (state) => state.updateNodeData
  );

  const selectedNode = nodes.find(
    (node) => node.id === selectedNodeId
  );

  if (!selectedNode) {
    return (
      <div className="text-slate-400">
        Select a component
      </div>
    );
  }

  const componentType =
    selectedNode.data.componentType;

  const properties =
    selectedNode.data.properties;

  const handleChange = (
    key: string,
    value: number
  ) => {

    updateNodeData(selectedNode.id, {
      properties: {
        ...properties,
        [key]: value,
      },
    });
  };

  const handleDelete = () => {

    setNodes(
      nodes.filter(
        (n: any) =>
          n.id !== selectedNode.id
      )
    );

    setEdges(
      edges.filter(
        (e: any) =>
          e.source !== selectedNode.id &&
          e.target !== selectedNode.id
      )
    );
  };

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold capitalize">
          {componentType}
        </h2>

        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 rounded text-sm"
        >
          Delete
        </button>

      </div>

      {componentType === "resistor" && (

        <div>

          <label className="block mb-1">
            Resistance (Ω)
          </label>

          <input
            type="number"
            value={properties.resistance || 0}
            onChange={(e) =>
              handleChange(
                "resistance",
                Number(e.target.value)
              )
            }
            className="w-full p-2 rounded bg-slate-800 border border-slate-600"
          />

        </div>

      )}

      {componentType === "voltage" && (

        <div>

          <label className="block mb-1">
            Voltage (V)
          </label>

          <input
            type="number"
            value={properties.voltage || 0}
            onChange={(e) =>
              handleChange(
                "voltage",
                Number(e.target.value)
              )
            }
            className="w-full p-2 rounded bg-slate-800 border border-slate-600"
          />

        </div>

      )}

      {componentType === "capacitor" && (

        <div>

          <label className="block mb-1">
            Capacitance (F)
          </label>

          <input
            type="number"
            value={properties.capacitance || 0}
            onChange={(e) =>
              handleChange(
                "capacitance",
                Number(e.target.value)
              )
            }
            className="w-full p-2 rounded bg-slate-800 border border-slate-600"
          />

        </div>

      )}

    </div>
  );
}