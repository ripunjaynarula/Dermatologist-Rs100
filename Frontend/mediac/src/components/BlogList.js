import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import BlogListItem from "./BlogListItem";
import { Card, Button, Alert } from "react-bootstrap"
import docimg from './img/doc.jpeg'
import { useAuth } from "../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom"
import {Texts} from "../css/Texts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./BlogList.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];



export default function BlogList(props) {
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className = "abc"
       style={{ ...style, display: "block",  }}
      onClick={onClick}
    >
       </div>
  );
}
   var settings = {
        arrows: true,
         nextArrow: <SampleNextArrow />,
     infinite: true,
    speed: 500,
 slidesToShow: 3,
      slidesToScroll: 3
  };
  return (
    <>






 





      <div className="BlogList">

<SamplePrevArrow></SamplePrevArrow>

     <Slider {...settings}>
       {props.blogs &&  props.blogs.map(blog =>(<>
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
        </Slider>



               {props.blogs ? props.blogs.length>0?











        <Carousel breakPoints={breakPoints}>
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
        </Carousel>
        :<>
        <br></br>
        <p style = {Texts.FormLabel}>No Blogs yet</p></>
        :<>
        <br></br>
        <p style = {Texts.FormLabel}>No Blogs yet</p></>
}
      </div>
      
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BlogList />, rootElement);