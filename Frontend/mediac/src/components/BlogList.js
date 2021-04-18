import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import BlogListItem from "./BlogListItem";
import "./BlogList.css";
import { Card, Button, Alert } from "react-bootstrap"
import docimg from './img/doc.jpeg'
import { useAuth } from "../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom"
import {Texts} from "../css/Texts";


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];



export default function BlogList(props) {

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <>
      <div className="BlogList">
      <div className="carousel-wrapper"> 
        {props.blogs ? props.blogs.length>0?










          
        <Carousel className="blogcarousel" breakPoints={breakPoints}>
          
         {props.blogs.map(blog =>(<>
          <BlogListItem className="BlogListItem" key={blog.title}>
          <Link to="">
            <div class="card" style={{ justifyContent: 'center', borderRadius:"8px",shadowRad:"8px"}} >
              <img id="blogcardimg" src={docimg} style={{height:"100%",borderRadius:"8px"}}/>
            </div>
            </Link>
            <div>
            <h5 style={{color:"black", fontSize:"20px", marginTop:"5px", marginLeft:"15px"}}><b>{blog.title}</b></h5>
              <p style={{color:"black", fontSize:"10px",marginTop:"5px", marginLeft:"15px"}}>{blog.postdata}</p></div>
          </BlogListItem>
          </>))} 
           {/* <BlogListItem className="BlogListItem" key={props.blogs[0].title}>
          <Link to="">
            <div class="card" style={{ justifyContent: 'center', borderRadius:"8px",shadowRad:"8px"}} >
              <img id="blogcardimg" src={docimg} style={{height:"100%",borderRadius:"8px"}}/>
            </div>
            </Link>
            <div>
            <h5 style={{color:"black", fontSize:"20px", marginTop:"5px", marginLeft:"15px"}}><b>{props.blogs[0].title}</b></h5>
              <p style={{color:"black", fontSize:"10px",marginTop:"5px", marginLeft:"15px"}}>{props.blogs[0].postdata}</p></div>
          </BlogListItem>  */}
         
          {/* <BlogListItem className="BlogListItem" key={props.blogs[0].title}>
          <Link to="">
            <div class="card" style={{ justifyContent: 'center', borderRadius:"8px",shadowRad:"8px"}} >
              <img id="blogcardimg" src={docimg} style={{height:"100%",borderRadius:"8px"}}/>
            </div>
            </Link>
            <div>
            <h5 style={{color:"black", fontSize:"20px", marginTop:"5px", marginLeft:"15px"}}><b>{props.blogs[0].title}</b></h5>
              <p style={{color:"black", fontSize:"10px",marginTop:"5px", marginLeft:"15px"}}>{props.blogs[0].postdata}</p></div>
          </BlogListItem>   */}
        </Carousel>
        :<>
        <br></br>
        <p style = {Texts.FormLabel}>No Blogs yet</p></>
        :<>
        </>
}</div>
      </div>
      
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BlogList />, rootElement);