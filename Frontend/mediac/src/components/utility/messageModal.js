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
         </Modal.Header>
        <Modal.Body>{prop.message}</Modal.Body>
       
      </Modal>
 
    </>
  )
}
  
