const DROPS = [
  { left: "6%", delay: "0s", duration: "0.9s", height: 18 },
  { left: "14%", delay: "0.3s", duration: "0.75s", height: 22 },
  { left: "22%", delay: "0.1s", duration: "0.85s", height: 16 },
  { left: "31%", delay: "0.55s", duration: "0.7s", height: 24 },
  { left: "39%", delay: "0.2s", duration: "0.95s", height: 18 },
  { left: "48%", delay: "0.4s", duration: "0.8s", height: 20 },
  { left: "57%", delay: "0.15s", duration: "0.72s", height: 26 },
  { left: "66%", delay: "0.5s", duration: "0.88s", height: 16 },
  { left: "74%", delay: "0.05s", duration: "0.78s", height: 22 },
  { left: "83%", delay: "0.35s", duration: "0.92s", height: 18 },
  { left: "91%", delay: "0.25s", duration: "0.76s", height: 20 },
];

export function Atmosphere() {
  return <div className="grain-layer" aria-hidden="true" />;
}

export function Rain() {
  return (
    <div className="rain-layer" aria-hidden="true">
      {DROPS.map((drop) => (
        <span
          key={drop.left}
          style={{
            left: drop.left,
            height: drop.height,
            animationDelay: drop.delay,
            animationDuration: drop.duration,
          }}
        />
      ))}
    </div>
  );
}
