import Csidebar from './Csidebar'
import React, { useRef, useState, useEffect } from "react"
import {   Form, Button,   Row, Alert } from "react-bootstrap"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import "./styles.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import {
    CardBody,
   Col,
   Card,
   Container,
 } from "reactstrap"


function Chat() {
  const [phone, setPhone] = useState(false);


  // useEffect(() => {

  //   // if(){
  //   //   setPhone(true);
  //   //   return
  //   // }
  // }, [setPhone]);
    return (
        <div className="chat">
            <Csidebar/>
            <Container className="d-flex align-items-center justify-content-center">

            <div class="card chatcard" >
  
  <div class="card-body row " >
    <div className="col-3 chatsideb"> 
   
    <Sidebar/>
    
    </div>
    <div className="col-9 "> 
    
    <OpenConversation/>
    
    </div>
   
  </div>
</div>

            </Container>
        </div>
    )
}

export default Chat
