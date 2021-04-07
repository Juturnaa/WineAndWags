import React, { useState, useEffect } from 'react'



const {startOfMonth, startOfWeek, endOfMonth, endOfWeek, startOfDay, addDays, isSameMonth, isSameDay, format} = require('date-fns');

const Calendar = () => {
  const [weekFull, setweekFull] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appt, setAppt] = useState(new Date().getHours()+":"+new Date().getMinutes())

  function takeWeek(start = new Date()) {
    let date = startOfWeek(startOfDay(start));

    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }

  function takeMonth(start = new Date()) {
    let month = [];
    let date = start;

    function lastDayOfRange(range) {
      return range[range.length - 1][6];
    }

    return function () {
      const weekGen = takeWeek(startOfMonth(date));
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGen());

      while (lastDayOfRange(month) < endDate) {
        month.push(weekGen());
      }

      const range = month;
      month = [];
      date = addDays(lastDayOfRange(range), 1);

      return range;
    };
}
    function WeekNames() {
    return (
        <div className="weekGrid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekName, index) =>(
            <div className ="weekName" key ={index}>
              {weekName}
            </div>
          ))}
        </div>
    )
}


const data = takeMonth(selectedDate)();

function dayColor(day){
  if (!isSameMonth(day, selectedDate)) {
    return "day2"
  }
  if(isSameDay(day,selectedDate)) {
    return "daySelected"
  }
  if (isSameDay(day,new Date())){return "today"}
  return "day"
}
let hours = [1,2,3,4,5,6,7,8,9,10,11,12]
let minutes = [
 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
 60
]

return (
  <div className="currentDate">
    <h1>{format(selectedDate,"ccc")}, {format(selectedDate,"LLL")} {format(selectedDate,"do")}</h1>
  <div>
    <div style={{display:"flex"}}>
    <button onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()-1, 1))}}>prev</button>
    <h1>{format(selectedDate,"MMMM")} {format(selectedDate,"yyyy")}</h1>
    <button onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1))}}>next</button>

    </div>

  <div className="weeks">
    <div className ="week">
      <WeekNames />
      {console.log(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1))}
      { <div>
      {data.map( (week,i)=>(
          <div className="weekGrid" key={i}>
            {week.map((day, index)=>(
              <div onClick={()=> setSelectedDate(day)} className= {dayColor(day)} key={index}>
                {format(day, 'dd')}
              </div>
            ))}
          </div>
        ))}
        </div>
      }
    </div>
    </div>
    <button>Cancel</button>
    <button>Ok</button>
    <div>
    {/* <div>
      {hours.map((hour,hi) => (
        <div key = {hi}>{hour}</div>
      ))}
    </div> */}
    {/* <div>
      {minutes.map((min,mi) => (
        <div key = {mi}>{min}</div>
      ))}
    </div> */}
    </div>
    {/* <input type="date" value= {appt} onChange={(e)=>{console.log(e)}}/>
    <input type="time" value= {appt} onChange={(e)=>{console.log(e)}}/> */}
    </div>

    </div>
)

}
export default Calendar

