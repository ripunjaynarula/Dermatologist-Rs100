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
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 1 },
  { width: 1200, itemsToShow: 4 , itemsToScroll: 1}
];



export default function BlogList(props) {
  const history = useHistory()

 
//props - blogs 
// blogs - title, url, image
  const imageClick = (url) => {
      try{
                history.push('/404');

      }
      catch(e)
      {
        console.log(e)
      }

        } 

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <>
      <div style = {{  paddingTop : "5px", }}>
      <div className="carousel-wrapper"> 
        {props.blogs ?    
        
        props.blogs.length ===1 ?

        <>
      <BlogListItem className="BlogListItem" key={props.blogs[0].title}>
<Link to="" >
            <div class="card" style={{ justifyContent: 'center', borderRadius:"8px", marginTop : "5px"}} >
              <img id="blogcardimg" src={props.blogs[0].image} style={{height:"220px",borderRadius:"8px"}}/>
            </div>
            </Link>
            <div>
            <h5 style={{color:"black", fontSize:"20px",   marginLeft:"14px", marginTop: "16px"}}><b><a href ={ props.blogs[0].url} className = "title" >{props.blogs[0].title}</a></b></h5>
</div>
           </BlogListItem>
        </>
           :
        
        
        props.blogs.length>1?










          
        <Carousel className="blogcarousel" breakPoints={breakPoints}>
          
         {  props.blogs.map(blog =>(<>
          <BlogListItem className="BlogListItem" key={blog.title}>
          <Link to="" >
            <div class="card" style={{ justifyContent: 'center', borderRadius:"8px", marginTop : "5px", border : "none"}}>
              <img id="blogcardimg" src={blog.image} style={{height:"220px",borderRadius:"8px"}}  onClick={() => imageClick(blog.url)}/>
            </div>
            </Link>
            <div>
            <h5 style={{color:"black", fontSize:"20px",   marginLeft:"14px", marginTop: "16px"}}><b><a href ={ blog.url} className = "title" >{blog.title}</a></b></h5>
               
            </div>
          </BlogListItem>
          </>))} 
            
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