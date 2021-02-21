import React, { useRef, useState, useEffect } from "react"
import { Form, Card, Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import {Texts} from "../css/Texts";

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

var tok = await user.user['uid'];
  console.log(tok);
var d={ email: emailRef.current.value, name: nameRef.current.value,   phone: phoneRef.current.value, uid : tok };


       const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
        }; 

      console.log("ABC")
      let res = await fetch('http://localhost:5000/patientSignup', requestOptions)
 

      res = await res.text()
      res = JSON.parse(res)

      console.log(res);
      setLoading(false)

      if (res['status'] !== 'verification_mail_sent') {
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

  return (
    <>
      <Card  style={CardMain} >
        <Card.Body>
         < div id="cardbox">
          <h2 className="text-center mb-4"  style={Texts.Heading} >Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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
            
            <Button disabled={loading} className="submitbtn" type="submit">
              Sign Up
            </Button>
          </Form>
          </div>
        </Card.Body>
      </Card>
  
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
