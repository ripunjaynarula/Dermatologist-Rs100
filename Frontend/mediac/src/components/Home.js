import React, {useEffect} from "react";
import Accordion from './Accordion'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

// import bgimg from './img/image1.png';
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
         <div className="Container" id="faq">
      <h2 className="text-center" id="faqhead" >Frequently Asked Questions</h2>
      <hr></hr>
      <div className="App">
      <Accordion
        title="What is your return policy?"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Accordion
        title="How do I track my order?"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Accordion
        title="Can I purchase items again?"
        content="
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </br>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </br>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        "
      />
    </div>
   

        
      </div>
        </>
  )
}
  
