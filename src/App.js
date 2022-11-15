import React, { useState, useEffect } from "react";
// import date picker, date fns, and react-big-calendar 
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/App.css";

// import components 
import Form from './components/Form';
import Schedule from './components/Schedule';
import Weather from './components/Weather';
 
import {v4 as uuidv4} from 'uuid';


/*
  Author: Adam Hoffmeister
  Filename: App.js
  Purpose: Create a basic dashboard that is composed of four parts: 
    1. The current date.
    2. The weather forecast for the day.
    3. A displayed schedule that can be edited by the user. 
    4. A calendar that displays schedule items.

    The weather forecasted is given by the OpenWeatherMaps public api service. DatePicker, date-fns, and
    react-big-calendar are all being used to help create the schedule and calendar within the program. 
    The app is mobile responsive. 
*/

const LOCAL_STORAGE_KEY = process.env.LOCAL_STORAGE_KEY;
const API_KEY = process.env.API_KEY;

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function App() {
    const [textInput, setTextInput] = useState(''); 
    const [schedule, setSchedule] = useState([]); 
    const [weatherDetails, setWeatherDetails] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [loadTodaysEvents, setLoadTodaysEvents] = useState(false);
    const [selectedDate, setSelectedDate] = useState(String(new Date()).substring(0,16)
          +   "00:00:00 GMT-0700 (Mountain Standard Time)");

    
    /* fetch data from weather api */
    useEffect(() => {
      const fetchWeather = async () => {
        const apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=32.2319&lon=-110.9501&appid="+API_KEY+"&units=imperial"
        const response = await fetch(apiURL); 
        const weather = await response.json(); 
        handleWeatherInfo(weather)
      };
      fetchWeather();
    }, []);

    /* load items from local storage */
    useEffect(() => {
      const locallyStoredEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (locallyStoredEvents) {
        setAllEvents(locallyStoredEvents);
      }
      setLoadTodaysEvents(true);
    }, []);

    /* loads current day events upon initial rendering */
    useEffect(() => {
      handleChangeScheduleView(String(new Date()).substring(0,16) 
        + "00:00:00 GMT-0700 (Mountain Standard Time)")
    }, [loadTodaysEvents])


    /* add data to local storage */
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allEvents));
        const locallyStoredEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    }, [allEvents]);

    /* convert relevant weather info and store in weatherDetails */
    const handleWeatherInfo = (weather) => {
      const tempArray =  []; 
      for(let i = 1; i <= 4; i++){
        let time = weather.list[i].dt_txt
        tempArray.push({
          id: uuidv4(), 
          temp: weather.list[i].main.temp,
          description: weather.list[i].weather[0].description,
          icon: weather.list[i].weather[0].icon, 
          time: time.substring(10,16)
        }) 
      }
      setWeatherDetails(tempArray); 
    }

    /* handles changing view of current day schedule */
    const handleChangeScheduleView = (date) => {
      const temp = []; 
      for(let i = 0; i < allEvents.length; i++){
        if(String(allEvents[i].start)===String(date)){
          temp.push({id: allEvents[i].id, text: String(allEvents[i].title), clicked: false}); 
        }
      }
      setSelectedDate(String(date)); 
      setSchedule(temp);
    }


    return (
        <div className="App">
          <div className="app-header">
              <div className="date-header">{String(new Date()).substring(0,15)}
              <h1 className="hr-min-time">{String(new Date()).substring(16,21)}</h1></div>
              <Weather weatherDetails={weatherDetails}/>

          </div>

              <Form textInput = {textInput} setTextInput={setTextInput} schedule={schedule} setSchedule={setSchedule} allEvents={allEvents} setAllEvents={setAllEvents} selectedDate={selectedDate}/>
              <Schedule schedule={schedule} setSchedule={setSchedule} allEvents={allEvents} setAllEvents={setAllEvents} />
              <DatePicker className="date-picker" placeholderText={String(selectedDate).substring(0,10)} style={{ marginRight: "10px"}} onChange={(start)=> {handleChangeScheduleView(start)}} />
              

            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 1000, margin: "20px" , backgroundColor: "trasnparent"}} />
        </div>
    );
}

export default App;