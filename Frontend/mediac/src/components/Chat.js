import Csidebar from './Csidebar'
import React, { useRef, useState, useEffect } from "react"
import {   Form, Button,   Row, Alert } from "react-bootstrap"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import "./styles.css";

import {
    CardBody,
   Col,
   Card,
   Container,
 } from "reactstrap"
function Chat() {
    return (
        <div className="everything">
            <Csidebar/>
            <Container className="d-flex align-items-center justify-content-center">

            <div class="card"style={{marginTop:"7%"}}>
  
  <div class="card-body row" >
    {/* <h5 class="card-title">Special title treatment</h5> */}
    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
    <div className="col-3 "> 
   
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
