interface ScoreCardProps {
  title: string;
  score: number;
  hint: string;
  icon: string;
  delay?: number;
}

export default function ScoreCard({ title, score, hint, icon, delay = 0 }: ScoreCardProps) {
  const percentage = Math.round(score * 100);
  
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "from-green-400 to-green-600";
    if (score >= 0.4) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  const getScoreText = (score: number) => {
    if (score >= 0.7) return "Excellent";
    if (score >= 0.4) return "Good";
    return "Poor";
  };

  return (
    <div 
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
          <div className={`text-sm font-medium ${score >= 0.7 ? 'text-green-600' : score >= 0.4 ? 'text-yellow-600' : 'text-red-600'}`}>
            {getScoreText(score)}
          </div>
        </div>
      </div>
      
      <div className="relative mb-4">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-3">
        <div className="text-sm font-medium text-gray-700">{hint}</div>
      </div>
    </div>
  );
}
