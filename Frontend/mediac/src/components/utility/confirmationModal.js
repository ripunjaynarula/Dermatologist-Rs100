import React  from "react";
import {   Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Modal from 'react-bootstrap/Modal'
import {   Button } from "react-bootstrap";

 

 export default function BlogCard(prop) {

 
 
  


  
      return (
    <>
 
        <Modal show={prop.show} onHide={prop.onHide}>
        <Modal.Header closeButton style = {{  borderBottom: "none"
}}>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{prop.message || "Are you sure you want to delete?"}</Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={prop.onYes}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
 
    </>
  )
}
  
