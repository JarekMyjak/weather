import React from 'react'

const IconPoint = ({ iconID, description}) => {
    console.log(iconID)
    return (
        <img src={`http://openweathermap.org/img/wn/${iconID}.png`} alt={`${description} icon`} />
    )
}

export default IconPoint
