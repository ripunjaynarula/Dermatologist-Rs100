import React, { useRef, useEffect, useState, useContext } from "react";
import { Card, Form, Button, Alert, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import bgimg from "./img/image1.png";
import ellipse from "./img/ellipse.png";
import "./styles.css";
import firebase from "firebase";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Modal from "react-bootstrap/Modal";
import { CardMain } from "../css/Card";
import { Texts } from "../css/Texts";
import { DataContext } from "./App";
import close from './img/close.svg'
import {reactLocalStorage} from 'reactjs-localstorage';

export default function LoginPopup(prop) {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [consultationData, setConsultationData] = useContext(DataContext);

  async function handleSubmit(e) {
         console.log(prop.question);

    e.preventDefault();
    console.log("Submitting");
    try {
      setError("");
      setLoading(true);
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      var user = await login(emailRef.current.value, passwordRef.current.value);
        
       var d={ email: user.user.email, name : user.user.displayName};
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
              history.push("/consult/?ques=" + prop.question );

         return;
      }
      if (res['status'] === 'logged_in' && res['scope'] === 'doctor') {
        reactLocalStorage.set('role', "doctor");

         console.log('changed: '+ currentUser);
        setError('');
        setLoading(false)
        history.push('/doctordashboard')
        return;
      }
      if (res['status'] === 'verification_mail_sent') {
        setError('');
                reactLocalStorage.set('role', "patient");

        setLoading(false)
        history.push('/verification-sent');
        return;
      }

     } catch (e) {
      console.log(e)
      if (e['code'] === 'auth/user-not-found' || e['code'] === "auth/wrong-password") {
        setError("Incorrect email or password")
      }
      else {
        setError("Internal error.");
      }
      setLoading(false)    }
  }

  return (
    <div>
      <Card style={CardMain} id="loginpopup">
        <Card.Title>

 <div style = {{float: "right", marginLeft : "auto", marginRight : "20px", marginTop : "30px"}}>
        <img src = {close} className = "icon-button" alt="" onClick = {prop.onClick}></img>


 </div>

        </Card.Title>
        <Card.Body>
           <h2 className="text-left" style={Texts.Heading}>
            Log In
          </h2>
  <div className="w-100 text-left  " style ={{marginTop : "4px", marginBottom: "10px"}}>
          New User? <Link to="/signup">Sign Up</Link>
        </div>
           {error && <Alert variant="danger" style= {{marginTop : "20px", marginBottom : "0px"}}>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{ paddingTop: 14 }}>
              <Form.Label style={Texts.FormLabel}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password" style={{ paddingBottom: 22 }}>
              <Form.Label style={Texts.FormLabel}>Password</Form.Label>
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
        </Card.Body>

      
      </Card>
      <br />
    </div>
  );
}
