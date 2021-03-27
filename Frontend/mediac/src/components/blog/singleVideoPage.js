import React, {useRef,useEffect, useState, useContext, Component} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
 import DOMPurify from 'dompurify';
import { useAuth } from "../../contexts/AuthContext"

import  "../styles.css";
 import  "./blog.css";
import SideBar from "./sidebar"
   import heartSvg from '../img/heart.svg'
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
 
export default function Video () {
    const { currentUser,  } = useAuth()

 const [error, setError] = useState(false)
   const [width, setWidth] = useState(false)
const [loading, setLoading] = useState(false)
   const ref = useRef(null);



const queryString = window.location.pathname;
const urlParams = new URLSearchParams(queryString);
console.log(queryString)


 useEffect(() => {
     function handleResize() {

       setWidth(ref.current ? ref.current.offsetWidth : 0)
    
}

    window.addEventListener('resize', handleResize)
       setWidth(ref.current ? ref.current.offsetWidth : 0)
  }, [ref.current]);


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
          body : JSON.stringify({patientUid: currentUser.uid})

          };
        let res = await fetch('http://localhost:5000/patient-profile', requestOptions);
        res = await res.text();
        res = JSON.parse(res)




}
catch(e){}

       setLoading(false)


  }







  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
 

   return (
    <>
 
     <section class="breadcrumbs">
      <div class="container">

       <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li>Blog Single</li>
        </ol>
        <h2>Blog Single</h2>

      </div>
    </section>

 

<main id = "main">

<section id="blog" class="blog">
      <div class="container" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-8 entries" >

            <article ref={ref} class="entry entry-single">

              <div class="entry-img"  style = {{  
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
              
                <iframe  width = {width} height={width / 1.77} src="https://www.youtube.com/embed/34wQaNSvi10" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>


                </iframe>
            
                
                
                
                
                
                
              </div>

              <h2 class="entry-title">
                <a href="blog-single.html">Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia</a>
              </h2>

              <div class="entry-meta">
                    <ul>
                  <li class="d-flex align-items-center"><img src = {userSvg} className = "icon" alt=""></img><a href="blog-single.html">John Doe</a></li>
                  <li class="d-flex align-items-center"><img src = {clockSvg} className = "icon" alt=""></img><a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
                  
                </ul>
              </div>

              <div class="entry-content">
            
           
              </div>

              <div class="entry-footer">
                 <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'space-between', }}>
             
<Row style = {{flexDirection: 'row', }}>

      <img src = {heartSvg} className = "icon-big" alt=""></img><p style = {{fontSize : "14px", color : "#777777"}}>  people found this helpful </p>
</Row>

              <div className="primaryButtonSmall" >
                  <a style = {{color : "white", fontSize : "14px",     textDecoration: "none"}} href="/">Read More</a>
                </div>
           </Row>     
              </div>

            </article>
 


 </div>
 
 
<div class="col-lg-4">

   <SideBar></SideBar>

          </div>
 
 
 
 
 </div>

 
 </div>
 
 
 </section>
</main>

 <footer id="footer" class="footer">

    <div class="footer-newsletter">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <h4>Our Newsletter</h4>
            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
          </div>
          <div class="col-lg-6">
            <form action="" method="post">
              <input type="email" name="email">
                  </input>
                  <input type="submit" value="Subscribe"></input>
            </form>
          </div>
        </div>
      </div>
    </div>
    </footer>
  


 

    </>
  )
 
 
}
 