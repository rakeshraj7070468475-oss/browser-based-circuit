import { useCircuitStore } from "../store/circuitStore";

import {
  explainIssue,
} from "../ai/explainIssue";

export default function AIDebugPanel() {

  const issues = useCircuitStore(
    (state) => state.issues
  );

  if (issues.length === 0) {
    return (
      <div className="text-green-400">
        No debugging suggestions
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">
        AI Debugger
      </h2>

      {issues.map((issue, index) => (

        <div
          key={index}
          className="p-4 rounded bg-slate-800 border border-slate-700"
        >

          <div className="font-semibold mb-2 text-red-400">
            {issue.message}
          </div>

          <div className="text-sm whitespace-pre-line text-slate-300">
            {explainIssue(issue)}
          </div>

        </div>

      ))}

    </div>
  );
}