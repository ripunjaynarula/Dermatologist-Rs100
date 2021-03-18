import React, {useRef,useEffect, useState, useContext} from "react";
import { Form, Button, Alert } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
import bgimg from '../img/image1.png';
import ellipse from '../img/ellipse2.png';
import  "../styles.css";
import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "../LoginPopup"
import { DataContext } from '../App';
export default function Home() {

  const history = useHistory();
  const handleClose = () => setShow(false);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const handleShow = () => setShow(true);
  const [consultationData, setConsultationData] = useContext(DataContext);


 



    return (
    <>
    <div id="banner" className="w-100 p-3" style={{marginTop: "1px" }}>
    <div id="container"  >
          <div id="hometxt" >
            <h2 id="bigtxt"><br></br>Best Care & <br/>Better Doctors.</h2>
           </div>
        
     
        </div>
        </div>
        
    </>
  )
}
  
