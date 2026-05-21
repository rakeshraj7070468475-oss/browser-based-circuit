import type { Edge } from "reactflow";

import type { CircuitNode } from "../../types/circuit";

type SimulationResult = {
  current: number;

  nodeVoltages: Record<string, number>;

  resistorPower: Record<string, number>;
};

export function solveCircuit(
  nodes: CircuitNode[],
  _edges: Edge[]
): SimulationResult | null {

  const voltageSource = nodes.find(
    (node) =>
      node.data.componentType ===
      "voltage"
  );

  const resistors = nodes.filter(
    (node) =>
      node.data.componentType ===
      "resistor"
  );

  const ground = nodes.find(
    (node) =>
      node.data.componentType ===
      "ground"
  );

  if (
    !voltageSource ||
    !ground ||
    resistors.length === 0
  ) {
    return null;
  }

  const sourceVoltage =
    voltageSource.data.properties.voltage || 0;

  const totalResistance =
    resistors.reduce(
      (sum, resistor) =>
        sum +
        (
          resistor.data.properties
            .resistance || 0
        ),
      0
    );

  if (totalResistance === 0) {
    return null;
  }

  const current =
    sourceVoltage / totalResistance;

  const nodeVoltages:
    Record<string, number> = {};

  const resistorPower:
    Record<string, number> = {};

  let remainingVoltage =
    sourceVoltage;

  resistors.forEach((resistor) => {

    const resistance =
      resistor.data.properties
        .resistance || 0;

    const voltageDrop =
      current * resistance;

    nodeVoltages[resistor.id] =
      remainingVoltage;

    resistorPower[resistor.id] =
      current * current * resistance;

    remainingVoltage -= voltageDrop;

  });

  nodeVoltages[ground.id] = 0;

  return {
    current,
    nodeVoltages,
    resistorPower,
  };
}