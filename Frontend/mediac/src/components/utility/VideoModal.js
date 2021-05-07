import React,{useEffect, useRef, useState}  from "react";
import {   Container } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Modal from 'react-bootstrap/Modal'
import {   Button } from "react-bootstrap";
import useWindowDimensions from "../../functions/windowDimensions"

 

 export default function BlogCard(prop) {

        const { height, width } = useWindowDimensions();

 
 

  
      return (
    <>
 
        <Modal  id = "transparent-modal" animationType='slide' show={prop.show} onHide={prop.onHide} >

        <iframe width="100%" height={(height/width)>1 ?"300px" :"600px"} src={prop.videoId} title={prop.videoTitle ? prop.videoTitle: "" } 
 
           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      </Modal>
 
    </>
  )
}
  
