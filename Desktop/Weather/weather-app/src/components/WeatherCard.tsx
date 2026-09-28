function WeatherCard({ weather, type }: { weather: any; type: string }) {
  return (
    <div className={`weather-card ${type.toLowerCase()}`}>
      <h3>{weather.name}</h3>
      <p>{new Date().toLocaleString()}</p>

      <div>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="weather icon"
        />
        <p className="temp">{Math.round(weather.main.temp)}°C</p>
        <p className="description">{weather.weather[0].description}</p>
      </div>
      <div className="detals">
        <span>Humidity: {weather.main.humidity}%
        </span>
        <span>Wind: {weather.wind.speed} m/s</span>
      </div>
    </div>
  );
}

export default WeatherCard;