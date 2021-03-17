import React, { useState, useRef, useEffect, useContext } from "react";
import { Card } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {  useHistory } from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Header from './Header';
import {CardMain} from "../css/Card"
import  "./styles.css";
import {DocMailContext} from './App';

export default function DoctorDashboard() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const dbinfo = useRef()
  const history = useHistory()
  const quest = useRef()
  const [docMail, setDocMail] = useContext(DocMailContext);

  useEffect(() =>{
    console.log(docMail);
  })


  return (
    <>
    <Header/>
    

    </>

)
}
