import type { Edge } from "reactflow";

import type { CircuitNode } from "../../types/circuit";

export function detectShortCircuits(
  nodes: CircuitNode[],
  edges: Edge[]
) {

  const issues: { type: string; message: string; nodeId: string; }[] = [];

  edges.forEach((edge) => {

    const sourceNode = nodes.find(
      (node) => node.id === edge.source
    );

    const targetNode = nodes.find(
      (node) => node.id === edge.target
    );

    if (!sourceNode || !targetNode) {
      return;
    }

    const sourceType =
      sourceNode.data.componentType;

    const targetType =
      targetNode.data.componentType;

    const sourceHandle =
      edge.sourceHandle;

    // Voltage positive directly to ground

    const voltageToGround =
      sourceType === "voltage" &&
      targetType === "ground" &&
      sourceHandle === "positive";

    const groundToVoltage =
      targetType === "voltage" &&
      sourceType === "ground" &&
      edge.targetHandle === "positive";

    if (
      voltageToGround ||
      groundToVoltage
    ) {

      issues.push({
        type: "error",

        message:
          "Short circuit detected: voltage source directly connected to ground.",

        nodeId: sourceNode.id,
      });

    }

  });

  return issues;
}