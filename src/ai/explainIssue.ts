import type {
  CircuitIssue,
} from "../circuit/analysis/validateCircuit";

export function explainIssue(
  issue: CircuitIssue
): string {

  if (
    issue.message.includes(
      "no ground reference"
    )
  ) {
    return `
A circuit requires a ground reference
to establish a common voltage point.

Without ground:
- voltages become undefined
- simulation becomes unstable
- current return paths are invalid

Suggested Fix:
Add a ground component to the circuit.
`;
  }

  if (
    issue.message.includes(
      "floating"
    )
  ) {
    return `
This component is electrically floating.

That means it is not part of a complete
current path.

Possible consequences:
- no current flow
- undefined voltages
- invalid circuit behavior

Suggested Fix:
Connect this component to the rest
of the circuit and ensure a path
to ground exists.
`;
  }

  if (
    issue.message.includes(
      "Short circuit"
    )
  ) {
    return `
A short circuit occurs when a voltage
source connects directly to ground
with little or no resistance.

Possible consequences:
- extremely high current
- overheating
- component damage
- simulation instability

Suggested Fix:
Insert a load or resistor between
the voltage source and ground.
`;
  }

  return `
Unknown issue detected.
`;
}