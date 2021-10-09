require('dotenv').config()
require('colors')

const { showMenu, pause, input, selectCity } = require('./helpers/inquirer');
const { capitalize } = require('./helpers/capitalizer');
const { loadData, saveData } = require('./helpers/io');
const CitySearch = require('./models/citysearch');
const { getCurrentWeather } = require('./services/weatherservice');


const printCityData = (city, { main, weather }) => {
  console.clear()
  console.log('\nCity Info:\n'.green)
  console.log('City:', city?.name.green)
  console.log('Lat:', city?.lat.toString().green)
  console.log('Long', city?.lng.toString().green)
  console.log('Temperature:', `${main?.temp}ºC`.green)
  console.log('Miminum:', `${main?.temp_min}ºC`.green)
  console.log('Maximum:', `${main?.temp_max}ºC`.green)
  console.log('Weather description:', capitalize(weather?.[0].description).green)
}

const getWeather = async (cities, citySearch) => {
  const selectedCityId = await selectCity(cities, 'Please, select a city:')
  const city = cities.find(city => city.id === selectedCityId)
  const currentWeather = await getCurrentWeather(city.lat, city.lng)
  printCityData(city, currentWeather)
  citySearch.addToHistory(city)
  saveData(citySearch.history)
}

const main = async () => {
  let option = ''
  const citySearch = new CitySearch(loadData())

  do {
    option = await showMenu()

    switch (option) {
      case '1':
        const keyword = await input('Please, insert a city:')
        const cities = await citySearch.getCity(keyword)
        await getWeather(cities, citySearch)
        break;
      case '2':
        await getWeather(citySearch.history, citySearch)
        break;
      case '0':
        console.log('Goodbye!')
        break;
    }

    await pause()

  } while (option !== '0');

}

main()
