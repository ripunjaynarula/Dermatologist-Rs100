import React, {useRef,useEffect, useState, useContext} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link,useHistory } from 'react-router-dom'
import bgimg from './img/image1.png';
import ellipse from './img/ellipse.png';
import  "./styles.css";
import firebase from 'firebase'
import { auth } from '../firebase'
import { useAuth } from "../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import {CardMain} from "../css/Card";
import {Texts} from "../css/Texts";
import {DataContext} from './App';


 
export default function LoginPopup(prop) {
    const history = useHistory();
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [consultationData, setConsultationData] = useContext(DataContext);
    
    
    async function handleSubmit(e) {
      console.log(prop.question)
        e.preventDefault()
        console.log('Submitting');
        try {

          setError("")
          setLoading(true)
          await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          var user =  await login(emailRef.current.value, passwordRef.current.value);
          console.log(consultationData);
          history.push('/Choice/?ques=' + prop.question);

        } catch (e) {
          console.log(e)
        }
      
      }

      
    return (
        <div>
           
       <Card style={CardMain} id="loginpopup"  >
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
      </div>
      </Card>
        <br/>
        </div>
        
    )
}
