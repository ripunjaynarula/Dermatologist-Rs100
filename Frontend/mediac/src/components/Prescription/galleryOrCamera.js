import React  from "react";
import {   Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Modal from 'react-bootstrap/Modal'
import {   Button } from "react-bootstrap";

 

 export default function BlogCard(prop) {

  
      return (
      <>
        <Modal show={prop.show} onHide={prop.onHide}>
        <Modal.Header closeButton style = {{  borderBottom: "none"}}>
            <Modal.Title>Image Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <img src = ""></img>

            <input type="file" accept="image/*"></input>

            <Button class="primaryButton" onClick={prop.onYes}>
            Confirm
          </Button>
          <Button class="primaryButton" onClick={prop.onYes}> Confirm </Button>

        </Modal.Body>
     
      </Modal>
 
    </>
  )
}
  
