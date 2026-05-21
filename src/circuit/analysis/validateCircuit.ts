import type { Edge } from "reactflow";

import type { CircuitNode } from "../../types/circuit";

import {
  hasPathToGround,
} from "./pathToGround";

import {
  detectShortCircuits,
} from "./detectShortCircuit";

export type CircuitIssue = {
  type: "error" | "warning";

  message: string;

  nodeId?: string;
};

export function validateCircuit(
  nodes: CircuitNode[],
  edges: Edge[]
): CircuitIssue[] {

  const issues: CircuitIssue[] = [];

  // CHECK SHORT CIRCUITS
  const shortIssues = detectShortCircuits(nodes, edges) as CircuitIssue[];
  if (shortIssues && shortIssues.length) {
    issues.push(...shortIssues);
  }

  // CHECK FLOATING NODES

  nodes.forEach((node) => {

    const connected = edges.some(
      (edge) =>
        edge.source === node.id ||
        edge.target === node.id
    );

    if (!connected) {

      issues.push({
        type: "warning",

        message: `${node.data.label} is floating.`,

        nodeId: node.id,
      });

    }

  });

  // CHECK GROUND PATH

  nodes.forEach((node) => {

    const grounded =
      hasPathToGround(
        node.id,
        nodes,
        edges
      );

    if (!grounded) {

      issues.push({
        type: "error",

        message:
          `${node.data.label} has no path to ground.`,

        nodeId: node.id,
      });

    }

  });

  return issues;
}