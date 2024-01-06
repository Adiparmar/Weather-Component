import React, { useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = '5b8ba0264fd4672c5fd069eaa8c2e7da';

  const fetchWeatherData = (searchCity) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    if (city.trim() === '') {
      alert('Please enter a city name');
      return;
    }
    fetchWeatherData(city);
  };

  const convertFahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weatherData ? (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>
            Temperature: {convertFahrenheitToCelsius(weatherData.main.temp).toFixed(2)}°C
          </p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Enter a city to get weather data</p>
      )}
    </div>
  );
};

export default Weather;
