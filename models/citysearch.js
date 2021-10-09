const axios = require('axios')

class CitySearch {
  constructor(cities = []) {
    this.history = cities
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_API_TOKEN,
      autocomplete: true,
      limit: 5
    }
  }


  async getCity(city = '') {
    try {
      const instance = axios.create({
        baseURL: process.env.MAPBOX_API_URL,
        params: this.paramsMapbox
      })

      const response = await instance.get(`/mapbox.places/${city}.json`)
      return response.data.features.map(city => ({
        id: city.id,
        name: city.place_name,
        lng: city.center[0],
        lat: city.center[1]
      }))
    } catch (error) {
      return []
    }
  }

  addToHistory(city) {
    const index = this.history.findIndex(prevCity => prevCity.id === city.id)

    if (index === -1) {
      if(this.history.length >= 5) {
        this.history.pop()
      }
      this.history.unshift(city)
    } else {
      this.history.splice(index, 1)
      this.history.unshift(city)
    }
  }

}

module.exports = CitySearch
