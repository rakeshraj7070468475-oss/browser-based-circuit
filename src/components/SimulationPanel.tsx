import { useCircuitStore } from "../store/circuitStore";

export default function SimulationPanel() {

  const simulationResult =
    useCircuitStore(
      (state) => state.simulationResult
    );

  if (!simulationResult) {

    return (
      <div className="text-slate-400">
        No simulation data
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">
        Simulation
      </h2>

      <div className="p-3 bg-slate-800 rounded">

        <div className="font-semibold">
          Current
        </div>

        <div className="text-cyan-400">
          {simulationResult.current.toFixed(4)} A
        </div>

      </div>

      <div className="space-y-2">

        <div className="font-semibold">
          Node Voltages
        </div>

        {
          Object.entries(
            simulationResult.nodeVoltages
          ).map(([nodeId, voltage]) => {

            const node =
              useCircuitStore
                .getState()
                .nodes
                .find(
                  (n: any) =>
                    n.id === nodeId
                );

            return (
              <div
                key={nodeId}
                className="p-2 bg-slate-800 rounded text-sm"
              >

                {node?.data.label}

                {" : "}

                {(voltage as number).toFixed(2)}V

              </div>
            );
          })
        }

      </div>

      <div className="space-y-2">

        <div className="font-semibold">
          Resistor Power
        </div>

        {
          Object.entries(
            simulationResult.resistorPower
          ).map(([nodeId, power]) => {

            const node =
              useCircuitStore
                .getState()
                .nodes
                .find(
                  (n: any) =>
                    n.id === nodeId
                );

            return (
              <div
                key={nodeId}
                className="p-2 bg-slate-800 rounded text-sm"
              >

                {node?.data.label}

                {" : "}

                {(power as number).toFixed(4)}W

              </div>
            );
          })
        }

      </div>

    </div>
  );
}