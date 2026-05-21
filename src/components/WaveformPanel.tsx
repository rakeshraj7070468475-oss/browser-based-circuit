import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import {
  generateWaveform,
} from "../circuit/simulation/generateWaveform";

import { useCircuitStore } from "../store/circuitStore";

export default function WaveformPanel() {

  const [, forceUpdate] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        forceUpdate(
          (v) => v + 1
        );

      }, 100);

    return () =>
      clearInterval(interval);

  }, []);

  const nodes = useCircuitStore(
    (state) => state.nodes
  );

  const voltageNode = nodes.find(
    (node) =>
      node.data.componentType ===
      "voltage"
  );

  const amplitude =
    voltageNode?.data.properties
      ?.voltage || 5;

  const data =
    generateWaveform(amplitude);

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Oscilloscope
        </h2>

        <div className="text-sm text-slate-400">
          Live Voltage Waveform
        </div>

      </div>

      <div
        className="
          h-65
          bg-slate-900
          rounded
          border
          border-slate-700
          p-2
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="voltage"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}