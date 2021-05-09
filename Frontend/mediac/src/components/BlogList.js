import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import BlogListItem from "./BlogListItem";
import "./BlogList.css";
import { Card, Button, Alert , Row, Col} from "react-bootstrap"
import docimg from './img/doc.jpeg'
import { useAuth } from "../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom"
import {Texts} from "../css/Texts";

 import useWindowDimensions from "../functions/windowDimensions"



export default function BlogList(props) {
  const history = useHistory()
  const { height, width } = useWindowDimensions();
 
//props - blogs 
// blogs - title, url, image
 
const [limit, setLimit] = useState(0)
const [showMore, setShowMore] = useState(false)
   const handleClick =(e)=>{
    e.preventDefault()
      setShowMore(!showMore)
}

   useEffect( () => {

    var items = 3;

    
    if(width> 1199) {
      
      items = 4
      setLimit(7)
    }else{
      setLimit(5)
    } 
  }, [width] )
   return (
    <>
      {  
        
        props.blogs ?

        <>
        
           <div style = {{ backgroundColor: "#ededf2",}}>
        <div class="section-title" style = {{paddingTop : "0px"}}>
                    <h4 id = "sec"  > { props.name ? "Blogs by Dr. "+props.name : "Our Articles"} </h4>
                    
                </div>
  <div className = "centre" style = {{marginTop : "-19px"}}>
     
       <Row>


                      { getBlog()
          
          }
               </Row>
  <div class="text-center" style = {{marginTop: "-12px"}}>
            <a href="#" onClick = {handleClick} class="view-more">{showMore ?`Show Less`: `Show More`}</a>
                            </div>
    </div>
    </div>
        
        
        
        
        
        </>:
    <>
        <br></br>
        <p style = {Texts.FormLabel}>No Blogs yet</p></>
       
}
    </>
  );



    
  function getBlog(){

     return  props.blogs.map((blog, i) =>{

if(!showMore)
if(i>limit)
  return <></> ;

return (<>
       
     <Col xs={6} md={width > 1199 ? 3 : 4} >

      <a className= "title" href = {blog.url}>

 <div className="videocard"  >
           <img src= {blog.image} alt="" style = {{  
 height :    "100%", 
  objectFit: "cover"}}
  
        

   ></img>
              </div>
               <div  style = {{marginTop: "-13px", marginBottom: "28px", marginLeft: width> 790 ? "11px":"4px"}}  >
<h5 style={{color:"black", fontSize: width> 790? "16px" : "14px"}}><b>              <a className ="title" href = {blog.url}>  {blog.title}</a>
              </b>
              </h5>
              </div>

      </a>

           
             
 

          </Col >

          </>)

    })
  }
}

 