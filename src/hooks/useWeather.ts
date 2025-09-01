import { useEffect, useState } from "react";
import { geocode, getForecast, getAirQuality, getSunTimes } from "../lib/api";
import { dryingIndex, commuteComfort, cleanAirWindows, goldenHourRanges, packList } from "../lib/scoring";
import type { GeoResult, ForecastResponse, AirQualityResponse, SunriseSunsetResponse } from "../lib/types";

interface WeatherData {
  location: GeoResult;
  forecast: ForecastResponse;
  air: AirQualityResponse;
  sun: SunriseSunsetResponse;
  summary: {
    temp: number;
    rh: number;
    windKmh: number;
    rainProbPct: number;
    uvMax: number;
  };
  indices: {
    dry: { score: number; label: string };
    commute: { score: number; note: string };
  };
  cleanAir: string[];
  goldenHour: { start: string; end: string }[];
  packList: string[];
}

export function useWeather(query: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchWeatherData = async () => {
      // Skip if query is too short
      if (!query || query.trim().length < 2) {
        setData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Geocode the location
        const geoResponse = await geocode(query.trim());
        
        if (isCancelled) return;

        if (!geoResponse.results || geoResponse.results.length === 0) {
          throw new Error(`No location found for "${query}"`);
        }

        const location = geoResponse.results[0];

        // Step 2: Fetch weather data in parallel
        const [forecastData, airQualityData, sunData] = await Promise.all([
          getForecast(location.latitude, location.longitude, location.timezone || "auto"),
          getAirQuality(location.latitude, location.longitude),
          getSunTimes(location.latitude, location.longitude)
        ]);

        if (isCancelled) return;

        // Step 3: Extract current weather data
        const hourlyData: ForecastResponse["hourly"] | undefined = forecastData.hourly;
        const dailyData: ForecastResponse["daily"] | undefined = forecastData.daily;

        // Get current hour data (index 0 represents current/next hour)
        const currentIndex = 0;
        
        const currentTemp = hourlyData?.temperature_2m?.[currentIndex] ?? 0;
        const currentHumidity = hourlyData?.relative_humidity_2m?.[currentIndex] ?? 0;
        const currentWindKmh = hourlyData?.wind_speed_10m?.[currentIndex] ?? 0;
        const precipitationProb = (hourlyData?.precipitation_probability?.[currentIndex] ?? 0) / 100;
        const todayUvMax = dailyData?.uv_index_max?.[0] ?? 0;

        // Step 4: Calculate indices
        const dryingScore = dryingIndex({
          rh: currentHumidity,
          windMs: currentWindKmh / 3.6, // Convert km/h to m/s
          uvMax: todayUvMax,
          precipProb: precipitationProb
        });

        const commuteScore = commuteComfort({
          tempC: currentTemp,
          rh: currentHumidity,
          uvMax: todayUvMax,
          precipProb: precipitationProb
        });

        // Step 5: Find clean air windows
        const airTimes = airQualityData.hourly?.time || [];
        const cleanAirTimes = cleanAirWindows(
          airTimes,
          airQualityData.hourly?.pm2_5,
          airQualityData.hourly?.pm10
        );

        // Step 6: Calculate golden hour times
        const goldenHours = goldenHourRanges(
          sunData.results.sunrise,
          sunData.results.sunset
        );

        // Step 7: Generate pack list
        const packingList = packList({
          precipProb: precipitationProb,
          uvMax: todayUvMax,
          windKmh: currentWindKmh
        });

        // Step 8: Set final data
        if (!isCancelled) {
          setData({
            location,
            forecast: forecastData,
            air: airQualityData,
            sun: sunData,
            summary: {
              temp: currentTemp,
              rh: currentHumidity,
              windKmh: currentWindKmh,
              rainProbPct: precipitationProb * 100,
              uvMax: todayUvMax
            },
            indices: {
              dry: dryingScore,
              commute: commuteScore
            },
            cleanAir: cleanAirTimes,
            goldenHour: goldenHours,
            packList: packingList
          });
        }

      } catch (err) {
        if (!isCancelled) {
          console.error('Weather fetch error:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchWeatherData();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [query]);

  return {
    loading,
    error,
    data
  };
}
