import { useCircuitStore } from "../store/circuitStore";

import type {
  ComponentType,
  CircuitNode,
  Terminal,
} from "../types/circuit";

const components: ComponentType[] = [
  "resistor",
  "capacitor",
  "voltage",
  "ground",
];

const defaultProperties = {
  resistor: {
    resistance: 1000,
  },

  capacitor: {
    capacitance: 1,
  },

  voltage: {
    voltage: 5,
  },

  ground: {},
};

const defaultTerminals: Record<
  ComponentType,
  Terminal[]
> = {

  resistor: [
    {
      id: "left",
      label: "Left",
    },

    {
      id: "right",
      label: "Right",
    },
  ],

  capacitor: [
    {
      id: "left",
      label: "Left",
    },

    {
      id: "right",
      label: "Right",
    },
  ],

  voltage: [
    {
      id: "positive",
      label: "Positive",
    },

    {
      id: "negative",
      label: "Negative",
    },
  ],

  ground: [
    {
      id: "gnd",
      label: "Ground",
    },
  ],

};

export default function Toolbar() {

  const addNode = useCircuitStore(
    (state) => state.addNode
  );

  const handleAdd = (
    type: ComponentType
  ) => {

    const id = crypto.randomUUID();

    const node: CircuitNode = {

      id,

      type,

      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },

      data: {

        label: type.toUpperCase(),

        componentType: type,

        properties:
          defaultProperties[type],

        terminals:
          defaultTerminals[type],

      },

    };

    addNode(node);

  };

  return (
    <div className="flex flex-col gap-3">

      {components.map((component) => (

        <button
          key={component}
          onClick={() =>
            handleAdd(component)
          }
          className="bg-slate-800 hover:bg-slate-700 text-white rounded p-3 transition-colors"
        >
          {component.toUpperCase()}
        </button>

      ))}

    </div>
  );
}