import { useEffect } from "react";

import { useCircuitStore } from "../store/circuitStore";

export default function useKeyboardShortcuts() {

  const selectedNodeId = useCircuitStore(
    (state) => state.selectedNodeId
  );

  const nodes = useCircuitStore(
    (state) => state.nodes
  );

  const edges = useCircuitStore(
    (state) => state.edges
  );

  const setNodes = useCircuitStore(
    (state: any) => state.setNodes
  );

  const setEdges = useCircuitStore(
    (state: any) => state.setEdges
  );

  useEffect(() => {

    function handleKeyDown(
      e: KeyboardEvent
    ) {

      if (
        e.key === "Delete" &&
        selectedNodeId
      ) {

        setNodes(
          nodes.filter(
            (n: any) =>
              n.id !== selectedNodeId
          )
        );

        setEdges(
          edges.filter(
            (e: any) =>
              e.source !== selectedNodeId &&
              e.target !== selectedNodeId
          )
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    selectedNodeId,
    nodes,
    edges,
    setNodes,
    setEdges,
  ]);
}