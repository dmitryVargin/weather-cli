import { homedir } from 'os';
import { readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { getCoordinatesByCity } from './api.service.js';
import { printError, printSuccess } from './log.service.js';

const filePath = join(homedir(), 'weather-data.json');

async function isExist(path) {
  try {
    await stat(path);
    return true;
  } catch (e) {
    return false;
  }
}

async function saveKeyValue(key, value) {
  let data = {};
  if (await isExist(filePath)) {
    const file = await readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await writeFile(filePath, JSON.stringify(data));
}

async function saveToken(token) {
  if (!token) {
    printError('Не передан токен');
    return;
  }
  try {
    await saveKeyValue('token', token);
    printSuccess('Токен сохранен');
  } catch (e) {
    printError('Ошибка сохранения');
  }
}

async function getKey(key) {
  if (await isExist(filePath)) {
    return JSON.parse(await readFile(filePath))[key];
  }
  return undefined;
}

async function getToken() {
  try {
    return await getKey('token');
  } catch (e) {
    printError('Токен не задан. Используйте флаг -t [APP_ID] чтобы задать его');
    return undefined;
  }
}
async function getCity(city) {
  const cacheCities = await getKey('cities');
  if (cacheCities) {
    if (city in cacheCities) {
      await saveKeyValue('currentCity', city);
      return city;
    }
  }
  const cityData = await getCoordinatesByCity(city);
  if (cityData) {
    const isCityExact = cityData[0].name?.toLowerCase() === city.toLowerCase();
    if (cityData.length && isCityExact) {
      await saveKeyValue('currentCity', city);
      await saveKeyValue('cities', { ...cacheCities, [city]: cityData });
      return cityData;
    }
  }

  printError('Город не найден');
  return undefined;
}
export {
  saveKeyValue, getKey, getCity, saveToken, getToken,
};

// homedir выводит домашнюю директорию пользователя. C:\Users\79299
// join по умному объединяет пути
// basename последнее вложение в пути, папка или файл
// dirname путь до папки где хранится указанный файл
// extname расширение указанного файла
// relative формирует путь от до
// isAbsolute проверка на абсолютный путь
// resolve просчитать путь от текущего пути
// sep разделитель (separator)
