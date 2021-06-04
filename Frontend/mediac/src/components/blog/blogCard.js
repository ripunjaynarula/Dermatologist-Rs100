import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "./blog.css";
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
   import heartSvg from '../img/heart.svg'
 
 
import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
   import DOMPurify from 'dompurify';

import { DataContext } from '../App';
require('fetch-everywhere');

export default function BlogCard(prop) {

    const [flag, setFlag] = useState(false);
   const { login, currentUser } = useAuth();
   const [loading, setLoading] = useState(false)
   const [consultationData, setConsultationData] = useContext(DataContext);
   const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }




  
      return (
    <>
 
  

     
        <article className="entry"  style = {{backgroundColor : "white"}}>

              <div className="entry-img" style = {{ height: "300px", 
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
                <img src= {prop.image} alt="" style = {{  
   width: "100vh",
  objectFit: "cover"}} ></img>
              </div>

              <h2 className="entry-title">
                <a href={prop.blogLink}>{prop.title}</a>
              </h2>

              <div className="entry-meta">
                <ul>

{prop.author &&                   <li className="d-flex align-items-center"><img src = {userSvg} className = "icon" alt=""></img><a href="blog-single.html">{prop.author}</a></li>
}

                  <li className="d-flex align-items-center"><img src = {clockSvg} className = "icon" alt=""></img><a href="blog-single.html"><time dateTime="2020-01-01">{prop.publishDate}</time></a></li>
                 </ul>
              </div>

              <div className="entry-content">
      <div className="preview-small" dangerouslySetInnerHTML={createMarkup(prop.content)}></div>


   <Row style= {{paddingTop :"30px",paddingLeft :"30px", flexDirection: 'row', justifyContent: 'space-between', }}>
             
<Row style = {{flexDirection: 'row', }}>

      <img src = {heartSvg} className = "icon-big" alt=""></img><p style = {{fontSize : "14px", color : "#777777"}}> {prop.likes} people found this helpful </p>
</Row>

              <div className="primaryButtonSmall" >
                  <a style = {{color : "white", fontSize : "14px",     textDecoration: "none"}} href={prop.blogLink}>Read More</a>
                </div>
           </Row>
             
              </div>

            </article>
      

     
    
    </>
  )
}
  
