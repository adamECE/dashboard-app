import React from 'react';
import ScheduleItem from './ScheduleItem';

export default function Schedule( {schedule, setSchedule, allEvents, setAllEvents} ) {


  return (
      <div className='schedule'>
        {schedule.map((item) => (
          <ScheduleItem id={item.id} item={item} schedule={schedule} setSchedule={setSchedule} allEvents={allEvents} setAllEvents={setAllEvents}/>
        ))}
      </div>
  )
}

