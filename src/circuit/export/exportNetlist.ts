import type { Edge } from "reactflow";

import type {
  CircuitNode,
} from "../../types/circuit";

export function exportNetlist(
  nodes: CircuitNode[],
  _edges: Edge[]
) {

  const lines: string[] = [];

  nodes.forEach((node) => {

    const type =
      node.data.componentType;

    if (type === "resistor") {

      lines.push(
        `R_${node.id} ${node.data.properties.resistance}Ω`
      );

    }

    if (type === "capacitor") {

      lines.push(
        `C_${node.id} ${node.data.properties.capacitance}F`
      );

    }

    if (type === "voltage") {

      lines.push(
        `V_${node.id} ${node.data.properties.voltage}V`
      );

    }

    if (type === "ground") {

      lines.push(
        `GND_${node.id}`
      );

    }

  });

  return lines.join("\n");

}