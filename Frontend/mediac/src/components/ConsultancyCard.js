import React, { useState, useEffect } from "react";
// import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
// import {  useHistory } from "react-router-dom"
// import Accordion from "./Accordion";
// import  "./styles.css";
import app from '../firebase'



export default function ConsultancyCard() {

  const [name, setname] = useState('');
  const [title, setTitle] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [docMail, setDocMail] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [active, setActive] = useState(false);



  const { currentUser, logout } = useAuth()
  useEffect( () => {
    async function fetchData() {
      if (currentUser) {

        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', token: token },
          body: JSON.stringify({ uid: currentUser['uid'] })
        };
        let res = await fetch('http://localhost:5000/getActiveConsultation', requestOptions);
        console.log(res);
        res = await res.text();
console.log("SSS",res);
        res = JSON.parse(res)
console.log(res);
        if (res['status']) {
          setTitle(res['title']);
          setAge(res['age']);
          setHeight(res['height']);
          setWeight(res['weight']);
          setDocMail(res['docMail']);
          setStartDate(res['startDate'])
          setActive(true);
        }
      }
    }
    fetchData();
  }, [currentUser])
    

  return (
  <>
    { active?<div className="card">
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
  </>

)}