import type { Edge } from "reactflow";
import type { CircuitNode } from "../../types/circuit";

export type TerminalConnection = {
  nodeId: string;

  terminalId: string;
};

export type TerminalNet = {
  id: string;

  terminals: TerminalConnection[];
};

export function generateTerminalNets(
nodes: CircuitNode[], edges: Edge[]): TerminalNet[] {

  const visited = new Set<string>();

  const nets: TerminalNet[] = [];

  function dfs(
    connection: TerminalConnection,
    net: TerminalConnection[]
  ) {

    const key =
      `${connection.nodeId}:${connection.terminalId}`;

    if (visited.has(key)) {
      return;
    }

    visited.add(key);

    net.push(connection);

    edges.forEach((edge) => {

      const sourceKey =
        `${edge.source}:${edge.sourceHandle}`;

      const targetKey =
        `${edge.target}:${edge.targetHandle}`;

      if (sourceKey === key) {

        dfs(
          {
            nodeId: edge.target,
            terminalId:
              edge.targetHandle || "",
          },
          net
        );
      }

      if (targetKey === key) {

        dfs(
          {
            nodeId: edge.source,
            terminalId:
              edge.sourceHandle || "",
          },
          net
        );
      }

    });
  }

  edges.forEach((edge, index) => {

    const net: TerminalConnection[] = [];

    dfs(
      {
        nodeId: edge.source,
        terminalId:
          edge.sourceHandle || "",
      },
      net
    );

    if (net.length > 0) {

      nets.push({
        id: `NET_${index + 1}`,

        terminals: net,
      });

    }

  });

  return nets;
}