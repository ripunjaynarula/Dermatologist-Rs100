import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {  useHistory } from "react-router-dom"
import Accordion from "./Accordion";
import  "./styles.css";



export default function ConsultancyCard(props) {

    

return (
<>

<div className="card">
  <div className="container" id="cardcontainer">
    <h2><b>Name: {props.name}</b></h2>
    <hr />
      <div style={{position: "relative"}}>
        <div id="cardprimary">
          <p><b>Doctor's Name:</b> Dr. {props.doctorname}</p>
          <p style={{ align: 'right', display:'relative'}}><b>Start Date:</b> {props.startdate}</p>
          <p>
            <b>Last appointment Date: </b>{props.lastconsult}
          </p>
        </div>
        <div id= "cardsecondary" >
          <p><b>Age:</b> {props.age} years</p>
          <p><b>Height: </b>{props.height}</p>
          <p><b>Weight:</b> {props.weight}</p>
        </div>
    </div>
  </div>
  <div >
      <div id="cardbtn" style={{padding: "2px 16px"}}>
        <p href="#" className="bookbtn">Continue Consultation</p>
        <p href="#" className="endbtn">End Consultation</p>
      </div>
  </div>
</div>
    

</>

)}