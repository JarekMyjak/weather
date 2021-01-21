import React, { useState, useEffect } from 'react'
import api from '../helpers/weatherAPI'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, VictoryZoomContainer, VictoryBrushContainer } from 'victory';
import Paper from '@material-ui/core/Paper';

const chartDataFromForecast = (forecastList) => {
    return forecastList.map((element, index) => {
        return {
            x: new Date(element.dt_txt),
            y: element.main.temp,
            label: element.main.temp + '°C',
        }
    })
}

const lookupDataFromForecast = (forecastList) => {
    return forecastList.map((element, index) => {
        return {
            x: new Date(element.dt_txt),
            y: element.main.temp,
        }
    })
}

const filterEvery5thElement = (element, index) => index % 5 === 0

const lookupTickerFromForecast = (forecastList) => {
    let ret = forecastList.map((element, index) => {
        return new Date(element.dt_txt)
    })
    return ret.filter(filterEvery5thElement)
}


const Forecast = (props) => {

    const [name, setname] = useState('')
    const [chartData, setchartData] = useState([])
    const [lookupData, setlookupData] = useState([])
    const [lookupTicker, setlookupTicker] = useState([])
    //lookupData.map((e)=>{e.x})
    const [selectedDomain, setselectedDomain] = useState()
    const [zoomDomain, setzoomDomain] = useState()

    const handleZoom = (domain) => {
        setselectedDomain(domain);
    }

    const handleBrush = (domain) => {
        setzoomDomain(domain)
    }

    useEffect(() => {
        api.getForecastByTown(props.cityName)
            .then(data => {
                setname(data.city.name)
                setchartData(chartDataFromForecast(data.list))
                setlookupData(lookupDataFromForecast(data.list))
                setlookupTicker(lookupTickerFromForecast(data.list))
            })
    }, [props.cityName])

    return (
        <Paper style={{ padding: "0px 20px 0px 20px" }}>
            <div style={{ overflow: "hidden" }}>
                <VictoryLabel text={name} x={225} y={60} textAnchor="middle" />
                <VictoryChart
                    width={1000}
                    height={300}
                    scale={{ x: "time" }}
                    containerComponent={
                        <VictoryZoomContainer responsive={true}
                            zoomDimension="x"
                            zoomDomain={zoomDomain}
                            onZoomDomainChange={handleZoom}
                        />
                    }
                    
                >
                    <VictoryLine
                        style={{
                            data: { stroke: "lightblue" }
                        }}
                        data={chartData}
                        interpolation="cardinal"
                       
                    />

                </VictoryChart>

                <VictoryChart
                    width={1000}
                    height={90}
                    scale={{ x: "time" }}
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                    containerComponent={
                        <VictoryBrushContainer responsive={true}
                            brushDimension="x"
                            brushDomain={selectedDomain}
                            onBrushDomainChange={handleBrush}
                        />
                    }
                >
                    <VictoryAxis
                        tickValues={lookupTicker}
                        tickFormat={(x) => {
                            let d = new Date(x)

                            const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            const date = d.toLocaleDateString([], { weekday: 'long' })
                            return `${date}\n${time}`
                        }}
                    />
                    <VictoryLine
                        style={{
                            data: { stroke: "lightblue" }
                        }}
                        data={lookupData}
                        interpolation="cardinal"
                    />
                </VictoryChart>
            </div>
        </Paper>
    )
}

export default Forecast
