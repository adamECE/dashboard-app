import React, {useState} from 'react'
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";



export default function ScheduleItem({item, schedule, setSchedule, allEvents, setAllEvents}) {
    const [editText, setEditText] = useState(item.text); 

    const removeHandler = () => {
        setAllEvents(allEvents.filter((el)=> el.id !== item.id))
        setSchedule(schedule.filter((el) => el.id !== item.id))
    }

    /* functionality to allow user to edle text*/
    const editHandler = () => {
        item.clicked = true; 
        setSchedule([...schedule])
    }

    /* handles user input text while editing a ScheduleItem */
    const editInputHandler = (e) => {
        setEditText(e.target.value);
    }

    /* button functionality to handle user submission of updated text */
    const submitEditHandler = () => { 
        const curEditedItem = allEvents.filter((el)=> el.id=== item.id); 
        curEditedItem[0].title = editText; 
        item.text = editText; 
        item.clicked = false; 
        setSchedule([...schedule]); 
        setAllEvents([...allEvents]);
    }

    return (
        <div className='schedule-item'>

            {!item.clicked && 
            <div className='schedule-item-clicked'>
                <div className="todo-item">{item.text}</div>
                <div className='schedule-item-btns'>
                <button className='complete-btn' onClick={removeHandler}><FaTrash /></button>
                <button className='edit-btn' onClick={editHandler}><FiEdit /></button>
                </div>

            </div>

            }
            {item.clicked && 
                <div className='update-item'>
                    <input className='update-item-input' value={editText} onChange = {editInputHandler} type="text"></input> 
                    <button className='update-item-completed' onClick={submitEditHandler}>Done</button>
                </div>
            }
        </div>
    )     
}
