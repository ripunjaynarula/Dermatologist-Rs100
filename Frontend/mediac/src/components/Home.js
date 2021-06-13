import React, { useRef, useEffect, useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
 import ellipse from "./img/ellipse2.png";
import "./styles.css";
import firebase from "firebase";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Modal from "react-bootstrap/Modal";
import LoginPopup from "./LoginPopup";
import { DataContext } from "./App";
import Navbar from "./Navbar";
import bg1 from "./img/b1.jpg";
import bg2 from "./img/b2.jpg";
import bg3 from "./img/b3.jpg";
import HomeBottom from './AboutPage/HomeBottom'
import useWindowDimensions from "../functions/windowDimensions";
import plus from './img/plus.svg'
import SEO from './utility/seo'
const colors = [`url(${bg1})`, `url(${bg2})`, `url(${bg3})`];
const delay = 2000;

export default function Home() {
  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { height, width } = useWindowDimensions();
//505-o
  const [consultationData, setConsultationData] = useContext(DataContext);

  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    dataRef.current.value = "";
    if (currentUser) {
      setFlag(true);
      history.push("/dashboard");
      return;
    }
    setFlag(false);
  }, [currentUser, history, setFlag]);

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      var user = await login(emailRef.current.value, passwordRef.current.value);
      console.log(await user.user.getIdToken());
      setLoading(false);
      history.push("/dashboard");
    } catch (e) {
      if (
        e["code"] === "auth/user-not-found" ||
        e["code"] === "auth/wrong-password"
      ) {
        setError("Incorrect email or password");
      } else {
        setError("Internal error.");
      }
      setLoading(false);
    }
  }

  const handleChange = () => {
    setConsultationData(dataRef.current.value);
  };

  return (
    <>
    <SEO  title="Home" keywords  = "dermatologist, skin care, skin doctor"></SEO>
     <div className="Navb">
          <Navbar type="trans" />
        </div>
      <div className="wrapper"  style={{overflow: 'hidden'}}>
          <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)`}}>
        {colors.map((bg) => (
          <div className="slide" style={{ backgroundImage: `${bg}`  }}>
          </div>
        ))}
      </div>





        <div className="overlapping-text">
          <div id="hometxt">
            <h2 id="bigtxt">
              <br></br>Best Care & <br />
              Better Doctors.
            </h2>
            <p id="smalltxt">Ask us a question </p>
          </div>
          <Form autocomplete="off" onSubmit={handleSubmit}>
            <Form.Group id="ocity">
              <input
                type="text"
                id="dbques"
                style={{ borderRadius: "8px" }}
                placeholder="Tell us your symptom or health problem"
                ref={dataRef}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
   <Button onClick={handleShow} id="bookbtn">
                                      <img  id="ellipsebtn" src = {plus} height="55px" ></img>

   &nbsp; Start Consultaion
        </Button>
      
 
        </div>
        
        </div>
        
        
<HomeBottom></HomeBottom>
       <Modal show={show} onHide={handleClose} id="nlogin">
       
       <LoginPopup onClick={handleClose}/>
 
      </Modal>
    </>
  );
}
