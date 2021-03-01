import React, {useEffect} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import bgimg from './img/image1.png';
import ellipse from './img/ellipse.png';
import  "./styles.css";
import Signup from './Signup.js'

export default function Home() {

  const { currentUser } = useAuth()
  const history = useHistory();

  useEffect( () => {
    if (currentUser) {
      history.push('/dashboard')
    }
  }, [currentUser, history])
  async function handleSubmit(e) {
    e.preventDefault()}
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
          <a onClick={handleSubmit} id="bookbtn"><img id="ellipsebtn" src={ellipse}/> Book your Appointment</a>
        </div>
    </>
  )
}
  
