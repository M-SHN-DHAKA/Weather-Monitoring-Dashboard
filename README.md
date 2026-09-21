# Weather Monitoring Dashboard

A responsive weather dashboard built with Next.js that shows current conditions, an hourly forecast, and a 4-day outlook for any city — or automatically for the user's current location.

The app fetches live data from the OpenWeatherMap API and renders it through a clean, card-based UI. No backend of its own; all weather data comes directly from a third-party API.

## Stack

| Concern       | Choice                                   |
|---------------|-------------------------------------------|
| Framework     | Next.js 16, App Router                    |
| Language      | JavaScript (no TypeScript)                |
| Styling       | Bootstrap 5 + custom CSS                  |
| HTTP client   | Axios                                     |
| Weather data  | OpenWeatherMap API (Current Weather & 5 Day / 3 Hour Forecast, `/data/2.5`) |
| Location      | Browser Geolocation API                   |

## Getting started

Requires Node.js 18 or newer and a free [OpenWeatherMap](https://openweathermap.org/) API key.

```bash
npm install
```

Create a `.env.local` file in the project root and add your API key:

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

> Note: a newly generated OpenWeatherMap key can take 1–2 hours to activate.

Then run the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

Other scripts:

```bash
npm run build
npm run start
npm run lint
```

## Project structure

```
src/
  app/
    layout.js              Root layout — imports Bootstrap and global CSS
    page.js                Page composition — state, geolocation, search handler
    globals.css             Custom theme (dark UI, cards, scrollbars)
    components/
      SearchBar.js          City search input and submit button
      CurrentWeather.js     Current temperature, condition, icon
      HourlyForecast.js     Next 24 hours, in 3-hour steps
      DailyForecast.js      4-day outlook grouped by day
    lib/
      weather.js            All OpenWeatherMap API calls (axios)
.env.local                  API key (not committed to git)
```

## Features

- Shows the current location's weather automatically on first load (with the user's permission)
- Search weather by city name
- Current conditions: temperature, feels-like, humidity, description, icon
- Hourly forecast for the next 24 hours
- 4-day forecast with daily high/low
- Loading and error states for network requests and denied location permission

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Your personal OpenWeatherMap API key. Required for all weather requests. |

The `NEXT_PUBLIC_` prefix is required because the key is read on the client side (inside a `"use client"` component).

## Known limitations

- The free OpenWeatherMap plan provides forecast data in 3-hour steps for 5 days; the daily forecast is built by grouping this data, not a dedicated daily endpoint.
- Geolocation requires the user's browser permission; if denied, the user can still search by city name.

## License

This project is for personal/educational use.


## Live Demo 
This project is live at: https://weather-monitoring-dashboard-green.vercel.app
