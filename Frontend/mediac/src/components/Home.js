import React, {useRef,useEffect, useState} from "react";
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
import LoginPopup from "./LoginPopup"
export default function Home() {

  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect( () => {
    if (currentUser) {
      setFlag(true);
      history.push('/dashboard');
      return
    }
    setFlag(false);
  }, [currentUser, history,setFlag])

  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      var user =  await login(emailRef.current.value, passwordRef.current.value)
console.log(await user.user.getIdToken())
       setLoading(false)
      history.push("/dashboard")
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
        <div id="container" >
          <img id="gloves" src={bgimg} alt="bg" />
          <div id="hometxt">
          <p id="smalltxt">Lorem ipsum dolor sit amet</p>
          <h2 id="bigtxt">Best Care &<br></br>Better Doctors.</h2>
          <p id="smalltxt">Ask us a question </p>
          </div>
          <Form onSubmit={handleSubmit}>

          <Form.Group id="ocity">
                  <input type="text" id="dbques" placeholder="Your query goes here..."/>
                </Form.Group>

          </Form>
          <a onClick={handleShow} id="bookbtn"><img id="ellipsebtn" src={ellipse}/> Book your Appointment</a>
        
        <Modal show={show} onHide={handleClose} id="nlogin">
       
       <LoginPopup/>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
        </div>
    </>
  )
}
  
