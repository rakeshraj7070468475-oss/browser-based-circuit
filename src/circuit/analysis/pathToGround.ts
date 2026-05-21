import type { Edge } from "reactflow";

import type { CircuitNode } from "../../types/circuit";

import {
  traverseCircuit,
} from "./traverseCircuit";

export function hasPathToGround(
  nodeId: string,
  nodes: CircuitNode[],
  edges: Edge[]
) {

  const connectedNodes =
    traverseCircuit(
      nodeId,
      nodes,
      edges
    );

  return connectedNodes.some((id) => {

    const node = nodes.find(
      (n) => n.id === id
    );

    return (
      node?.data.componentType ===
      "ground"
    );
  });
}