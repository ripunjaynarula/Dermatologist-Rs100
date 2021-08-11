import React, { useRef, useState } from "react"
import { Form, Button,Row, Container, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../../css/Card";
 import {Texts} from "../../css/Texts";
import useWindowDimensions from "../../functions/windowDimensions"
import Navbar from "../Navbar"
import firebase from 'firebase/app';

export default function ChangePassword() {
  const newPasswordRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, login } = useAuth()
  const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { height, width } = useWindowDimensions();
 
  async function handleSubmit(e)  {
    e.preventDefault()
        setError("")
    setSuccess("")

    
    if (newPasswordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("New Passwords do not match")
    }

if(passwordRef.current.value === newPasswordRef.current.value ){
      return setError("Cannot update password")


}
    const promises = []
    setLoading(true)




try{
var cuser = firebase.auth().currentUser;
var credential = firebase.auth.EmailAuthProvider.credential(
    cuser.email, 
    passwordRef.current.value
);
   var user =  await cuser.reauthenticateWithCredential( credential)
       
 if(user)
{
   await  updatePassword(passwordConfirmRef.current.value)
setSuccess("Password updated successfully")
 
}

}catch(e)
{
  if(e["code"] === "auth/wrong-password")
        setError("Wrong password entered")
  else if(e["code"] === "auth/weak-password")
        setError(e.message)
else
setError("Cannot update password")

  console.log(e)
}


         setLoading(false)

    

    
  }


    document.body.style.backgroundColor = "#ededf2";



  
  
 
  
  return (
    <>
    <div className="Navb"><Navbar /></div>

          <div>
<br></br>
 <br></br>
<br></br>
<br></br>
<br></br>

 <div  >

<Container  className="d-flex align-items-center justify-content-center topSpace"  style={{   }}>



<Container style = {{maxWidth : "500px"}}>


      <Card  style={{CardMain}  }  >

  <Card.Body style = {{ padding: "36px"}}>

 <br></br>


          <h2 className="text-left " style = {Texts.Heading}>Change Password</h2>

 
<br></br>          {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            
            <Form.Group id="password">
              <Form.Label style = {Texts.FormLabel}>Current Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
               />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label style = {Texts.FormLabel}>New Password</Form.Label>
              <Form.Control
                type="password"
                ref={newPasswordRef}
               />
            </Form.Group>


             <Form.Group id="password-confirm">
              <Form.Label style = {Texts.FormLabel}>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
               />
            </Form.Group>
         
          </Form>
        <br></br>
                <br></br>

        </Card.Body>
     


      </Card>
      
      <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "15px",  }}>
           
      

<Button disabled={loading}   className = "secondaryButton" onClick= {() =>        history.push('/')} >
Cancel            </Button>

<div style = {{width : "10px", height : "10px"}}></div>


   <Button disabled={loading} style={{height : "42px" }}  type="submit" className = "primaryButton" onClick= {handleSubmit}>
Update            </Button>
          </Row>

<br></br>
<br></br>

<br></br>
 

</Container>






         </Container>

          </div>
            </div>

    </>

  )
}