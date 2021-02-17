import React, {useEffect} from "react";
import Accordion from './Accordion'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import bgimg from './img/image1.png';
import ellipse from './img/ellipse.png';
import  "./styles.css";

export default function Home() {

  const { currentUser } = useAuth()
  const history = useHistory();

  useEffect( () => {
    if (currentUser) {
      history.push('/dashboard')
    }
  }, [currentUser, history])

    return (
    <>
        <div id="container" >
          <img id="gloves" src={bgimg} alt="bg" />
          <div id="hometxt">
          <p id="smalltxt">Lorem ipsum dolor sit amet</p>
          <h2 id="bigtxt">Best Care &<br></br>Better Doctors.</h2>
          <p id="smalltxt">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <p href="#" id="bookbtn"><img id="ellipsebtn" src={ellipse}/> Book your Appointment</p>
        </div>
    </>
  )
}
  
