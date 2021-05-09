import React, { useRef, useState } from "react"
import { Form, Button,Row, Container, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../../css/Card";
 import {Texts} from "../../css/Texts";
import useWindowDimensions from "../../functions/windowDimensions"
import Navbar from "../Header"
 
export default function ChangePassword() {
  const phoneRef = useRef()
  const emailRef = useRef()
   const { currentUser, updatePassword, login } = useAuth()
  const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { height, width } = useWindowDimensions();
 const publicVapidKey = "BJpjlvIqaOuxYlJlQhpaBdOE3r8lqbad_efST0Nu_owHRA-kt5agl4bDd5dHx2iEYYqDfBw0Mj2pJtcWmqO-VF0";
async function handleEmail(e){
          setError("")
    setSuccess("")

    e.preventDefault()
    if(!emailRef.current)
      return setError("Add email")
    if(!emailRef.current.value)
      return setError("Add email")
 if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailRef.current.value)))
  {
    return setError("Invalid Email")
  }
 setLoading(true)
 try{

    const token = await currentUser.getIdToken(true)
  const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body: JSON.stringify({ addemail:emailRef.current.value, type : "mail"})
        };
    let res = await fetch(process.env.REACT_APP_API_URL+'subscribe', requestOptions);
        res = await res.text()
        res = JSON.parse(res)
        if(!res.isError)
        {
          setSuccess("Email Added")
        }else{
          setError("Internal Error")
        }
 }catch(e)
 {
          setError("Network Error")

 }
 setLoading(false)




}
  async function handleSubmit(e)  {
    e.preventDefault()
        setError("")
    setSuccess("")
     var key = e.charCode || e.keyCode || 0;  
     console.log(e)   
  if (key == 13) {
    alert("I told you not to, why did you do it?");
return;
  }
 setLoading(true)


   const token = await currentUser.getIdToken(true)
        // const requestOptions = {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json', 'token': token },
        //   body: JSON.stringify({ })
        // };

var params = "?token=" + token;

 var win = window.open(process.env.REACT_APP_API_URL+'service'+params, "sec");

  var timer = setInterval(function() {
        if (win.closed) {
            clearInterval(timer);
            alert("'Notification registered");
            //window.reload()
        }
    }, 500);
      //  let res = await fetch(process.env.REACT_APP_API_URL+'service', requestOptions);
       // res = await res.text()
       // res = JSON.parse(res)
   

         setLoading(false)

    //send("sarthak3singhal@gmail.com", "sarthak")

    
  }
 
 
    document.body.style.backgroundColor = "#ededf2";



  
  
 
  
  return (
    <>
<Navbar selected = "noti"  />
          <div>
<br></br>
 <br></br>
<br></br>
<br></br>
<br></br>

 <div  >

<div className = "container">
      <Card  style={{CardMain}, { paddingLeft:"15px", paddingRight : "15px", paddingTop : "25px", paddingBotton : "25px"}}  >

  <Card.Body>

 <br></br>


          <h4 className="text-left mb-4" style={Texts.Heading,{letterSpacing : "0"}}>Set Email Notification</h4>

 
           {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

         <Form.Group id="password">
              <Form.Label style = {Texts.FormLabel}>Email</Form.Label>
              <Form.Control
                type="text"
                ref={emailRef}
               />
            </Form.Group>
         
        
   <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "15px",  }}>
           
      

  

   <Button disabled={loading} style={{height : "42px", boxShadow : "none" }}  type="submit" className = "primaryButton" onClick= {handleEmail}>
Add            </Button>
          </Row>

        </Card.Body>
     


      </Card>
      





 <div style = {{height: "40px"}}></div>  
 






      <Card  style={{CardMain}, { paddingLeft:"15px", paddingRight : "15px", paddingTop : "25px", paddingBotton : "25px"}}  >

  <Card.Body>

 <br></br>


          <h4 className="text-left mb-4" style={Texts.Heading,{letterSpacing : "0"}}>Set Web Push Notification</h4>

  
   <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "15px",  }}>
           
      

  

   <Button disabled={loading} style={{height : "42px" , boxShadow:"none"}} type="button" className = "primaryButton" onClick= {handleSubmit}>
Add            </Button>
          </Row>

        </Card.Body>
     


      </Card>
      
   
</div>

          </div>
            </div>

    </>

  )
}