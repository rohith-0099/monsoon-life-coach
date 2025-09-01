import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CurrentSummary from "../components/CurrentSummary";
import ScoreCard from "../components/ScoreCard";
import IndexCard from "../components/IndexCard";
import GoldenHourCard from "../components/GoldenHourCard";
import PackList from "../components/PackList";
import LoadingSpinner from "../components/LoadingSpinner";
import { useWeather } from "../hooks/useWeather";

export default function Home() {
  const [q, setQ] = useState("Kochi");
  const { loading, error, data } = useWeather(q);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-12 fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            ☔ Monsoon Life Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turn weather forecasts into smart daily decisions with AI-powered insights
          </p>
        </header>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8 slide-in-left">
          <SearchBar onSearch={setQ} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-gray-600">Fetching weather insights...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {data && (
          <div className="space-y-8 fade-in-up">
            {/* Current Weather Summary */}
            <div className="max-w-4xl mx-auto">
              <CurrentSummary
                city={`${data.location.name}, ${data.location.country ?? ""}`}
                temp={data.summary.temp}
                rh={data.summary.rh}
                windKmh={data.summary.windKmh}
                rainProbPct={data.summary.rainProbPct}
                uvMax={data.summary.uvMax}
              />
            </div>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <ScoreCard 
                title="🧺 Laundry Drying Index" 
                score={data.indices.dry.score} 
                hint={data.indices.dry.label}
                icon="🧺"
              />
              <ScoreCard 
                title="🚗 Commute Comfort" 
                score={data.indices.commute.score} 
                hint={data.indices.commute.note}
                icon="🚗"
              />
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <IndexCard 
                title="🌬️ Clean-Air Windows" 
                subtitle="Next best hours"
                items={data.cleanAir.map((t: string) =>
                  new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                )}
              />
              
              <GoldenHourCard 
                windows={data.goldenHour} 
              />
              
              <PackList 
                items={data.packList} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
