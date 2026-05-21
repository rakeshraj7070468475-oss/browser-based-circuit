export function saveCircuit(data: any) {

  localStorage.setItem(
    "circuit-data",
    JSON.stringify(data)
  );
}

export function loadCircuit() {

  const raw =
    localStorage.getItem("circuit-data");

  if (!raw) {
    return null;
  }

  return JSON.parse(raw);
}