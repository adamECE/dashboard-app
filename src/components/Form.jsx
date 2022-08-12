import React from 'react';
import {v4 as uuidv4} from 'uuid';
import { IoIosAdd } from "react-icons/io";

export default function Form({textInput, setTextInput, schedule, setSchedule, allEvents, setAllEvents, selectedDate}) {
    
    /* handles input text for new ScheduleItem */
    const inputTextHandler = (e) => {
        setTextInput(e.target.value); 
    }

    /* handles adding a new ScheduleItem to the schedule */
    const handleAddScheduleItem = (e) => {
        e.preventDefault();
        const newItem = {id: uuidv4(), text: textInput, clicked: false};
        setSchedule([...schedule, newItem]) 
        setAllEvents([...allEvents, {id: newItem.id,  title: newItem.text, start: selectedDate, end: selectedDate}]);
        setTextInput(''); 
    }

    return (
        <div className='schedule-form'>
            <input value = {textInput} onChange = {inputTextHandler} type="text" className="todo-input" />
            <button onClick={handleAddScheduleItem} className="add-schedule-item-btn" type="submit">
                <IoIosAdd />
            </button>
        </div>
    )
}
