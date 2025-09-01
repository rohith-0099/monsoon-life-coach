interface CurrentSummaryProps {
  city: string;
  temp: number;
  rh: number;
  windKmh: number;
  rainProbPct: number;
  uvMax: number;
}

export default function CurrentSummary({
  city,
  temp,
  rh,
  windKmh,
  rainProbPct,
  uvMax
}: CurrentSummaryProps) {
  const getWeatherIcon = () => {
    if (rainProbPct > 70) return "🌧️";
    if (rainProbPct > 30) return "⛅";
    if (temp > 30) return "☀️";
    return "🌤️";
  };

  const getUVColor = (uv: number) => {
    if (uv <= 2) return "text-green-600 bg-green-100";
    if (uv <= 5) return "text-yellow-600 bg-yellow-100";
    if (uv <= 7) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 animate-pulse-custom">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2 animate-bounce">
          {getWeatherIcon()}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{city}</h2>
        <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {temp.toFixed(1)}°C
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-300">
          <div className="text-2xl mb-1">💧</div>
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="font-bold text-blue-600">{rh.toFixed(0)}%</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors duration-300">
          <div className="text-2xl mb-1">💨</div>
          <div className="text-sm text-gray-600">Wind</div>
          <div className="font-bold text-green-600">{windKmh.toFixed(0)} km/h</div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors duration-300">
          <div className="text-2xl mb-1">☔</div>
          <div className="text-sm text-gray-600">Rain</div>
          <div className="font-bold text-purple-600">{rainProbPct.toFixed(0)}%</div>
        </div>
        
        <div className="text-center p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors duration-300">
          <div className="text-2xl mb-1">☀️</div>
          <div className="text-sm text-gray-600">UV Index</div>
          <div className={`font-bold px-2 py-1 rounded-lg ${getUVColor(uvMax)}`}>
            {uvMax.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
}
