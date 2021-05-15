import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import Navbar from "./Navbar"
import {Texts} from "../css/Texts";
import {reactLocalStorage} from 'reactjs-localstorage';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
    const [rol, setRole] = useState()
  const history = useHistory()

  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect( () => {
      onlyOnce();
  }, [] )

async function onlyOnce()  {
  if(!currentUser) return;
  var role =  reactLocalStorage.get('role') 
 
  if(role === undefined) role  = "";
 
  
  if (role === "doctor" )
   { 
       return history.push('/doctordashboard');}
  else if(role ==="patient"){
       return history.push('/dashboard');
    }
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
      let res = await fetch(process.env.REACT_APP_API_URL+'login', requestOptions)
      res = await res.text()
      res = JSON.parse(res)
      console.log(res);
      setLoading(false)
      if (res['status'] === 'logged_in' && res['scope'] === 'patient') {
        reactLocalStorage.set('role', "patient");

         setError('');
        setLoading(false)
       history.push('/dashboard');
        return;
      }
      if (res['status'] === 'logged_in' && res['scope'] === 'doctor') {
        reactLocalStorage.set('role', "doctor");

         console.log('changed: '+ currentUser);
        setError('');
        setLoading(false)
        history.push('/doctordashboard');
        return;
      }
      if (res['status'] === 'verification_mail_sent') {
        setError('');
        setLoading(false)
                reactLocalStorage.set('role', "patient");

        history.push('/verification-sent');
        return;
      }

      setLoading(false)
      //  history.push("/dashboard")
     } catch(e) {
       console.log(e)
      if (e['code'] === 'auth/user-not-found' || e['code'] === "auth/wrong-password") {
        setError("Incorrect email or password")
      } else if(e['code'] ==="auth/too-many-requests")
      {
                setError("Login temporarily disabled due to too many failed requests. Try resetting the password or wait for sometime.")

      }
      else  {
        setError("Internal error.");
      }
      setLoading(false)
    }
  }
    document.body.style.backgroundColor = "#ededf2";

  return (


    <>
     <div className="Navb"><Navbar /></div>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", }}>
      
      <Card style={{CardMain},{ maxWidth: "450px" }}  >
<Card.Title>

</Card.Title>
        <Card.Body style = {{ padding: "36px"}}>
<br></br>
          <h2 className="text-left " style = {Texts.Heading}>Log In</h2>
<div className="w-100 text-left" style ={{marginTop : "4px", marginBottom: "10px"}}>
        New User? <Link to="/signup">Sign Up</Link>
      </div>
      {error && <Alert variant="danger" style= {{marginTop : "20px", marginBottom : "0px"}}>{error}</Alert>}
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

          <div className="w-100 text-left mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <br></br>
        </Card.Body>
      
      <br/>
      </Card>
      
      </Container>
    </>
  )
}