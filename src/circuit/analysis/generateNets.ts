import type { Edge } from "reactflow";

import type { CircuitNode } from "../../types/circuit";

import {
  findNetworks,
} from "./findNetworks";

export type ElectricalNet = {
  id: string;

  nodes: {
    nodeId: string;

    label: string;

    componentType: string;
  }[];
};

export function generateNets(
  nodes: CircuitNode[],
  edges: Edge[]
): ElectricalNet[] {

  const networks =
    findNetworks(nodes, edges);

  return networks.map(
    (network, index) => {

      return {
        id: `NET_${index + 1}`,

        nodes: network.map((nodeId) => {

          const node = nodes.find(
            (n) => n.id === nodeId
          );

          return {
            nodeId,

            label:
              node?.data.label || "Unknown",

            componentType:
              node?.data.componentType ||
              "unknown",
          };
        }),
      };
    }
  );
}