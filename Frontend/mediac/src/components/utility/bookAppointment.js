import React,{useEffect, useRef, useState}  from "react";
import {   Container,Card, Form ,Alert} from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Modal from 'react-bootstrap/Modal'
import {   Button } from "react-bootstrap";
import useWindowDimensions from "../../functions/windowDimensions"
import close from '../img/close.svg'
import { useAuth } from "../../contexts/AuthContext"

 import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../styles.css"

const dayMap = {
  "0" : "Sunday",
  "1" : "Monday",
  "2" : "Tuesday",
  "3" : "Wednesday",
  "4" : "Thursday",
  "5" : "Friday",
  "6" : "Saturday"
}
const days = [ "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  "Saturday"]
 export default function BlogCard(prop) {

        const { height, width } = useWindowDimensions();
const [loading, setLoading] = useState(false)
 const [error, setError] = useState("") 
 const date = useRef();
 const time = useRef();
  const [startDate, setStartDate] = useState(new Date());
 const [success, setSuccess] = useState("") 
  const {  currentUser } = useAuth()

 
  const handleSubmit = async () => {
    if(error) return
    
    try{
       if(!time.current)
          return  setError("Set when you want us to call you")
      if(!time.current.value)
          return  setError("Set when you want us to call you")

       var _time = new Date(startDate.toDateString() + " " + time.current.value)

       if (currentUser) {
        setLoading(true);
        setError('')
        setSuccess("")
        const token = await currentUser.getIdToken(true)
        prop.data.startDate = _time
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body: JSON.stringify(prop.data)
        };

        let res = await fetch(process.env.REACT_APP_API_URL+'add-appointment', requestOptions);
        res = await res.text()
        res = JSON.parse(res)
        if (res['success'] ) {
          setSuccess("Consultation Booked")

        } else {
          console.log(res)
          // display error!
          setError("Internal Error");
        }
        setLoading(false);
    }
    }catch(e){
                setError('Connection Error');

    }
  }






useEffect(()=>{
 
if(prop.days)
  if(!prop.days.includes(dayMap[startDate.getDay()]))
  {

     setError("Sorry, we are not available on " + dayMap[startDate.getDay()])
  }else{
    setError("")
  }

 if(prop.time)
 {
     var now  = new Date()
 console.log(isSameDate(startDate, now))
 if(isSameDate(startDate, now)){
   var j =0;
    for(var i=0; i<prop.time.length; i++)
    {
       var time = new Date(now.toDateString() + " " + prop.time[i])

      if(    time > now)
      {
        j++
      }
    }
    if(j===0)
    {
      setError("Sorry, no slots left for today")
    }
 }
 } 


},[startDate, prop])

       return (
    <>
 
        <Modal   animationType='slide' show={prop.show} onHide={prop.onHide} >

<Card id="loginpopup">
        <Card.Title>

 <div style = {{float: "right", marginLeft : "auto", marginRight : "20px", marginTop : "30px"}}>
        <img src = {close} className = "icon-button" alt="" onClick = {prop.onHide}></img>


 </div>

        </Card.Title>


<Card.Body>


         <div>
                  <h3>Schedule Consultation</h3>
                
                <p className = "description">{prop.data.through === "payment" ? "We are not available right now, so we will call you when you are free" : "We will call you at your prefered time"}</p>

            
     <Form.Group id="email" style={{ marginTop: "28px" }}>
              <Form.Label className = "formLabel">Date</Form.Label>
<br/>
   <DatePicker className = "input form-control"
   minDate = {new Date()}
   disabledKeyboardNavigation = {true}
    selected={startDate}
    dateFormat = "dd/MM/yyyy"
      onChange={(e)=>{
console.log(e)
setStartDate(e)
}} 
      />

 
            </Form.Group>
          
     <Form.Group id="email" style={{ marginTop: "5px" }}>
              <Form.Label className = "formLabel">Time</Form.Label>

           
   <select name="prev" ref={time} id="dropdown-basic">
                      <option style={{ display: "none" }}> </option>
 

                        {
                       prop.time &&     prop.time.map((t)=> {
 var now  = new Date()
var time = new Date(now.toDateString() + " " + t)
  if(isSameDate(startDate, now)){
    if(    time > now)
    {
      return     <option  value={t} > {t}</option>
    }
 }  
 else
 {
    return     <option  value={t} > {t}</option>
 }
   

return                           <option style={{ display: "none" }}> </option>



                       })
                        }
                    </select>
                          </Form.Group>

<div style = {{height : "32px"}}/>
          {error && <Alert variant="danger"  style = {{marginBottom: "22px"}}>{error}</Alert>}
          {success && <Alert variant="success"  style = {{marginBottom: "22px"}}>{success}</Alert>}

 <Button disabled={loading || error } onClick = {handleSubmit}  className="submitbtn" type="submit">
              Book Consultation
            </Button>
<div style = {{height:"30px"}}/>
 

              </div>

</Card.Body>



</Card>
 
 
 
      </Modal>
 
    </>
  )
}
  
function isSameDate(a, b) {
    return Math.abs(a - b) < (1000 * 3600 * 24) && a.getDay() === b.getDay();
}