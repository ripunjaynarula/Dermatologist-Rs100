import React,{useEffect, useRef, useState}  from "react";
import {   Container } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Modal from 'react-bootstrap/Modal'
import {   Button } from "react-bootstrap";
import useWindowDimensions from "../../functions/windowDimensions"

 import ReactPanZoom from 'react-image-pan-zoom-rotate';


 export default function BlogCard(prop) {

        const { height, width } = useWindowDimensions();

 
 

  
      return (
    <>
 
        <Modal className = {"modal-content-img"}  id = "transparent-modal-im" animationType='slide' show={prop.show} onHide={prop.onHide} >

       <Modal.Header closeButton style = {{  borderBottom: "none" , zIndex:"5", paddingRight:"25px", 
}}>
         </Modal.Header>
            <Modal.Body>
              
            <ReactPanZoom
    alt="cool image"
    image={prop.url} 
   />

            </Modal.Body>

 
      </Modal>
 
    </>
  )
}
  
