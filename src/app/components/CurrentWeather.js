export default function CurrentWeather({ weatherData }) {
  if (!weatherData) {
    return null;
  }

  const { name, main, weather, sys } = weatherData;
  const temperature = Math.round(main.temp);
  const description = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="current-weather-card">
      <h2 className="city-name">
        {name}, {sys.country}
      </h2>

      <img
        src={iconUrl}
        alt={description}
        className="weather-icon"
      />

      <div className="temperature">{temperature}°C</div>

      <p className="weather-description">{description}</p>

      <div className="d-flex justify-content-center gap-4 mt-3">
        <span>Feels like: {Math.round(main.feels_like)}°C</span>
        <span>Humidity: {main.humidity}%</span>
      </div>
    </div>
  );
}