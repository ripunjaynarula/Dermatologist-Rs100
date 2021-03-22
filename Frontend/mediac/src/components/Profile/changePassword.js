import React, { useRef, useState } from "react"
import { Form, Button,Row, Container, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../../css/Card";
 import {Texts} from "../../css/Texts";
import useWindowDimensions from "../../functions/windowDimensions"

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
 
      var user =  await login(currentUser.email, passwordRef.current.value)

 
if(user)
{
 var res = await updatePassword(passwordRef.current.value)
setSuccess("Password updated successfully")
      //  history.push("/dashboard")

 console.log(res);
}

}catch(e)
{
  if(e["code"] === "auth/wrong-password")
        setError("Wrong password entered")
  

setError("Cannot update password")

  console.log(e)
}


         setLoading(false)

    

    
  }





  
  
  CardMain.maxWidth = "400px";

  
  return (
    <>

          <div>
<br></br>
<br></br>

 <div  >

<Container  style={{ minHeight: height -105 }}>



<Container style = {{maxWidth : "600px"}}>


      <Card  style={{CardMain}}  >

  <Card.Body>

 

          <h5 className="text-left mb-4" style={{letterSpacing : "0"}}>Change Password</h5>

 
          <hr></hr>
          {error && <Alert variant="danger">{error}</Alert>}
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


</Container>






         </Container>

          </div>
            </div>

    </>

  )
}