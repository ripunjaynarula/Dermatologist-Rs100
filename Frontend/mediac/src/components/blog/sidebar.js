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
  const quest = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const handleShow = () => setShow(true);
  const [consultationData, setConsultationData] = useContext(DataContext);
  const { height, width } = useWindowDimensions();

  
  function onClick(){
 history.push('/Choice/?ques=' + quest.current.value ) 
}
    return (
    <>
 
   <div class="sidebar">

               <h3 class="sidebar-title">Ask a question</h3>
              <div class="sidebar-item search-form">
           <Form.Control
                type="text"
                ref={quest}
              />    <Row style= {{paddingTop :"14px", flexDirection: 'row', justifyContent: 'flex-start', paddingBottom : "10px" }}>
              <div class="primaryButtonSmall"  onClick={onClick}  >
                  <a     style = {{color : "white", fontSize : "14px",      textDecoration: "none", borderRadius : "30px"}} href >Consult Now</a>
                </div>
           </Row>
             
              </div>

            
              <h3 class="sidebar-title">Recent Posts</h3>
              <div class="sidebar-item recent-posts">
                
                <div class="post-item clearfix">
                  <img src="https://assets.lybrate.com/q_auto,f_auto,w_200/imgs/product/icons/widget_icon.png" alt=""></img>
                  <h4><a href="blog-single.html">Quidem autem et impedit</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

             
              </div> 

              
            </div> 

 
   <div class="sidebar">

           
         

            
              <h3 class="sidebar-title">Videos</h3>
              <div class="sidebar-item recent-posts">
                
                <div class="post-item clearfix">
                  <img src="https://assets.lybrate.com/q_auto,f_auto,w_200/imgs/product/icons/widget_icon.png" alt=""></img>
                  <h4><a href="blog-single.html">Quidem autem et impedit</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

             
              </div> 

              
            </div> 


 

    </>
  )
}
  
