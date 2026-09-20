import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather using browser geolocation (latitude, longitude)
 */
export async function fetchWeatherByCoords(latitude, longitude) {
  try {
    const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Coordinates দিয়ে আবহাওয়া আনতে সমস্যা হয়েছে:', error.message);
    throw error;
  }
}

/**
 * Fetch current weather by city name (used from the search bar)
 */
export async function fetchWeatherByCity(city) {
  try {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('শহরের নাম দিয়ে আবহাওয়া আনতে সমস্যা হয়েছে:', error.message);
    throw error;
  }
}

/**
 * Fetch 5-day forecast by city name (data every 3 hours)
 * This is used to build both hourly and daily forecasts
 */
export async function fetchForecastByCity(city) {
  try {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    throw error;
  }
}