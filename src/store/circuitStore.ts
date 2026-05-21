import { create } from "zustand";

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type Edge,
  type NodeChange,
  type EdgeChange,
} from "reactflow";

import type { CircuitNode } from "../types/circuit";

import {
  type CircuitIssue,
} from "../circuit/analysis/validateCircuit";

import {
  saveCircuit as persistCircuit,
  loadCircuit as restoreCircuit,
} from "../utils/circuitPersistence";

import {
  solveCircuit,
} from "../circuit/simulation/solveCircuit";

type CircuitStore = {

  nodes: CircuitNode[];

  edges: Edge[];

  selectedNodeId: string | null;

  issues: CircuitIssue[];

  simulationResult: any;

  addNode: (
    node: CircuitNode
  ) => void;

  setNodes: (
    nodes: CircuitNode[]
  ) => void;

  setEdges: (
    edges: Edge[]
  ) => void;

  setSelectedNode: (
    nodeId: string | null
  ) => void;

  setIssues: (
    issues: CircuitIssue[]
  ) => void;

  updateNodeData: (
    nodeId: string,
    data: Partial<CircuitNode["data"]>
  ) => void;

  saveCircuit: () => void;

  loadCircuit: () => void;

  runSimulation: () => void;

  onNodesChange: (
    changes: NodeChange[]
  ) => void;

  onEdgesChange: (
    changes: EdgeChange[]
  ) => void;

  onConnect: (
    connection: Connection
  ) => void;
};

export const useCircuitStore =
  create<CircuitStore>((set) => ({

    nodes: [],

    edges: [],

    selectedNodeId: null,

    issues: [],

    simulationResult: null,

    addNode: (node) =>
      set((state) => ({
        nodes: [...state.nodes, node],
      })),

    setNodes: (nodes) =>
      set({
        nodes,
      }),

    setEdges: (edges) =>
      set({
        edges,
      }),

    setSelectedNode: (nodeId) =>
      set({
        selectedNodeId: nodeId,
      }),

    setIssues: (issues) =>
      set({
        issues,
      }),

    updateNodeData: (
      nodeId,
      data
    ) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,

                data: {
                  ...node.data,
                  ...data,
                },
              }
            : node
        ),
      })),

    saveCircuit: () =>
      set((state) => {

        persistCircuit({
          nodes: state.nodes,
          edges: state.edges,
        });

        return state;

      }),

    loadCircuit: () => {

      const data =
        restoreCircuit();

      if (!data) {
        return;
      }

      set({
        nodes:
          data.nodes as CircuitNode[],

        edges: data.edges,
      });

    },

    runSimulation: () =>
      set((state) => ({

        simulationResult:
          solveCircuit(
            state.nodes,
            state.edges
          ),

      })),

    onNodesChange: (changes) =>
      set((state) => ({
        nodes: applyNodeChanges(
          changes,
          state.nodes
        ) as CircuitNode[],
      })),

    onEdgesChange: (changes) =>
      set((state) => ({
        edges: applyEdgeChanges(
          changes,
          state.edges,
        ),
      })),

    onConnect: (connection) =>
      set((state) => ({
        edges: addEdge(
          connection,
          state.edges,
        ),
      })),

  }));