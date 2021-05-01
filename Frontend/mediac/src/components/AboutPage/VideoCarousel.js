import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
 import { Card, Button, Row } from "react-bootstrap"
  import { useHistory, Link } from "react-router-dom"
  import VideoModal from '../utility/VideoModal'
import BlogListItem from "./videoItem";
 import viewSvg from '../img/visibility.svg'

const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 1 },
  { width: 1200, itemsToShow: 4 , itemsToScroll: 1}
];



export default function BlogList(props) {
  const history = useHistory()

 

  const [videoLink, setLink] = useState ("")
    const [show, setShow] = useState(false);

   const openVideo = (e) => {
    setLink(e)
    setShow(true)
 
  };
  const closeVideo = () => {
    
    setShow(false)
 
  };

 

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <>
      <div style = {{  paddingTop : "5px", }}>
      <div className="carousel-wrapper"> 
        {props.blogs ?    
        
       
             props.blogs.length>0?










          
        <Carousel className="blogcarousel" breakPoints={breakPoints}>
          
         {  props.blogs.map(blog =>(<>
          <BlogListItem className="BlogListItem" key={blog.title}>
          <Link to="" >
            <div class="videocard" style={{ justifyContent: 'center', borderRadius:"8px", marginTop : "5px", border : "none", backgroundColor: "#ededf2",}}>
             
             
              {/* <iframe width="100%" height="200px" src={blog.videoLink} title={blog.videoLink}  onClick  = {(e) => {
                            e.preventDefault()
                            openVideo(blog.videoLink)
                        }} 
 

           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
    <img class="videocardimg" src={blog.thumbnail} style={{borderRadius:"8px"}}  onClick  = {(e) => {
                            e.preventDefault()
                            openVideo(blog.videoLink)
                        }}  />

   <a href="#" class="play-btn mb-4" onClick  = {(e) => {
                            e.preventDefault()
                            openVideo(blog.videoLink)
                        }} ></a>
 
             </div>
            </Link>
            <div>
            <h5 style={{color:"black", fontSize:"20px",   marginLeft:"14px", marginTop: "16px"}}><b><a href ="#"  onClick  = {(e) => {
                            e.preventDefault()
                            openVideo(blog.videoLink)
                        }}
                         className = "title" >{blog.title}</a></b></h5>

          

            </div>
          </BlogListItem>
          </>))} 
            
        </Carousel>
         
   
         :<>
        </>:<></>
}</div>
      </div>
      <VideoModal show = {show} onHide = {closeVideo} videoId = {videoLink}></VideoModal>

    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BlogList />, rootElement);