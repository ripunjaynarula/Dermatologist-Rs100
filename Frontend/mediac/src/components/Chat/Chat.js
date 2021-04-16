import Csidebar from "../Csidebar";
import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Alert } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Sidebar from "./Sidebar";
import SidebarPatient from "./sideBarPatient";

import OpenConversation from "../OpenConversation";
import { useAuth } from "../../contexts/AuthContext"
import Navbar from "../Navbar"
import {reactLocalStorage} from 'reactjs-localstorage';

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
var sidebar = <SidebarPatient></SidebarPatient>

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
 
  
  if (role === "doctor" )
      navBar = <Csidebar></Csidebar>;
      sidebar = <Sidebar></Sidebar>
 
}

    document.body.style.backgroundColor = "#ededf2";

  return (
    <>
      <BrowserView>
        <div className="chat">
          <Csidebar></Csidebar>
           <Container className="d-flex align-items-center justify-content-center" >
            <div class="card chatcard" >
              <div class="card-body row " >
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
      </BrowserView>
      
      <MobileView>
        <div className="chat">
          <Csidebar />
          <Container className="d-flex align-items-center justify-content-center">
            <div class="card chatcard">
              <div class="card-body row ">
                <div className="col-12 chatsideb">
                  <Sidebar></Sidebar>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </MobileView>
    </>
  );
}

export default Chat;
