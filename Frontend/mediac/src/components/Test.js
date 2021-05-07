import React, { useState, useRef, useEffect, useContext } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Card, CardBody, Row, Col, Button } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";
import { CardMain } from "../css/Card";
import loadimg from "./img/loading.webp";
import "./styles.css";
import Navbar from "./Navbar";
import app from "../firebase";


export default function Loading(props) {
  const [flag, setFlag] = useState(true);
  const { currentUser } = useAuth();
  const history = useHistory();

  const checkStatus = async () => {
    const token = await app.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({id: props.id}),
    };
    let res = await fetch('http://localhost:5000/getConsultationStatus', requestOptions);
    res = await res.text();
    res = JSON.parse(res);
    if(res['status']){
      history.push('/chat')
    }
  }

  const handleCancelation = async() => {
    const token = await app.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({consultatioId: props.id, paymentId: props.paymentId}),
    };
    let res = await fetch('http://localhost:5000/cancelConsultation', requestOptions);
    res = await res.text();
    res = JSON.parse(res);
    if(res['status']){
      // display message
    }
  }

  useEffect(() => {
    document.getElementById("cancelbtn").style.visibility = "hidden";
    const check = setTimeout(checkStatus, 60000);
    const timer = setTimeout(() => {
      setFlag(false);
      document.getElementById("cancelbtn").style.visibility = "visible";
    }, 12);
  }, []);

  return (
    <>
      <div className="Navb">
        <Navbar />
      </div>
      <div
        className="d-flex justify-content-center align-items-center   p-5"
        style={{ marginTop: "5%", backgroundColor: "white !important" }}
      >
        <img src={loadimg} />
      </div>
      <div
        className="d-flex justify-content-center  "
        style={{ marginTop: "10%", backgroundColor: "white !important" }}
      >
        <p style={{ marginTop: "-10%" }}>
          <b>Please wait till we connect you to a doctor...</b>
        </p>
      </div>
      <div
        class="d-flex align-items-center justify-content-center  "
        style={{ marginTop: "12%", backgroundColor: "white !important" }}
      >
        <Button disabled={flag} id="cancelbtn" style={{ marginTop: "-20%" }} onClick={handleCancelation}>
          <b>Cancel Consultation</b>
        </Button>
      </div>
      <div
        class="d-flex align-items-center justify-content-center  "
        style={{ marginTop: "12%", backgroundColor: "white !important" }}
      >
      <div class="alert alert-success" role="alert">
          Consultation Cancelled successfully
        </div></div>
    </>
    
  );
}
