export type GeoResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
};

export type GeocodingResponse = {
  results?: GeoResult[];
};

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly?: {
    time: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    wind_speed_10m?: number[];
    precipitation_probability?: number[];
    apparent_temperature?: number[];
  };
  daily?: {
    time: string[];
    uv_index_max?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
};

export type AirQualityResponse = {
  hourly?: {
    time: string[];
    pm10?: number[];
    pm2_5?: number[];
  };
};

export type SunriseSunsetResponse = {
  results: {
    sunrise: string;
    sunset: string;
    golden_hour?: string; // not always in this API; computed client-side
    day_length: string;
    civil_twilight_begin: string;
    civil_twilight_end: string;
  };
  status: string;
};
