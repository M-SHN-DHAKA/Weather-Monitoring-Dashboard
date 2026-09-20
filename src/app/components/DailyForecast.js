export default function DailyForecast({ forecastData }) {
  if (!forecastData || !forecastData.list) {
    return null;
  }

  // Group the 3-hourly data by day          
  const dailyMap = {};

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US', { weekday: 'long' });

    if (!dailyMap[dayKey]) {
      dailyMap[dayKey] = {
        temps: [],
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    }

    dailyMap[dayKey].temps.push(item.main.temp);
  });

  // Taking the first 4 days     
  const dailyEntries = Object.entries(dailyMap).slice(0, 4);

  return (
    <div className="daily-forecast-wrapper">
      <h4 className="mb-3">4 Days Forecast</h4>

      {dailyEntries.map(([day, data]) => {
        const maxTemp = Math.round(Math.max(...data.temps));
        const minTemp = Math.round(Math.min(...data.temps));
        const iconUrl = `https://openweathermap.org/img/wn/${data.icon}.png`;

        return (
          <div key={day} className="daily-card">
            <span className="day-name">{day}</span>
            <img src={iconUrl} alt={data.description} width="40" height="40" />
            <span className="day-temp-range">
              {maxTemp}° / {minTemp}°C
            </span>
          </div>
        );
      })}
    </div>
  );
}