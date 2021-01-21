import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, CardHeader, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid'

import api from '../helpers/weatherAPI'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column'
    },
    pos: {
        marginBottom: 12,
    },
    delete: {
        marginLeft: "auto",
    },
    media: {
        height: 140,
    },


});

export function WeatherTile(props) {
    const classes = useStyles();

    const [name, setname] = useState('');
    const [mainTemp, setMainTemp] = useState('');
    const [description, setDescription] = useState('');
    const [iconID, setIconID] = useState('');

    const apiCall = () => {
        api.getWeatherByTown(props.cityName)
            .then(data => {
                if (data.cod === "404") {
                    props.onDelete()
                } else {
                    setname(data.name)
                    setMainTemp(data.main.temp)
                    setDescription(data.weather[0].description)
                    setIconID(data.weather[0].icon)
                }

            })
    }

    useEffect(() => {
        apiCall()
        const refresherInterval = setInterval(() => {
            apiCall()
        }, 2 * 60 * 1000);
        return () => clearInterval(refresherInterval)
    })

    const deleteHandler = (e) => {
        e.stopPropagation()
        props.onDelete()
    }

    const clickHandler = () => {
        props.selectTile()
    }


    return (
        <Grid item >
            <Card className={classes.root} onClick={clickHandler}>
                <CardHeader
                    action={
                        <IconButton aria-label="delete" className={classes.delete} onClick={deleteHandler}>
                            <CloseIcon />
                        </IconButton>
                    }
                    title={name}
                />
                <Divider />
                <CardContent  >
                    <Typography variant="body2" component="p">
                        {description}
                    </Typography>
                    {iconID ?
                        <img src={`http://openweathermap.org/img/wn/${iconID}.png`} alt={`${description} icon`} />
                        : <br />
                    }
                    <Typography variant="body2" component="p">
                        {mainTemp}°C
                    </Typography>
                </CardContent>

            </Card>
        </Grid >

    );
}