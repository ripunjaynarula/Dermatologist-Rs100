import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Accordion from "./Accordion";
// import ReactDOM from "react-dom";
// import bgimg from './img/image1.png';
import "./styles.css";
import ConsultancyCard from "./ConsultancyCard";
// import ScriptTag from 'react-script-tag';
import ellipse from "./img/ellipse.png";
import bgimg from "./img/image1.png";
import { Texts } from "../css/Texts";
import Navbar from "./Navbar";
import HomeBottom  from "./AboutPage/HomeBottom"

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const dbinfo = useRef();
  const history = useHistory();
  const quest = useRef();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function onClick() {
    history.push("/Choice/?ques=" + quest.current.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>

    
     <div className = "home">
       <div className="Navb" ><Navbar type = "trans" /></div>
     </div>
      <div id="wrapper" className="w-100 p-3" style={{   }}>
        <div id="container">
          {/* <img id="gloves" src={bgimg} alt="bg" /> */}
          <div id="hometxt">
            <h2 id="bigtxt">
              <br></br>Best Care &<br></br>Better Doctors.
            </h2>
            <p id="smalltxt">Ask us a question </p>
          </div>
          <Form autocomplete="off" onSubmit={handleSubmit}>
            <Form.Group id="ocity">
              <input
                type="text"
                ref={quest}
                id="dbques"
                style={{ borderRadius: "8px" }}
                placeholder="Tell us your symptom or health problem"
              />
            </Form.Group>
          </Form>
          <Button onClick={onClick} id="bookbtn">
            <img id="ellipsebtn" src={ellipse} /> Start Consultaion
          </Button>
        </div>
        {/*<a href="/Choice" className="newconbtn"><img id="eellipsebtn" src={ellipse}/> New Consultation</a> <br/><br/>*/}
        {/*<a href="/OtherPersonDetails" id="onewconbtn"><img id="ellipsebtn" src={oellipse}/> New User</a>*/}
      </div>

      <HomeBottom></HomeBottom>
    </>
  );
}
