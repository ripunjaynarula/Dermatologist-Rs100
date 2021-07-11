 import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Alert } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Sidebar from "./patientSidebar";
 
import OpenConversation from "../OpenConversation";
import { useAuth } from "../../contexts/AuthContext"
import Navbar from "../Navbar"
import {reactLocalStorage} from 'reactjs-localstorage';
import useWindowDimensions from "../../functions/windowDimensions";
import { Link, useHistory } from "react-router-dom"

import "../styles.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { CardBody, Col, Card, Container } from "reactstrap";

function Chat() {
  const [phone, setPhone] = useState(false);
  const {   currentUser } = useAuth()
var navBar = <Navbar></Navbar>;
const history = useHistory()
   const { height, width } = useWindowDimensions();

  useEffect(() => {
onlyOnce()
    // if(){
    //   setPhone(true);
    //   return
    // }
  }, [setPhone]);

async function onlyOnce()  {
  if(!currentUser) return;
  var role =  reactLocalStorage.get('role') 
 console.log(role)
  if(role === undefined) role  = "";
 
  if(role === 'doctor')
  {
    history.replace('/chat/d')
  }
   
}

    document.body.style.backgroundColor = "#ededf2";

  return (
    <>

    
       {width > 600 ?        
       <div className="chat">
          <Navbar ></Navbar>
          <div style = {{height:"70px"}}></div>
           <div className={ width>1138 ? "centre" : "centre-bigger"} >
            <div class="card chatcard" style = {{marginTop:"100px"}}>
              <div class="card-body row " >
                <div className="col-3 chatsideb">
                  <Sidebar></Sidebar>
                </div>
                <div className="col-9 " >
                  <OpenConversation  />
                </div>
              </div>
            </div>
          </div>
        </div> :  
             <>
             
             <div style = {{overflowX: "hidden",}}>

                  <Navbar  />

              <div style = {{width : "100%",    overflowX: "hidden", backgroundColor:"white" }}>

                   <div class="chatcard" >
              <div class="card-body row ">
                <div className="col-12 chatsideb">
                  <Sidebar></Sidebar>
                </div>
              </div>
            </div>
              </div>
             </div>
    
             </>
 }
      
     
    </>
  );
}

export default Chat;
