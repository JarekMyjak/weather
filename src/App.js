import './App.css';
import 'fontsource-roboto';
import TopAppBar from './components/TopAppBar';
import { Container, Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Forecast from "./components/Forecast"
import WeatherTileGrid from './components/WeatherTileGrid';
import ls from "./helpers/localStorage";


function App() {

  const [cityList, setcityList] = useState([])
  const [forecastSelect, setForecastSelect] = useState()

  useEffect(() => {
    setcityList(ls.getItems())
    return () => {

    }
  }, [])

  const handleCityAdd = (cityName) => {
    if (cityName !== '') {
      const city = {}
      city.name = cityName
      city.createdAt = Date.now()
      city.id = cityList.length
      setcityList([...cityList, city])
      ls.setItems([...cityList, city])
    }
  }

  const handleCityDelete = (id) => {
    const newcityList = cityList.filter((element) => {
      return element.id !== id
    }, id)
    setcityList(newcityList)
    ls.setItems(newcityList)
  }

  const selectTile = (name) => {
    setForecastSelect(name)
  }




  return (
    <div className="App">
      <TopAppBar handleCityAdd={handleCityAdd} />
      <Container>
        <br/>
        <WeatherTileGrid cityListArr={cityList}  handleCityDeleteF={handleCityDelete} selectTileF={selectTile}/>
        <br/>
        <Divider/>
        <br/>
        {forecastSelect ? <Forecast cityName={forecastSelect}/> : <p>click on any tlile to watch the forecast</p>}
      </Container>
    </div>
  );
}

export default App;
