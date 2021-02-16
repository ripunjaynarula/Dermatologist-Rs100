import React, {useEffect} from "react";
import Accordion from './Accordion'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import bgimg from './img/image1.png';
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
          <p>ascsncdjnvdnfvkdsmvksd</p>
          <p>csc d ndfivvd kj d djnfv</p>
          <p href="#" id="bookbtn">Book your Appointment</p>
        </div>
    </>
  )
}
  
