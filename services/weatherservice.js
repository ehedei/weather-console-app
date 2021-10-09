const axios = require('axios')

const getCurrentWeather = async (lat, lon) => {
  try {
    const instance = axios.create({
      baseURL: process.env.OPENWEATHER_URL,
      params: {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'en'
      }
    })

    const response = await instance.get('/weather', { params: { lat, lon } })
    return response.data
  } catch (error) {
    return {}
  }

}

module.exports = { getCurrentWeather }
