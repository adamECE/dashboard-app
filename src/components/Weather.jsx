import React from 'react'
import WeatherCard from './WeatherCard'

export default function Weather({ weatherDetails }) {
  return (
    <div className="weather-container">
        {weatherDetails.map((data) => (
          <WeatherCard id={data.id} data={data}/>
        ))}
    </div>
  )
}
