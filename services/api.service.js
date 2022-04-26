import axios from 'axios';
import { getCity, getToken } from './storage.service.js';

async function getCoordinatesByCity(city) {
  const token = await getToken();
  if (token) {
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: city,
        appId: token,
      },
    });
    return response.data;
  }
  return undefined;
}

async function getWeather(city) {
  const { lat, lon } = await getCity(city);
  const appid = await getToken();
  console.log(appid);
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid,
      units: 'metric',
      lang: 'ru',
    },
  });
  return response.data;
}
export { getWeather, getCoordinatesByCity };
