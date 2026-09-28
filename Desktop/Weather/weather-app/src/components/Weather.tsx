import { useState } from 'react';
import WeatherCard from './WeatherCard';
import Search from './Search';

const API_KEY = '3df665042e76348312015aea0f0361bc';

type WeatherType = {
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
};

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherType | null>(null);

  const getBackgroundClass = (): string => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
      return 'bg-default';
    }

    const mainCondition = weatherData.weather[0].main.toLowerCase();

    switch (mainCondition) {
      case 'clear':
        return 'bg-clear';
      case 'clouds':
        return 'bg-clouds';
      case 'rain':
      case 'drizzle':
        return 'bg-rain';
      case 'thunderstorm':
        return 'bg-thunder';
      case 'snow':
        return 'bg-snow';
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'fog':
        return 'bg-mist';
      default:
        return 'bg-default';
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName: string) => {
    if (!cityName) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error('City not found');

      const data = await response.json();
      setWeather(data);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather">
      <h2>Weather</h2>

      <div className={`weather-container ${getBackgroundClass()}`}>
        <Search
          city={city}
          setCity={setCity}
          onSearch={() => fetchWeather(city)}
        />
        {loading && <p>Loading</p>}
        {error && <p className="error">{error}</p>}
        {weather && <WeatherCard weather={weather} type={weather.weather[0].main} />}
      </div>
    </div>
  );
}

export default Weather;