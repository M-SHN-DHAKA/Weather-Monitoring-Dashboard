export default function HourlyForecast({ forecastData }) {
  if (!forecastData || !forecastData.list) {
    return null;
  }

  // API returns data every 3 hours; taking the first 8 items gives the next 24-hour forecast         
  const hourlyItems = forecastData.list.slice(0, 8);

  return (
    <div className="hourly-forecast-wrapper">
      <h4 className="mb-3">Hourly Forecast</h4>

      <div className="hourly-scroll">
        {hourlyItems.map((item) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });
          const temp = Math.round(item.main.temp);
          const iconCode = item.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

          return (
            <div key={item.dt} className="hourly-card">
              <div className="hour-time">{time}</div>
              <img src={iconUrl} alt={item.weather[0].description} width="40" height="40" />
              <div className="hour-temp">{temp}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}