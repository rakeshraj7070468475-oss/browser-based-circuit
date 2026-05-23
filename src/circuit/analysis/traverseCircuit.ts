import type { Edge } from "reactflow";

import type { CircuitNode } from "../../types/circuit";

export function traverseCircuit(
  startNodeId: string,
  _nodes: CircuitNode[],
  edges: Edge[]
) {

  const visited = new Set<string>();

  function dfs(nodeId: string) {

    if (visited.has(nodeId)) {
      return;
    }

    visited.add(nodeId);

    const connectedEdges = edges.filter(
      (edge) =>
        edge.source === nodeId ||
        edge.target === nodeId
    );

    connectedEdges.forEach((edge) => {

      const nextNode =
        edge.source === nodeId
          ? edge.target
          : edge.source;

      dfs(nextNode);

    });
  }

  dfs(startNodeId);

  return Array.from(visited);
}