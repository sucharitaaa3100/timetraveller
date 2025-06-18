import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchLatLon = async (cityName) => {
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: cityName,
          format: 'json',
          limit: 1,
        },
      });
      if (res.data.length === 0) throw new Error('City not found');
      return {
        lat: res.data[0].lat,
        lon: res.data[0].lon,
      };
    } catch {
      throw new Error('Failed to get location coordinates');
    }
  };

  const fetchWeather = async () => {
    if (!city || !date) {
      setError('Please enter both city and date');
      setWeather(null);
      return;
    }

    try {
      setError('');
      setWeather(null);
      const { lat, lon } = await fetchLatLon(city);

      const res = await axios.get('https://archive-api.open-meteo.com/v1/archive', {
        params: {
          latitude: lat,
          longitude: lon,
          start_date: date,
          end_date: date,
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
          timezone: 'auto',
        },
      });

      if (!res.data || !res.data.daily) throw new Error('Weather data not found');

      setWeather({
        city,
        date,
        tempMax: res.data.daily.temperature_2m_max[0],
        tempMin: res.data.daily.temperature_2m_min[0],
        precipitation: res.data.daily.precipitation_sum[0],
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSave = () => {
    const current = JSON.parse(localStorage.getItem('savedItems')) || [];

    const newItem = {
      type: 'weather',
      city,
      date,
      tempMax: weather.tempMax,
      tempMin: weather.tempMin,
      precipitation: weather.precipitation,
    };

    const alreadySaved = current.some(
      (item) =>
        item.type === 'weather' &&
        item.city === newItem.city &&
        item.date === newItem.date
    );

    if (!alreadySaved) {
      localStorage.setItem('savedItems', JSON.stringify([...current, newItem]));
      alert('✅ Weather saved!');
    } else {
      alert('⚠️ Weather data already saved.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h2 className="mb-4">☀️ Weather Time Portal</h2>
        <p className="lead">Enter a city and date to see historic weather data.</p>

        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Enter city (e.g. Bangalore)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="date"
            className="form-control w-25"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          <button className="btn btn-primary" onClick={fetchWeather}>
            Search
          </button>
        </div>

        {error && <p className="text-danger mt-3">{error}</p>}

        {weather && (
          <div className="mt-5 text-start w-50 mx-auto">
            <h4 className="mb-3">🌤 Weather on {weather.date} in {weather.city}:</h4>
            <ul className="list-group mb-3">
              <li className="list-group-item">
                <strong>Max Temperature:</strong> {weather.tempMax} °C
              </li>
              <li className="list-group-item">
                <strong>Min Temperature:</strong> {weather.tempMin} °C
              </li>
              <li className="list-group-item">
                <strong>Precipitation:</strong> {weather.precipitation} mm
              </li>
            </ul>
            <button className="btn btn-success" onClick={handleSave}>💾 Save</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Weather;



