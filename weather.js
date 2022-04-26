import { getArgs } from './helpers/args.js';
import { printSuccess, printHelp, printError } from './services/log.service.js';
import {
  getKey,
  getCity,
  saveToken,
} from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

async function initCLI() {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
    return;
  }
  if (args.s) {
    await getCity(args.s);
    return;
  }
  if (args.t) {
    await saveToken(args.t);
    return;
  }
  const currentCity = await getKey('currentCity');
  if (currentCity) {
    const weather = await getWeather(currentCity);
    // console.log(111, weather);
    printSuccess(weather.weather[0].description);
  } else {
    printError('Город не задан');
  }
}
initCLI();
