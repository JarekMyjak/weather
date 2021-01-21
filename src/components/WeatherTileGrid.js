import React from 'react'
import { Grid } from '@material-ui/core';
import { WeatherTile } from "./WeatherTile";

const WeatherTileGrid = ({cityListArr, handleCityDeleteF, selectTileF}) => {
    return (
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          {cityListArr.map((i) => {
            return (<WeatherTile key={i.id} cityName={i.name} onDelete={() => handleCityDeleteF(i.id)} selectTile={() => selectTileF(i.name)}/>)
          })}
        </Grid>
    )
}

export default WeatherTileGrid
