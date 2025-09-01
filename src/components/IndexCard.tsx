interface IndexCardProps {
  title: string;
  subtitle?: string;
  items: string[];
  delay?: number;
}

export default function IndexCard({ title, subtitle, items, delay = 0 }: IndexCardProps) {
  return (
    <div 
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 flex-shrink-0"></div>
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2 opacity-50">🌫️</div>
          <div className="text-sm text-gray-500 italic">No data available</div>
        </div>
      )}
    </div>
  );
}
