import { useEffect } from "react";

import { useCircuitStore } from "../store/circuitStore";

import {
  validateCircuit,
} from "../circuit/analysis/validateCircuit";

export default function useCircuitValidation() {

  const nodes = useCircuitStore(
    (state) => state.nodes
  );

  const edges = useCircuitStore(
    (state) => state.edges
  );

  const setIssues = useCircuitStore(
    (state) => state.setIssues
  );

  const runSimulation =
    useCircuitStore(
      (state) => state.runSimulation
    );

  useEffect(() => {

    const issues =
      validateCircuit(
        nodes,
        edges
      );

    setIssues(issues);

    runSimulation();

  }, [
    nodes,
    edges,
    setIssues,
    runSimulation,
  ]);
}