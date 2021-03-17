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
    async function checkLogin(){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email: docMail})
      }

      let res = await fetch('http://localhost:5000/verifyDoc', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      if(!res['status']){
        history.push('/DoctorLogin');
      }
    }
    checkLogin();
  })


  return (
    <>
    <Header/>
    

    </>

)
}
