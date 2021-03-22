import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
import  "../styles.css";
 import  "./blog.css";

import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "../LoginPopup"
import useWindowDimensions from "../../functions/windowDimensions"

import { DataContext } from '../App';
export default function Home() {

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

const title = "Better Doctors.";
var style = {};
 console.log(width)
 
if(width > 870) style = {
  flex : "40"
}
    return (
    <>
 
     <section class="breadcrumbs">
      <div class="container">

        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Blog</li>
        </ol>
        <h2>Blog</h2>

      </div>
    </section>

    <section id="blog" class="blog">
   
   <div class = "container" >
       <div class = "row">
           <div class = "col-lg-8 entries">

 
        <article class="entry">

              <div class="entry-img" style = {{backgroundColor: "pink", height: "300px", 
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
                <img src="https://assets.lybrate.com/q_auto,f_auto,w_200/imgs/product/icons/widget_icon.png" alt="" style = {{  
   width: "100vh",
  objectFit: "cover"}} ></img>
              </div>

              <h2 class="entry-title">
                <a href="blog-single.html">Nisi magni odit consequatur autem nulla dolorem</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">John Doe</a></li>
                  <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
                 </ul>
              </div>

              <div class="entry-content">
                <p>
                  Incidunt voluptate sit temporibus aperiam. Quia vitae aut sint ullam quis illum voluptatum et. Quo libero rerum voluptatem pariatur nam.
                  Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molestiae. Facilis et sint quos sed voluptas. Maxime sed tempore enim omnis non alias odio quos distinctio.
                </p>



   <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "14px" }}>
              <div class="primaryButtonSmall" >
                  <a style = {{color : "white", fontSize : "14px",     textDecoration: "none"}} href="blog-single.html">Read More</a>
                </div>
           </Row>
             
              </div>

            </article>
      

           </div>






<div class="col-lg-4">

            <div class="sidebar">

             

            
              <h3 class="sidebar-title">Recent Posts</h3>
              <div class="sidebar-item recent-posts">
                
                <div class="post-item clearfix">
                  <img src="https://assets.lybrate.com/q_auto,f_auto,w_200/imgs/product/icons/widget_icon.png" alt=""></img>
                  <h4><a href="blog-single.html">Quidem autem et impedit</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

             
              </div> 

              
            </div> 
          </div>
       </div>


   </div>

    </section>
     
    
    </>
  )
}
  
