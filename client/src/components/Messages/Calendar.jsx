import React, { useState, useEffect } from 'react'
// import ReactNotification from 'react-notifications-component'
// import { store } from 'react-notifications-component';
import axios from 'axios'


const {startOfMonth, startOfWeek, endOfMonth, endOfWeek, startOfDay, addDays, isSameMonth, isSameDay, format} = require('date-fns');

const Calendar = (props) => {
  const [weekFull, setweekFull] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appt, setAppt] = useState(new Date().getHours()+":"+new Date().getMinutes())
  const [schedule, setSchedule]= useState([])
  const [matchSchedule,setmatchSchedule]= useState([])
  const [hourst, setHourst]= useState(new Date())
  const [minutest, setMinutest]= useState(new Date())
  const [ampm, setampm] = useState('')



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
  let color = "day"
  if(schedule.length >0){
    schedule.forEach((d,i)=>{
      if (isSameDay(day,new Date(schedule[i].dates))){
        return color = "today"
      }
    })
  }
  if(matchSchedule.length >0){
    matchSchedule.forEach((d,i)=>{
      if (isSameDay(day,new Date(matchSchedule[i].dates))){
        return color = "matchSchedules"
      }
    })
  }
  if (!isSameMonth(day, selectedDate)) {
    return color = "day2"
  }
  if(isSameDay(day,selectedDate)) {
    return color ="daySelected"
  }
  if (isSameDay(day,new Date())){
    return color = "today"
  }
  return color
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

  useEffect(()=>{
    getSchedule()
    getMatchSchedule()
  },[props.currentUserId, props.matchUserId])

  let getSchedule =()=> {
    if(props.currentUserId){
      axios.get(`/app/${props.currentUserId}/schedule/`)
      .then((results)=>{
        setSchedule(results.data)
      })
    }
  }
  let getMatchSchedule = ()=>{
    if(props.matchUserId){
      axios.get(`/app/${props.matchUserId}/schedule/`)
      .then((results)=>{
        setmatchSchedule(results.data)
      })
    }
  }

  let postSchedule= ()=>{
    if(!isSameDay(selectedDate, new Date(minutest))){alert('set time')}
    else{
    axios.post(`app/${props.currentUserId}/schedule`, {
      "dates": new Date(minutest).toISOString()
    })
    .then(()=>{getSchedule()})
    .then(()=>{props.clickedCalendar(false)})
    .then(()=> alert('Added time slot to your schedule'))
  }
  }
  //I should flip put and post so it's faster
  let postAppointment = (d)=>{
    axios.post(`app/${props.currentUserId}/appointment/${props.matchUserId}`,{
      "schedule_id": d.id
    })
    .then(()=>{
      axios.put(`app/${props.matchUserId}/schedule`,{
        "id": d.id
      })
    })
    .then(()=>{
      axios.post(`/notifications/${props.currentUserId}/`,{
        "type":"appointment",
        "type_id":d.id,
        "sender_name":props.currentUser.name,
        "recipient_id": props.matchUserId
      })
    })
    .then(()=>{getMatchSchedule()})
    .then(()=>{alert('Appointment made')})
  }


  // function clickOk() {
  //   // store.addNotification({
  //   //   title: "Appointment Made!",
  //   //   message: "poggers",
  //   //   type: "success",
  //   //   insert: "bottom",
  //   //   container: "bottom-right",
  //   //   animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
  //   //   animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
  //   //   dismiss: {
  //   //     duration: 3000
  //   //   }
  //   // })
  //   postSchedule()

  // }
return (
  // store.addNotification({
  //   title: "Appointment Made!",
  //   message: "poggers",
  //   type: "success",
  //   insert: "top",
  //   container: "top-right",
  //   animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
  //   animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
  //   dismiss: {
  //     duration: 3000
  //   }
  // })<h1>{format(hourst, 'hh')}: {format(minutest,'mm')} {ampm? ampm: format(new Date(),'a')}</h1>
  <div className="currentDate">
  <div>
    <div className="topCalendar">
    <i className="fas fa-angle-left" style={{fontSize:"36px",paddingTop:"5px"}} onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()-1, 1))}}/>
    <h1>{format(selectedDate,"MMMM")} {format(selectedDate,"yyyy")}</h1>
    <i className="fas fa-angle-right" style={{fontSize:"36px",paddingTop:"5px"}} onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1))}}/>
    <h1 style={{textAlign:"right"}}>{format(selectedDate,"LLL")} {format(selectedDate,"do")} {format(hourst, 'hh')}: {format(minutest,'mm')} {ampm? ampm: format(new Date(),'a')}</h1>
    </div>

  <div className="weeks">
    <div className ="week">
      <WeekNames />
      {/* {console.log(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1))} */}
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
    {/* TIME STUFF */}
    <div className="TimeSchedule">
    <div style={{textAlign:'center'}}>
      {matchSchedule.length>0? <h1>Available slots</h1>:null}
      <div>{matchSchedule.map((d,id)=>(
        <div key= {id}>
          {format(new Date(d.dates),"Pp")} <button onClick={()=>{postAppointment(d)}}>Select</button>
          </div>
      ))}
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}><h2>Hours</h2> <h2>Minutes</h2></div>
    <div className="Time">
    <ul className="hoursTime">
      {hours.map((hour,hi) => (
        <li className ="indvTime" role='button' onClick={()=>{if(ampm === "PM") {setHourst(selectedDate.setHours(hour+12))} else {setHourst(selectedDate.setHours(hour))}}} key = {hi}>{hour}</li>
      ))}
    </ul>
    <ul className="minutesTime">
      {minutes.map((min,mi) => (
        <li className ="indvTime" role='button' onClick={()=>{setMinutest(selectedDate.setMinutes(min))}} key = {mi}>{min}</li>
      ))}
    </ul>
    <ul>
      <li role='button' onClick={()=>{if(ampm=== 'PM'){setMinutest(minutest+43200)}setampm('AM')}}>
        AM
      </li>
      <li role='button' onClick={()=>{if(ampm=== 'AM'){setMinutest(minutest-43200)}setampm('PM')}}>
        PM
      </li>
    </ul>

    </div>

    </div>

        {/* TIME STUFF */}
    </div>
    <div className='alignbutton'>
    <button className="calButton" onClick={()=>{props.clickedCalendar(false)}}>Cancel</button>
    <button className="calButton" onClick={()=>{postSchedule()}}>Ok</button>
    </div>

    {/* <input type="date" value= {appt} onChange={(e)=>{console.log(e)}}/>
    <input type="time" value= {appt} onChange={(e)=>{console.log(e)}}/> */}
    </div>
    {/* <div>
      <h1>Available slots</h1>
      <p>{matchSchedule.map((d,id)=>(
        <div key= {id}>
          {format(new Date(d.dates),"Pp")} <button onClick={()=>{postAppointment(d)}}>Select</button>
          </div>
      ))}
      </p>
    </div> */}
    </div>
)

}
export default Calendar

