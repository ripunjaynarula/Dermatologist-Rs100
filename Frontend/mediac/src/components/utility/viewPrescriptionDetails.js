import React,{useEffect, useRef, useState}  from "react";
import {   Container } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Modal from 'react-bootstrap/Modal'
import {   Button } from "react-bootstrap";
import useWindowDimensions from "../../functions/windowDimensions"

 import ReactPanZoom from 'react-image-pan-zoom-rotate';


 export default function BlogCard(prop) {

        const { height, width } = useWindowDimensions();

 
 console.log(prop)

  
      return (
    <>
 
        <Modal   animationType='slide' show={prop.show} onHide={prop.onHide} >

       <Modal.Header closeButton >
         </Modal.Header>
            <Modal.Body>
              
<div>
 Name - {prop.data.name} <br/>
  Gender - {prop.data.gender} <br/>
 Age - {prop.data.age} <br/>
<br/>
 Email - {prop.data.email} <br/>
 Phone number - {prop.data.phone} <br/>
<br/>
 Start Time - {prop.data.startDate} <br/>

 Issue - {prop.data.description} <br/>

<br/>
 Previous Conditions - {prop.data.email} <br/>
 Allergies - {prop.data.allergies} <br/>
 Previous Medications - {prop.data.medication} <br/>

<br/>
 Height - {prop.data.height} <br/>
 Weight - {prop.data.weight} <br/>

</div>
<br/>
<div class = "row" style = {{float: "right", marginLeft : "auto", marginRight : "20px"}}>

<a className="btn btn-primary"  href={"tel:" + prop.phone} 
> Call</a>

<div style = {{width:"5px"}}/>
<Button  onClick={()=>{
    prop.onHide();
    prop.onPrimary();
}} 
> Send Prescription</Button>

</div>

            </Modal.Body>

 
      </Modal>
 
    </>
  )
}
  
