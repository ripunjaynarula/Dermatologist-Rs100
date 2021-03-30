import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
import  "../styles.css";
 import  "./blog.css";
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
   import heartSvg from '../img/heart.svg'
   import facebook from '../img/facebook.svg'
   import linkedin from '../img/linkedin.svg'
   import twitter from '../img/twitter.svg'



   import heartSvgRed from '../img/heartRed.svg'
import DOMPurify from 'dompurify';

import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
   import SideBar from "./sidebar"
import { DataContext } from '../App';

export default function Home() {

        const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
 
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

            <article class="entry entry-single">

              <div class="entry-img" style = {{  
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
                <img src="https://assets.lybrate.com/q_auto,f_auto,w_200/imgs/product/icons/widget_icon.png" alt=""  style = {{  
   width: "100vh",
  objectFit: "cover"}}></img>
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
  <div class="blog-author d-flex align-items-center">
              <img style = {{
 width: "120px",
    marginRight: "20px"

              }} src="https://assets.lybrate.com/q_auto,f_auto,w_200/imgs/product/icons/widget_icon.png" class="rounded-circle float-left" alt=""></img>
              <div>
                <h4>Jane Smith</h4>
                <div class="social-links">
                  <a href="https://twitters.com/#">
                    <img src = {facebook} className = "icon-bigger" alt=""></img>
                    </a>
                  <a href="https://facebook.com/#">
                    <img src = {twitter} className = "icon-bigger" alt=""></img>
                    </a>
                  <a href="https://instagram.com/#">
                    <img src = {linkedin} className = "icon-bigger" alt=""></img>
                    </a>

                </div>
                <p>
                  Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.
                </p>
              </div>
            </div>


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
  
