import React, { useRef, useState, useEffect } from "react"
import { Form, Card, Alert, Button, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import {Texts} from "../css/Texts";
import Navbar from "./Navbar"

export default function Signup() {
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const phoneRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

 
  useEffect( () => {

    onlyOnce();

  }, [])

function onlyOnce(){
     if (currentUser) {
      history.push('/');
    }
}
  async function handleSubmit(e) {
    e.preventDefault()

    

    try {
      setError("")
      setLoading(true)
       await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    var user =   await signup(emailRef.current.value, passwordRef.current.value)
 
var tok = await user.user.getIdToken();
  console.log(tok);
 
var d={ email: emailRef.current.value, name: nameRef.current.value,   phone: phoneRef.current.value, };


       const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token : tok },
        body: JSON.stringify(d)
        }; 

      let res = await fetch(process.env.REACT_APP_API_URL+'patientSignup', requestOptions)
 

      res = await res.text()
      res = JSON.parse(res)

      console.log(res);
      setLoading(false)
      if (res['status'] === 'logged_in'){
        history.push("/dashboard")
        return

      }else if (res['status'] !== 'verification_mail_sent') {
         setError('Technical Error');
        return;
      }
      history.push("/verification-sent")
    } catch (e) {

      console.log(e)
      if (e['code']==='auth/email-already-in-use') {
        setError('Email already in use.')
        setLoading(false)
        return
      }
      setError("Failed to create an account. Internal error. ");
      setLoading(false)
    }
  }
    document.body.style.backgroundColor = "#ededf2";

  return (
    <>
     <div className="Navb"><Navbar /></div>
    <Container className="d-flex align-items-center justify-content-center topSpace" style={{ minHeight: "100vh", }}>
      <Card  style={{CardMain},{ maxWidth: "500px", padding:"15px"}} >
        <Card.Body>
          <br></br>
         < div id="cardbox">
          <h2 className="text-left"  style={Texts.Heading} >Sign Up</h2>
           <div className="w-100 text-left">
        Already have an account? <Link to="/login">Log In</Link>
      </div><br></br>
           {error && <Alert variant="danger" style= {{marginTop : "20px", marginBottom : "0px"}}>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group  id="name">
              <Form.Label style={Texts.FormLabel}>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label style={Texts.FormLabel}>Phone Number</Form.Label>
              <Form.Control type="text" ref={phoneRef} required />
            </Form.Group>
        
            <Form.Group id="email">
              <Form.Label style={Texts.FormLabel}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={Texts.FormLabel}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br></br>
            <Button disabled={loading} className="submitbtn" type="submit">
              Sign Up
            </Button>
            <br/>
          </Form>
          </div>
        </Card.Body>
       
      <br/>
      </Card>
  
      </Container>
    </>
  )
}