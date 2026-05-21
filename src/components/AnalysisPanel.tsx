import { useCircuitStore } from "../store/circuitStore";

import {
  findNetworks,
} from "../circuit/analysis/findNetworks";

import {
  generateNets,
} from "../circuit/analysis/generateNets";

import {
  generateTerminalNets,
} from "../circuit/analysis/generateTerminalNets";

export default function AnalysisPanel() {

  const nodes = useCircuitStore(
    (state) => state.nodes
  );

  const edges = useCircuitStore(
    (state) => state.edges
  );

  const issues = useCircuitStore(
    (state) => state.issues
  );

  const networks = findNetworks(
    nodes,
    edges
  );

  const nets = generateNets(
    nodes,
    edges
  );

  const terminalNets =
    generateTerminalNets(
      nodes,
      edges
    );

  return (
    <div className="space-y-3">

      <h2 className="text-xl font-bold">
        Analysis
      </h2>

      {issues.length === 0 && (
        <div className="text-green-400">
          No issues detected
        </div>
      )}

      {issues.map((issue, index) => (
        <div
          key={index}
          className={`
            p-3
            rounded
            border-l-4
            ${
              issue.type === "error"
                ? "bg-red-950 border-red-500"
                : "bg-yellow-950 border-yellow-500"
            }
          `}
        >
          {issue.message}
        </div>
      ))}

      <div className="mt-6">

        <h3 className="font-bold mb-2">
          Connections
        </h3>

        <div className="space-y-2 text-sm">

          {
            edges.map((edge) => {

              const sourceNode =
                nodes.find(
                  (n) => n.id === edge.source
                );

              const targetNode =
                nodes.find(
                  (n) => n.id === edge.target
                );

              return (
                <div
                  key={edge.id}
                  className="p-2 bg-slate-800 rounded"
                >

                  {sourceNode?.data.label}

                  {" ("}
                  {edge.sourceHandle}
                  {")"}

                  {" → "}

                  {targetNode?.data.label}

                  {" ("}
                  {edge.targetHandle}
                  {")"}

                </div>
              );
            })
          }

        </div>

      </div>

      <div className="mt-6">

        <h3 className="font-bold mb-2">
          Networks
        </h3>

        <div className="space-y-2">

          {networks.map(
            (network, index) => (

              <div
                key={index}
                className="p-2 bg-slate-800 rounded text-sm"
              >
                <div className="font-semibold">
                  Network {index + 1}
                </div>

                <div className="mt-1 text-slate-400">

                  {
                    network
                      .map((id) => {

                        const node =
                          nodes.find(
                            (n) => n.id === id
                          );

                        return node?.data.label;

                      })
                      .filter(Boolean)
                      .join(" → ")
                  }

                </div>

              </div>

            )
          )}

        </div>

      </div>

      <div className="mt-6">

        <h3 className="font-bold mb-2">
          Electrical Nets
        </h3>

        <div className="space-y-3">

          {nets.map((net) => (

            <div
              key={net.id}
              className="p-3 bg-slate-800 rounded"
            >

              <div className="font-semibold text-cyan-400">
                {net.id}
              </div>

              <div className="mt-2 space-y-1 text-sm">

                {net.nodes.map((node) => (

                  <div key={node.nodeId}>

                    {node.label}
                    {" "}
                    (
                    {node.componentType}
                    )

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-6">

        <h3 className="font-bold mb-2">
          Terminal Nets
        </h3>

        <div className="space-y-3">

          {terminalNets.map((net) => (

            <div
              key={net.id}
              className="p-3 bg-slate-800 rounded"
            >

              <div className="font-semibold text-purple-400">
                {net.id}
              </div>

              <div className="mt-2 space-y-1 text-sm">

                {
                  net.terminals.map(
                    (terminal, index) => {

                      const node = nodes.find(
                        (n) =>
                          n.id === terminal.nodeId
                      );

                      return (
                        <div key={index}>

                          {node?.data.label}

                          {" : "}

                          {terminal.terminalId}

                        </div>
                      );
                    }
                  )
                }

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}