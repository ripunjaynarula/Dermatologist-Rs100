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
        <p href="#" className="bookbtn">View</p>

      </div>:

<div >
      
     
    </div>
  }
  </>

)}