import type {
  GeocodingResponse,
  ForecastResponse,
  AirQualityResponse,
  SunriseSunsetResponse,
} from "./types";

const OM_FORECAST = "https://api.open-meteo.com/v1/forecast";
const OM_AIR = "https://air-quality-api.open-meteo.com/v1/air-quality";
const OM_GEOCODE = "https://geocoding-api.open-meteo.com/v1/search";
const SUN_API = "https://api.sunrise-sunset.org/json";

export async function geocode(name: string, countryCode?: string) {
  const url = new URL(OM_GEOCODE);
  url.searchParams.set("name", name);
  url.searchParams.set("count", "5");
  if (countryCode) url.searchParams.set("countryCode", countryCode);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Geocoding failed");
  return (await res.json()) as GeocodingResponse;
}

export async function getForecast(lat: number, lon: number, tz: string = "auto") {
  const url = new URL(OM_FORECAST);
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("hourly", [
    "temperature_2m",
    "relative_humidity_2m",
    "wind_speed_10m",
    "precipitation_probability",
    "apparent_temperature",
  ].join(","));
  url.searchParams.set("daily", ["uv_index_max", "sunrise", "sunset"].join(","));
  url.searchParams.set("timezone", tz);
  url.searchParams.set("forecast_days", "3");
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Forecast failed");
  return (await res.json()) as ForecastResponse;
}

export async function getAirQuality(lat: number, lon: number) {
  const url = new URL(OM_AIR);
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("hourly", ["pm10", "pm2_5"].join(","));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Air quality failed");
  return (await res.json()) as AirQualityResponse;
}

export async function getSunTimes(lat: number, lon: number, date?: string) {
  const url = new URL(SUN_API);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lng", String(lon));
  if (date) url.searchParams.set("date", date);
  url.searchParams.set("formatted", "0"); // ISO8601
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Sun times failed");
  return (await res.json()) as SunriseSunsetResponse;
}
