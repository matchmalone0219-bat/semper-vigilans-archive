const FLAKES = [
  { left: "4%", delay: "0s", duration: "11s", size: 2, drift: "18px" },
  { left: "9%", delay: "3.2s", duration: "14s", size: 3, drift: "-22px" },
  { left: "14%", delay: "1.1s", duration: "9s", size: 2, drift: "12px" },
  { left: "19%", delay: "6.4s", duration: "13s", size: 4, drift: "-16px" },
  { left: "24%", delay: "2.0s", duration: "10s", size: 2, drift: "26px" },
  { left: "29%", delay: "8.1s", duration: "15s", size: 3, drift: "-10px" },
  { left: "35%", delay: "0.6s", duration: "12s", size: 2, drift: "20px" },
  { left: "40%", delay: "4.8s", duration: "8s", size: 5, drift: "-28px" },
  { left: "45%", delay: "1.7s", duration: "16s", size: 2, drift: "8px" },
  { left: "51%", delay: "7.3s", duration: "11s", size: 3, drift: "-18px" },
  { left: "56%", delay: "2.9s", duration: "13s", size: 2, drift: "24px" },
  { left: "61%", delay: "5.5s", duration: "9s", size: 4, drift: "-14px" },
  { left: "67%", delay: "0.3s", duration: "14s", size: 2, drift: "16px" },
  { left: "72%", delay: "6.8s", duration: "10s", size: 3, drift: "-24px" },
  { left: "77%", delay: "3.6s", duration: "12s", size: 2, drift: "11px" },
  { left: "82%", delay: "1.4s", duration: "15s", size: 4, drift: "-20px" },
  { left: "87%", delay: "8.6s", duration: "9s", size: 2, drift: "22px" },
  { left: "92%", delay: "4.1s", duration: "13s", size: 3, drift: "-12px" },
  { left: "11%", delay: "9.2s", duration: "17s", size: 5, drift: "14px" },
  { left: "48%", delay: "5.0s", duration: "18s", size: 4, drift: "-8px" },
  { left: "63%", delay: "7.9s", duration: "16s", size: 5, drift: "19px" },
  { left: "33%", delay: "2.4s", duration: "11s", size: 2, drift: "-26px" },
  { left: "74%", delay: "0.9s", duration: "14s", size: 3, drift: "15px" },
  { left: "96%", delay: "6.0s", duration: "12s", size: 2, drift: "-17px" },
];

export function Atmosphere() {
  return <div className="grain-layer" aria-hidden="true" />;
}

export function Snow() {
  return (
    <div className="snow-layer" aria-hidden="true">
      {FLAKES.map((flake) => (
        <span
          key={`${flake.left}-${flake.delay}`}
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            ["--drift" as string]: flake.drift,
          }}
        />
      ))}
    </div>
  );
}
