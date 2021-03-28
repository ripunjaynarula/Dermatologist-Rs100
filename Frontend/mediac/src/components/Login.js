import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import Navbar from "./Navbar"
import {Texts} from "../css/Texts";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  useEffect( () => {
    // onlyOnce();
  }, [])

function onlyOnce(){
     if (currentUser) {
      if (currentUser.role === "doctor")
      return history.push('/doctordashboard');
    }
    return history.push('/dashboard');
}
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      var user =  await login(emailRef.current.value, passwordRef.current.value)
      var d={ email: emailRef.current.value, name : user.user.displayName};
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token : await user.user.getIdToken() },
        body: JSON.stringify(d)
      }; 
      let res = await fetch('http://localhost:5000/login', requestOptions)
      res = await res.text()
      res = JSON.parse(res)
      console.log(res);
      setLoading(false)
      if (res['status'] === 'logged_in' && res['scope'] === 'patient') {
        currentUser.role = 'patient';
        setError('');
        setLoading(false)
        history.push('/');
        return;
      }
      if (res['status'] === 'logged_in' && res['scope'] === 'doctor') {
        currentUser.role = 'doctor';
        console.log('changed: '+ currentUser);
        setError('');
        setLoading(false)
        history.push('/doctordashboard');
        return;
      }
      if (res['status'] === 'verification_mail_sent') {
        setError('');
        setLoading(false)
        history.push('/verification-sent');
        return;
      }

      setLoading(false)
      //  history.push("/dashboard")
     } catch(e) {
      if (e['code'] === 'auth/user-not-found' || e['code'] === "auth/wrong-password") {
        setError("Incorrect email or password")
      }
      else {
        setError("Internal error.");
      }
      setLoading(false)
    }
  }

  return (


    <>
     <div className="Navb"><Navbar /></div>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
      
      <Card style={{CardMain},{ maxWidth: "400px" }}  >
<Card.Title>

</Card.Title>
        <Card.Body>

          <h2 className="text-center mb-4" style = {Texts.Heading}>Log In</h2>

<hr></hr>       
     {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{paddingTop: 14}}>
              <Form.Label style = {Texts.FormLabel}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password"  style={{paddingBottom: 22}}>
              <Form.Label  style = {Texts.FormLabel}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="submitbtn" type="submit">
              Log In
            </Button>
            {/* <p className="submitbtn" type="submit">Login</p> */}
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div><br/>
      </Card>
      
      </Container>
    </>
  )
}
