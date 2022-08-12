import React from 'react'

export default function WeatherCard({data}) {
  return (
    <div className='weather-card'>
        <h2>{parseInt(data.temp)}°</h2>
        <img src={"https://openweathermap.org/img/wn/" + data.icon + ".png"} alt="weatherIcon" />
        <h3>{data.time}</h3>
    </div>
  )
}

