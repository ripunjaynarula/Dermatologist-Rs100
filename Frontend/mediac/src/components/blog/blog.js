import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "./blog.css";
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
   import BlogCard from './blogCard'
   import heartSvg from '../img/heart.svg'

import SideBar from "./sidebar"
import DOMPurify from 'dompurify';

import Navbar from '../Navbar'
import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "../LoginPopup"
import useWindowDimensions from "../../functions/windowDimensions"
 import Footer from "../footer"

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






    const [list, setList] = useState([])


  

  useEffect(() => getData(), []);
 



 async function  getData() {

 
 
   
       setLoading(true)
          setError("")
try{

      var token = null;
      if(currentUser)
      {
        token = await  currentUser.getIdToken(true)
      }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
 
          };
        let res = await fetch('http://localhost:5000/blogs', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
 
               for(var i =0; i< res.blogs.length ; i++)
              {
                 res.blogs[i].postDate =  res.blogs[i].postDate.split("T")[0]
              }

console.log("done")
              setList(res.blogs)
        }else{

          console.log("anranrarnr")
              history.push('/404')
              return;
        }

}
catch(e){
        //history.push('/404')
        return;
}

       setLoading(false)


  }














    return (
    <>
        <div className="Navb" ><Navbar  /></div>

     <section className="breadcrumbs">
      <div className="container">

        <ol>
          <li><a href="/">Home</a></li>
          <li>Blogs</li>
        </ol>
        <h2>Blogs</h2>

      </div>
    </section>

    <section id="blog" className="blog">
   
   <div className = "container" >
       <div className = "row">
           <div className = "col-lg-8 entries">

 

  {list.map((data, index) => (
         
 <BlogCard title = {data.title} image = {data.image} 
  author = "XYZ" publishDate = {data.postDate} content = {data.postData} authouUsername = "username" likes  = {data.likes} blogLink = {"/blog/" + data.url}
 
 
 ></BlogCard>
          ))}


 
 
           </div>






<div className="col-lg-4">

             <SideBar></SideBar>
          </div>
  
  
  
       </div>


   </div>

    </section>
     <Footer></Footer>
    
    </>
  )
}
  
