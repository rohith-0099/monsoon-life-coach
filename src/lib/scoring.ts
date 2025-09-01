export function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

// Simple heat proxy (not full NOAA Heat Index; fast + no extra APIs)
export function heatProxyC(tempC: number, rh: number) {
  return tempC + 0.1 * rh / 10; // tweakable
}

export function dryingIndex(params: {
  rh: number;       // %
  windMs: number;   // m/s
  uvMax: number;    // index (0-11+)
  precipProb: number; // 0-1
}) {
  const { rh, windMs, uvMax, precipProb } = params;
  const termRh = 0.4 * (1 - rh / 100);
  const termWind = 0.3 * clamp01(windMs / 10);
  const termUv = 0.2 * clamp01(uvMax / 8);
  const termRain = 0.6 * clamp01(precipProb);
  const score = clamp01(termRh + termWind + termUv - termRain);
  let label = "Avoid";
  if (score > 0.66) label = "Hang now";
  else if (score > 0.33) label = "Partial shade";
  return { score, label };
}

export function commuteComfort(params: {
  tempC: number;
  rh: number;
  uvMax: number;
  precipProb: number; // 0-1
}) {
  const HI = heatProxyC(params.tempC, params.rh);
  const s = 1 - (0.5 * clamp01(HI / 45) + 0.3 * clamp01(params.uvMax / 8) + 0.4 * clamp01(params.precipProb));
  const score = clamp01(s);
  let note = "Good";
  if (score < 0.33) note = "Tough: umbrella/visor";
  else if (score < 0.66) note = "OK: plan shade";
  return { score, note };
}

export function cleanAirWindows(times: string[], pm25?: number[], pm10?: number[]) {
  if (!pm25 && !pm10) return [];
  const list = times.map((t, i) => ({
    time: t,
    pmScore: (pm25?.[i] ?? 0) + 0.5 * (pm10?.[i] ?? 0),
  }));
  const sorted = list.sort((a, b) => a.pmScore - b.pmScore).slice(0, 3);
  return sorted.map((s) => s.time);
}

export function packList(params: {
  precipProb: number; // 0-1
  uvMax: number;
  windKmh: number;
}) {
  const items: string[] = [];
  if (params.precipProb > 0.3) items.push("Umbrella / rain jacket");
  if (params.uvMax > 6) items.push("Sunscreen + cap");
  if (params.windKmh > 25) items.push("Windproof layer / visor");
  if (items.length === 0) items.push("Hydration + light layer");
  return items;
}

// Golden hour (approx) helper if you want to compute locally from sunrise/sunset
export function goldenHourRanges(sunriseISO: string, sunsetISO: string, padMin = 60) {
  const sr = new Date(sunriseISO).getTime();
  const ssr = new Date(sunsetISO).getTime();
  const ms = padMin * 60 * 1000;
  return [
    { start: new Date(sr).toISOString(), end: new Date(sr + ms).toISOString() },
    { start: new Date(ssr - ms).toISOString(), end: new Date(ssr).toISOString() },
  ];
}
