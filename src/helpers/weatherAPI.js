const key = '&appid=' + process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const forecastBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
const units = '&units=metric'
const forecastCount = '&cnt='+40

const api = {
    getWeatherByTown: (town) => {
            return fetch(apiBaseUrl+town+key+units)
                .then(res => res.json())
    },
    getForecastByTown: (town) => {
        return fetch(forecastBaseUrl+town+key+units+forecastCount)
                .then(res => res.json())
    }
}

export default api
