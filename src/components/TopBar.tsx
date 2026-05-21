import { useCircuitStore } from "../store/circuitStore";

import {
  exportNetlist,
} from "../circuit/export/exportNetlist";

export default function TopBar() {

  const saveCircuit = useCircuitStore(
    (state) => state.saveCircuit
  );

  const loadCircuit = useCircuitStore(
    (state) => state.loadCircuit
  );

  const runSimulation =
    useCircuitStore(
      (state) => state.runSimulation
    );

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

  const loadDemoCircuit = () => {

    const voltageId =
      crypto.randomUUID();

    const resistorId =
      crypto.randomUUID();

    const groundId =
      crypto.randomUUID();

    setNodes([
      {
        id: voltageId,

        type: "voltage",

        position: {
          x: 100,
          y: 250,
        },

        data: {
          label: "VOLTAGE",

          componentType: "voltage",

          properties: {
            voltage: 5,
          },

          terminals: [
            {
              id: "positive",
              label: "Positive",
            },

            {
              id: "negative",
              label: "Negative",
            },
          ],
        },
      },

      {
        id: resistorId,

        type: "resistor",

        position: {
          x: 400,
          y: 250,
        },

        data: {
          label: "RESISTOR",

          componentType: "resistor",

          properties: {
            resistance: 1000,
          },

          terminals: [
            {
              id: "left",
              label: "Left",
            },

            {
              id: "right",
              label: "Right",
            },
          ],
        },
      },

      {
        id: groundId,

        type: "ground",

        position: {
          x: 700,
          y: 250,
        },

        data: {
          label: "GROUND",

          componentType: "ground",

          properties: {},

          terminals: [
            {
              id: "gnd",
              label: "Ground",
            },
          ],
        },
      },
    ]);

    setEdges([
      {
        id: crypto.randomUUID(),

        source: voltageId,

        sourceHandle: "positive",

        target: resistorId,

        targetHandle: "left",
      },

      {
        id: crypto.randomUUID(),

        source: resistorId,

        sourceHandle: "right",

        target: groundId,

        targetHandle: "gnd",
      },
    ]);

    setTimeout(() => {
      runSimulation();
    }, 100);
  };

  return (
    <div className="flex gap-2">

      <button
        onClick={loadDemoCircuit}
        className="px-3 py-1 bg-orange-600 rounded"
      >
        Demo
      </button>

      <button
        onClick={saveCircuit}
        className="px-3 py-1 bg-cyan-600 rounded"
      >
        Save
      </button>

      <button
        onClick={loadCircuit}
        className="px-3 py-1 bg-green-600 rounded"
      >
        Load
      </button>

      <button
        onClick={() => {

          const netlist =
            exportNetlist(
              nodes,
              edges
            );

          navigator.clipboard.writeText(
            netlist
          );

          alert(
            "Netlist copied to clipboard"
          );
        }}
        className="px-3 py-1 bg-purple-600 rounded"
      >
        Export
      </button>

    </div>
  );
}