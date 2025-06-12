import axios from 'axios';
import React, { useState } from 'react';

function Weather() {
  const [inputCity, setInputCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "0b9537a3eae917dacaa0de694c4ce884";

  const fetchWeather = () => {
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${API_KEY}`)
      .then(res => {
        setWeatherData({
          city: res.data.name,
          temp: Math.floor(res.data.main.temp),
          humidity: res.data.main.humidity,
          icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
          description: res.data.weather[0].description
        });
      })
      .catch(() => alert("City not found"));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 to-blue-200 min-h-screen p-6 text-gray-800 rounded-xl">
  <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg tracking-wide">☀️ Weather App</h1>

 
  <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
    <input
      type="text"
      value={inputCity}
      onChange={(e) => setInputCity(e.target.value)}
      placeholder="Enter city name"
      className="flex-1 border border-blue-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-black"
    />
    <button
      onClick={fetchWeather}
      disabled={inputCity === ''}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Search
    </button>
  </div>

  
  {weatherData && (
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs text-center transition-all duration-300">
      <img
        src={weatherData.icon}
        alt="weather"
        className="w-24 h-24 mx-auto mb-4"
      />
      <h3 className="capitalize text-xl font-semibold text-gray-700 mb-2">
        {weatherData.description}
      </h3>
      <div className="text-gray-600 mb-1">
        📍 <span className="font-medium">Location:</span> {weatherData.city}
      </div>
      <div className="text-gray-600 mb-1">
        🌡️ <span className="font-medium">Temperature:</span> {weatherData.temp}°C
      </div>
      <div className="text-gray-600">
        💧 <span className="font-medium">Humidity:</span> {weatherData.humidity}%
      </div>
    </div>
  )}
</div>

  );
}

export default Weather;