import type { Node } from "reactflow";

export type ComponentType =
  | "resistor"
  | "capacitor"
  | "voltage"
  | "ground";

export type ComponentProperties = {
  resistance?: number;

  capacitance?: number;

  voltage?: number;
};

export type Terminal = {
  id: string;

  label: string;
};

export type CircuitNodeData = {
  label: string;

  componentType: ComponentType;

  properties: ComponentProperties;

  terminals: Terminal[];
};

export type CircuitNode =
  Node<CircuitNodeData>;