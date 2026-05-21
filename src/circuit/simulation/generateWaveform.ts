export function generateWaveform(
  amplitude: number = 5
) {

  const data = [];

  for (let i = 0; i < 100; i++) {

    const time = i * 0.1;

    const voltage =
  amplitude *
  Math.sin(
    time +
    Date.now() / 500
  );

    data.push({
      time:
        Number(time.toFixed(2)),

      voltage:
        Number(voltage.toFixed(2)),
    });
  }

  return data;
}