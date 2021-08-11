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
 import { useAuth } from "../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "../LoginPopup"
import useWindowDimensions from "../../functions/windowDimensions"
 import Footer from "../footer"

import { DataContext } from '../App';
 var loading = false;
require('fetch-everywhere');

export default function Home() {
  const messageEndRef = useRef(null);

  const history = useHistory();
  const handleClose = () => setShow(false);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("")
  
   const handleShow = () => setShow(true);
  const [consultationData, setConsultationData] = useContext(DataContext);
  const { height, width } = useWindowDimensions();
  const [ start, setStart ] = useState(0);
  const [ limit, setLimit ] = useState(5);
const [ended, setEnded] = useState(false)
const title = "Better Doctors.";
var style = {};

if(width > 870) style = {
  flex : "40"
}



    const [list, setList] = useState([])

    const [hasListiner, setHasListiner] = useState(false)

   useEffect(() => {
var lastScrollTop = 0;
 var sum = 800

       const handleScroll = () => {
         if(width < 998){
  sum = 22000
}
          setHasListiner(true)
         var st = window.pageYOffset || document.documentElement.scrollTop; 

         if (window.innerHeight + document.documentElement.scrollTop + sum >= document.scrollingElement.scrollHeight) {
        // Do load more content here!
          if (st > lastScrollTop){
      if(!loading)
     {
       getData()
       var elmnt = document.getElementById("myDiv");
 
      if(elmnt.offsetTop< window.innerHeight + document.documentElement.scrollTop ){
  
        setEnded(true)
      }
     }
   } else { 
      // upscroll code
   }
   lastScrollTop = st <= 0 ? 0 : st;
    }
      };
       document.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("scroll", handleScroll);
      };


  }, [list]);




  

  useEffect(() => getData(), [  ]);
  useEffect(() => {}, [ list ]);
 




 async function  getData() {
  if(ended  || loading) return

    
       loading = true
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
          body : JSON.stringify({
            start: start,
            limit : limit
          }) 
 
          };
        let res = await fetch(process.env.REACT_APP_API_URL+'blogs', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        if(res.blogs.length < limit)
        {
            setEnded(true)
        }
        setStart(start + res.blogs.length)
        if(res.status === "valid")
        {
  
               for(var i =0; i< res.blogs.length ; i++)
              {
                 res.blogs[i].postDate =  res.blogs[i].postDate.split("T")[0]
              }


 var l = list.concat(res.blogs)
              setList(l)
 
        }else{

               history.push('/404')
              return;
        }

}
catch(e){
        //history.push('/404')
        return;
}

        loading = false


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
           <div className = "col-lg-8 entries" id = "blogs_id">

 

  {list.map((data, index) => {

    return (
         
 <BlogCard title = {data.title} image = {data.image} 
  author = "" publishDate = {data.postDate} content = {data.postData} authouUsername = "username" likes  = {data.likes} blogLink = {"/blog/" + data.url}
 
 
 ></BlogCard>
          )
  })}

<div id = "myDiv"  ref={messageEndRef}></div>

 
 
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
  
