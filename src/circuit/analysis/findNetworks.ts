import type { Edge } from "reactflow";

import type { CircuitNode } from "../../types/circuit";

import {
  traverseCircuit,
} from "./traverseCircuit";

export function findNetworks(
  nodes: CircuitNode[],
  edges: Edge[]
) {

  const visited = new Set<string>();

  const networks: string[][] = [];

  nodes.forEach((node) => {

    if (visited.has(node.id)) {
      return;
    }

    const network = traverseCircuit(
      node.id,
      nodes,
      edges
    );

    network.forEach((id) =>
      visited.add(id)
    );

    networks.push(network);

  });

  return networks;
}