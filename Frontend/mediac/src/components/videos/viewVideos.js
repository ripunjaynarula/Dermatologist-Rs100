import React, { useState, useRef, useEffect } from "react";
import { Card, Form,Button, Container, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import {  useHistory } from "react-router-dom"
 // import ReactDOM from "react-dom";
// import bgimg from './img/image1.png';
import  "../styles.css";
import ConsultancyCard from "../ConsultancyCard"
// import ScriptTag from 'react-script-tag';
import ellipse from '../img/ellipse.png';
import bgimg from '../img/image1.png';
import {Texts} from "../../css/Texts";



export default function Dashboard() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const dbinfo = useRef()
  const history = useHistory()
  const quest = useRef()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect( () => {
 
  }, [currentUser, history])

 
  async function handleSubmit(e) {
    e.preventDefault()}

  return (
    <>
    
    <div  className="w-100 p-3" style={{ minHeight: "100vh" }}>
 

 
 
    </div>
    </>

  )
}
