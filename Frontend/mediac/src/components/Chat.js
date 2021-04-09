import Csidebar from './Csidebar'
import React, { useRef, useState, useEffect } from "react"
import {   Form, Button,   Row, Alert } from "react-bootstrap"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Sidebar from './Sidebar'
import {
    CardBody,
   Col,
   Card,
   Container,
 } from "reactstrap"
function Chat() {
    return (
        <div>
            <Csidebar/>
            <Container className="d-flex align-items-center justify-content-center">

            <div class="card"style={{marginTop:"5%"}}>
  
  <div class="card-body" >
    {/* <h5 class="card-title">Special title treatment</h5> */}
    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
    <Sidebar/>
    
  </div>
</div>

            </Container>
        </div>
    )
}

export default Chat
