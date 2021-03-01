import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
// import {  useHistory } from "react-router-dom"
// import Accordion from "./Accordion";
// import  "./styles.css";
import app from '../firebase'
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'

export default function ConsultancyCard() {
  const [show, setShow] = useState(false);
  const [name, setname] = useState('');
  const [title, setTitle] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [docMail, setDocMail] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [active, setActive] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { currentUser, logout } = useAuth()
  useEffect( () => {
    async function fetchData() {
      if (currentUser) {

        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
        };
        let res = await fetch('http://localhost:5000/getActiveConsultation', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)

        if (res['status']) {
          //setTitle(res['title']);
          //setAge(res['age']);
          //setHeight(res['height']);
          //setWeight(res['weight']);
          //setDocMail(res['docMail']);
          //setStartDate(res['startDate'])
          setActive(true);
          if(res.consultation.length>1)
          {
            setTitle("You have " + res.consultation.length.toString()  + " active consultations")
          }else if(res.consultation.length === 1){
            setTitle("You have " + res.consultation.length.toString()  + " active consultation")

          }
        } else {
          setTitle("You have no active consultations.");
        }
      }
    }
    fetchData();
  }, [currentUser])
    

  return (
  <>
    { active?<div className="row" id="cardcontainer" style = {{display: "flex"}}>
        <p href="#" className="endbtn">End Consultation</p>
        <p>{title}</p>
        <p href="#" className="bookbtn" onClick={handleShow}>View</p>

        
        <Modal show={show} onHide={handleClose} size="lg"aria-labelledby="contained-modal-title-vcenter"centered>
       
        { active?<div className="card" id="popup">
      <div className="container" id="cardcontainer">
        <h2><b>Title: {title}</b></h2>
        <hr />
          <div style={{position: "relative"}}>
            <div id="cardprimary">
              <p><b>Doctor's Email:</b> {docMail}</p>
              <p style={{ align: 'right', display:'relative'}}><b>Start Date:</b> {startDate.toString().slice(0,10)}</p>
              <p>
                <b>Active Status: </b> Active
              </p>
            </div>
            <div id= "cardsecondary" >
              <p><b>Age:</b> {age} years</p>
              <p><b>Height: </b>{height} cm</p>
              <p><b>Weight:</b> {weight} Kg</p>
            </div>
        </div>
      </div>
      <div >
          <div id="cardbtn" style={{padding: "2px 16px"}}>
            <p href="#" className="bookbtn">Continue Consultation</p>
            <p href="#" className="endbtn">End Consultation</p>
          </div>
      </div>
    </div>:<div className="card">
      <div className="container" id="cardcontainer">
        <h5><b>No Active Consultations</b></h5>
        
          </div>
              
      
    </div>
  }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>


      </div>:<div ><p>{title}</p></div>
  }
  </>

)}