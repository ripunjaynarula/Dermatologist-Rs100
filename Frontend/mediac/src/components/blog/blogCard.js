import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "./blog.css";
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
   import heartSvg from '../img/heart.svg'
import { convertToHTML } from 'draft-convert';

import SideBar from "./sidebar"

import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "../LoginPopup"
import useWindowDimensions from "../../functions/windowDimensions"

import { DataContext } from '../App';
export default function BlogCard(prop) {

  const history = useHistory();
  const handleClose = () => setShow(false);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const handleShow = () => setShow(true);
  const [consultationData, setConsultationData] = useContext(DataContext);
  const { height, width } = useWindowDimensions();

    let currentContentAsHTML = convertToHTML(prop.content);
    console.log(prop.content)
console.log(currentContentAsHTML)
    return (
    <>
 
  

     
        <article class="entry"  style = {{backgroundColor : "white"}}>

              <div class="entry-img" style = {{ height: "300px", 
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
                <img src= {prop.image} alt="" style = {{  
   width: "100vh",
  objectFit: "cover"}} ></img>
              </div>

              <h2 class="entry-title">
                <a href="blog-single.html">{prop.title}</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <li class="d-flex align-items-center"><img src = {userSvg} className = "icon" alt=""></img><a href="blog-single.html">{prop.author}</a></li>
                  <li class="d-flex align-items-center"><img src = {clockSvg} className = "icon" alt=""></img><a href="blog-single.html"><time dateTime="2020-01-01">{prop.publishDate}</time></a></li>
                 </ul>
              </div>

              <div class="entry-content">
                {currentContentAsHTML}


   <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'space-between', }}>
             
<Row style = {{flexDirection: 'row', }}>

      <img src = {heartSvg} className = "icon-big" alt=""></img><p style = {{fontSize : "14px", color : "#777777"}}> {prop.likes} people found this helpful </p>
</Row>

              <div class="primaryButtonSmall" >
                  <a style = {{color : "white", fontSize : "14px",     textDecoration: "none"}} href={prop.blogLink}>Read More</a>
                </div>
           </Row>
             
              </div>

            </article>
      

     
    
    </>
  )
}
  
