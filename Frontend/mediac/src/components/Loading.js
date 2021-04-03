import React, { useState, useRef, useEffect, useContext } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Card, CardBody,Row, Col,Button } from "reactstrap"
import { useHistory, Link } from "react-router-dom"
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext"
import {CardMain} from "../css/Card"
import loadimg from './img/loading.webp'
import  "./styles.css";
import Navbar from "./Navbar"


export default function Loading() 
{

    const [flag, setFlag] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
                setFlag(false);
            
          }, 120000);
      }, []);

    
    return (
        <>
                 <div className="Navb"><Navbar /></div>
            <div class="d-flex justify-content-center align-items-center   p-5" style={{marginTop:"5%", backgroundColor:"white !important"}}>
            <img src={loadimg}  />
            
            </div>
            <div class="d-flex justify-content-center  " style={{marginTop:"10%", backgroundColor:"white !important"}}>
            <p style={{marginTop:"-10%"}}><b>Please wait till we connect you to a doctor...</b></p>
            </div>

            <div class="d-flex align-items-center justify-content-center  " style={{marginTop:"12%", backgroundColor:"white !important"}}>
            <Button disabled={flag} id="cancelbtn" style={{marginTop:"-20%"}}><b>Cancel Consultation</b></Button>
            </div>

        </>)
}