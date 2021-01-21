const key = 'WeatherApp'

const ls = {
    getItems: () => {
        const ret = JSON.parse(localStorage.getItem(key))
        return ret != null ? ret : []
    },

    setItems: (item) => {
        return localStorage.setItem(key, JSON.stringify(item));
    },
}

export default ls
