import Csidebar from "../Header";
import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Alert } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Sidebar from "./Sidebar";
import SidebarPatient from "./patientSidebar";

import OpenConversation from "../OpenConversation";
import { useAuth } from "../../contexts/AuthContext"
 import {reactLocalStorage} from 'reactjs-localstorage';
import useWindowDimensions from "../../functions/windowDimensions";


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
 var sidebar = <SidebarPatient></SidebarPatient>
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
 
  
   
}

    document.body.style.backgroundColor = "#ededf2";

  return (
    <>
     {
       width>600 ?
        <div className="chat">
          <Csidebar selected = "chat"></Csidebar>
           <Container className="d-flex align-items-center justify-content-center" >
            <div class="card chatcard" >
              <div class="card-body row chatwindow" >
                <div className="col-3 chatsideb">
                  <Sidebar></Sidebar>
                </div>
                <div className="col-9 " >
                  <OpenConversation  />
                </div>
              </div>
            </div>
          </Container>
        </div>
        :
             <div className="chat" style = {{overflowX: "hidden",}}>
          <Csidebar selected = "chat" />
              <div style = {{width : "100%",    overflowX: "hidden", backgroundColor:"white" }}>
            <div class="card chatcard">
              <div class="card-body row ">
                <div className="col-12 chatsideb">
                  <Sidebar></Sidebar>
                </div>
              </div>
            </div>
          </div>
        </div>
     }
     
    </>
  );
}

export default Chat;
