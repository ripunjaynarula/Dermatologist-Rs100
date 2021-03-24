import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "./blog.css";
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
   import BlogCard from './blogCard'
   import heartSvg from '../img/heart.svg'

import SideBar from "./sidebar"

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

 
 <BlogCard title = "adasdasdad" image = "https://assets.lybrate.com/q_auto,f_auto,w_200/imgs/product/icons/widget_icon.png" 
  author = "XYZ" publishDate = "Jan 1, 2020" content = "<p> addsadd</p>" authouUsername = "" likes  = "32323" blogLink = ""
 
 
 ></BlogCard>

           </div>






<div class="col-lg-4">

             <SideBar></SideBar>
          </div>
  
  
  
       </div>


   </div>

    </section>
     
    
    </>
  )
}
  
