# ☔ Monsoon Life Coach

A smart weather web application that transforms basic weather forecasts into actionable daily guidance. Instead of just showing temperature and rain probability, this app provides intelligent recommendations for real-life decisions like laundry drying, commuting, outdoor activities, and daily planning.

![Weather App Screenshot](https://img.shields.io/badge/React-18.0+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Vite](https://img.shields.io/badge/Vite-5.0+-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.0+-green)

## ✨ Features

### 🧺 **Laundry Drying Index**
- Calculates optimal clothes drying conditions using humidity, wind speed, UV index, and precipitation
- Provides clear recommendations: "Hang now," "Partial shade," or "Avoid - use indoor drying"

### 🚗 **Commute Comfort Score**
- Evaluates travel comfort based on heat index, UV exposure, and rain probability
- Suggests when to carry umbrellas, wear protective gear, or avoid peak hours

### 🌬️ **Clean-Air Windows**
- Identifies 3-hour periods with lowest air pollution (PM2.5/PM10)
- Perfect for timing outdoor exercises, window ventilation, or jogging

### 📸 **Golden Hour Finder**
- Shows optimal photography and outdoor activity times
- Calculates sunrise, sunset, and golden hour windows automatically

### 🎒 **Smart Pack Recommendations**
- Dynamic suggestions based on current and forecasted conditions
- Recommends umbrellas, sunscreen, hydration, windproof layers

## 🚀 Live Demo

**Website:** [Live Demo Link](your-vercel-url-here)

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom animations
- **APIs:** Open-Meteo (Weather, Air Quality, Geocoding) + Sunrise-Sunset API
- **Hosting:** Vercel (Static Site)

## 📡 APIs Used

- **Open-Meteo Weather Forecast API** - `https://api.open-meteo.com/v1/forecast`
- **Open-Meteo Air Quality API** - `https://air-quality-api.open-meteo.com/v1/air-quality`
- **Open-Meteo Geocoding API** - `https://geocoding-api.open-meteo.com/v1/search`
- **Sunrise-Sunset API** - `https://api.sunrise-sunset.org/json`

*All APIs are completely free, require no authentication, and have no rate limits for personal use.*

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
git clone https://github.com/rohith-0099/monsoon-life-coach.git
cd monsoon-life-coach


2. **Install dependencies**
npm install


3. **Start development server**
npm run dev


4. **Open browser**
http://localhost:5173


### Build for Production

Build the project
npm run build

Preview build locally
npm run preview


## 📁 Project Structure

monsoon-life-coach/
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── SearchBar.tsx
│ │ ├── CurrentSummary.tsx
│ │ ├── ScoreCard.tsx
│ │ ├── IndexCard.tsx
│ │ ├── GoldenHourCard.tsx
│ │ ├── PackList.tsx
│ │ └── LoadingSpinner.tsx
│ ├── hooks/ # Custom React hooks
│ │ └── useWeather.ts
│ ├── lib/ # Utilities and API functions
│ │ ├── api.ts
│ │ ├── scoring.ts
│ │ ├── types.ts
│ │ └── formatting.ts
│ ├── pages/ # Page components
│ │ └── Home.tsx
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.cjs
└── tsconfig.json


## 🧮 Smart Algorithms

### Laundry Drying Formula
D = 0.4×(1-RH/100) + 0.3×min(WS/10,1) + 0.2×min(UV/8,1) - 0.6×P

- RH: Relative Humidity (%)
- WS: Wind Speed (m/s) 
- UV: UV Index (0-11+)
- P: Precipitation Probability (0-1)

### Commute Comfort Formula
C = 1 - (0.5×min(HI/45,1) + 0.3×min(UV/8,1) + 0.4×P)

- HI: Heat Index proxy from temperature and humidity
- UV: UV Index
- P: Precipitation Probability

## 🎨 Features Showcase

- **Glass Morphism UI** with backdrop blur effects
- **Smooth Animations** including fade-in, slide-in, and hover effects
- **Responsive Design** optimized for desktop and mobile
- **Real-time Weather Data** with intelligent interpretation
- **Zero Cost** - completely free to build, host, and use

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Auto-deployment on every push

### Manual Deployment

Build project
npm run build

Deploy dist/ folder to any static hosting service


## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Rohith** - [@rohith-0099](https://github.com/rohith-0099)

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for free weather APIs
- [Sunrise-Sunset.org](https://sunrise-sunset.org/) for solar timing data
- [Tailwind CSS](https://tailwindcss.com/) for styling framework
- [Vite](https://vitejs.dev/) for build tooling

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/rohith-0099/monsoon-life-coach)
![GitHub language count](https://img.shields.io/github/languages/count/rohith-0099/monsoon-life-coach)
![GitHub top language](https://img.shields.io/github/languages/top/rohith-0099/monsoon-life-coach)

---

⭐ **Star this repository if you found it helpful!**

💡 **Have suggestions?** Open an issue or submit a pull request.

🌐 **Live Demo:** [monsoon-life-coach.vercel.app](monsoon-life-coach.vercel.app)
