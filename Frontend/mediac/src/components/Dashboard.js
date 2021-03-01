import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {  useHistory } from "react-router-dom"
import Accordion from "./Accordion";
// import ReactDOM from "react-dom";
// import bgimg from './img/image1.png';
import  "./styles.css";
import ConsultancyCard from "./ConsultancyCard"
// import ScriptTag from 'react-script-tag';
import ellipse from './img/ellipse.png';
import bgimg from './img/image1.png';
import {Texts} from "../css/Texts";



export default function Dashboard() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const dbinfo = useRef()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect( () => {
    async function fetchVerification() {
      if (currentUser) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: currentUser.email, uid: currentUser['uid'] })
          };
        let res = await fetch('http://localhost:5000/checkVerification', requestOptions);
        res = await res.text();
//        res = JSON.parse(res)
        if (!res['status']) {
          history.push('/verification-sent')
        }
      }
    }
    fetchVerification();
  }, [currentUser, history])

  async function handleSubmit(e) {
    e.preventDefault()}

  return (
    <>
    
      <ConsultancyCard  name="Shivansh Sharma" doctorname="Sehgal" startdate="10-01-2021" lastconsult="15-02-2021" age="20" height="180 cm" weight="69 kg"/>     
    
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
          <a href="/Choice" id="bookbtn"><img id="ellipsebtn" src={ellipse}/> Book your Appointment</a>
        </div>
    {/*<a href="/Choice" className="newconbtn"><img id="eellipsebtn" src={ellipse}/> New Consultation</a> <br/><br/>*/}
    {/*<a href="/OtherPersonDetails" id="onewconbtn"><img id="ellipsebtn" src={oellipse}/> New User</a>*/}
    </>

  )
}
