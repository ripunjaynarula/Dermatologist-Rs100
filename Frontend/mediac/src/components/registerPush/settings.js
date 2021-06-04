import React, { useEffect, useRef, useState } from "react"
import { Form, Button,Row, Container, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../../css/Card";
 import {Texts} from "../../css/Texts";
import useWindowDimensions from "../../functions/windowDimensions"
import Navbar from "../Header"
 import MultipleSelectChips from '../utility/SelectableChip'
export default function ChangePassword() {
  const timeRef = useRef()
  const daysRef = useRef()
	const options = [{label: "Monday", value: "Monday"}, {label: "Tuesday", value: "Tuesday"}, {label: "Wednesday", value: "Wednesday"}
    , {label: "Thursday", value: "Thursday"}, {label: "Friday", value: "Friday"}, {label: "Saturday", value: "Saturday"}
    , {label: "Sunday", value: "Sunday"}
    
    ]
	const [value, setValue] = useState([])
   const onOfRef = useRef()
   const { currentUser, updatePassword, login } = useAuth()
  const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const [loading, setLoading] = useState(false)
 
 const [isOpen, setIsOpen] = useState(true)
  useEffect(() => saveDetails(true), []);
 

 

 async function saveDetails(isFetch){
 setIsSaving(true)
 try{


    const token = await currentUser.getIdToken(true)
  const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body: JSON.stringify({ fetch : isFetch, time : timeRef.current.value, isClinicOpen : isOpen, openDays : value})
        };
    let res = await fetch(process.env.REACT_APP_API_URL+'settings', requestOptions);
        res = await res.text()
        res = JSON.parse(res)
        if(!res.isError)
        {
 
        if( isFetch)
          {
                    
              setSuccess("Saved")
              if(res.data)
              {
  
                  if(res.data.isClinicOpen)
                  {
                      setIsOpen(true)
                  }else{
                       setIsOpen(false)
                  }
                   timeRef.current.value = res.data.time
                  setValue(res.data.openDays)
              }
          }else{
              alert("SAVED")
          }
        }else{
            alert("Internal Error")
          setError("Internal Error")
        }
 }catch(e)
 {
                 alert("Network Error")

          setError("Network Error")

 }
 setIsSaving(false)
 }
  
  
 
  
  return (
    <>
   <Card  style={{CardMain}, { paddingLeft:"15px", paddingRight : "15px", paddingTop : "25px", paddingBotton : "25px"}}  >

  <Card.Body>

 <br></br>


          <h4 className="text-left mb-4" style={Texts.Heading,{letterSpacing : "0"}}>Clinic Open Details</h4>

 {/* <Form.Switch
    onChange={()=>{
        setIsOpen(!isOpen)
    }}
    id="custom-switch"
    label="Is clinic open?"
    checked={isOpen}
   /> */}

<br/>

     <Form.Group id="password-confirm">
              <Form.Label style = {Texts.FormLabel}>Open & Close time in 24 hour time Format like -  09:00-13:00,14:00-18:00</Form.Label>
              <Form.Control
                type="text"
                placeholder = "Open & Close time in 24 hour time Format like -  09:00-13:00,14:00-18:00"
                ref={timeRef}
                disabled = {!isOpen}
               />
            </Form.Group>

  <Form.Group id="n-confirm">
              <Form.Label style = {Texts.FormLabel}>Open Days</Form.Label>
           	<MultipleSelectChips
		label="Label"
		value={value}
		setValue={setValue}
		options={options}
		 disabled = {!isOpen}
	/>
            </Form.Group>





   <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "15px",  }}>
           
      

  

   <Button disabled={isSaving} style={{height : "42px" , boxShadow:"none"}} type="button" className = "primaryButton" onClick= {()=>{
       saveDetails(false)
   }}>
Save            </Button>
          </Row>

        </Card.Body>
     


      </Card>
    

    </>

  )
}