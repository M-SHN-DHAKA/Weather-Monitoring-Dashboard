"use client";

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import {
  fetchWeatherByCoords,
  fetchWeatherByCity,
  fetchForecastByCity,
} from './lib/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Show the weather of the user's current location when the page first loads    
  useEffect(() => {
    if (!navigator.geolocation) {                                                           
      setError('Your browser does not support geolocation. Please search by city name.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;              
        try {
          const currentWeather = await fetchWeatherByCoords(latitude, longitude);
          setWeatherData(currentWeather);

          const forecast = await fetchForecastByCity(currentWeather.name);
          setForecastData(forecast);
        } catch (err) {
          setError('Weather data fetch failed. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location pemission denied. Please search by city name.'); 
        setLoading(false);
      }
    );
  }, []);

  // Fetch weather by city name from the search bar           
  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const currentWeather = await fetchWeatherByCity(city);
      setWeatherData(currentWeather);

      const forecast = await fetchForecastByCity(city);
      setForecastData(forecast);
    } catch (err) {
      setError(`"${city}" This city not found. Please try again.`);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-dashboard">
      <h1 className="dashboard-title">M SHN Weather Monitoring Dashboard</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="status-message">Loading...</p>}

      {error && <p className="status-message text-danger">{error}</p>}

      {!loading && !error && weatherData && (
        <>
          <CurrentWeather weatherData={weatherData} />
          <HourlyForecast forecastData={forecastData} />
          <DailyForecast forecastData={forecastData} />
        </>
      )}
    </div>
  );
}