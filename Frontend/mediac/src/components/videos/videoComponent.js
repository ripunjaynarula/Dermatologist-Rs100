import React  from "react";
import {   Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "../blog/blog.css";
 import viewSvg from '../img/visibility.svg'
   import clockSvg from '../img/clock.svg'
     import edit from '../img/edit.svg'
   import del from '../img/trash.svg'

 import useWindowDimensions from "../../functions/windowDimensions"

 

 export default function BlogCard(prop) {

      const { height, width } = useWindowDimensions();
  const history = useHistory();

 


  const deleteVid = (e) => {
    e.preventDefault()
    e.stopPropagation();
 
  };
  const editVid = (e) => {
    e.preventDefault()
     e.stopPropagation();
  };

function openVideo(){ 
  history.push(prop.videoLink)
 }



  
      return (
    <>
 
  
     <Col xs={12} md={width > 1199 ? 4 : 6} >

     
        <article className="entry video" onClick = {openVideo} >

              <div className="entry-img" style = {{ height:  (width < 992 && width > 767) ? "200px" :    width > 1199 ?  "200px" : "250px", 
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
                <img src= {prop.image} alt="" style = {{  
   height:   "100%",
   width :   "100%",
 
  objectFit: "cover"}}
  
        

   ></img>
              </div>

              <div class = "limit" style = {{marginTop : "-5px", marginLeft : "-5px"}}>
                <h6 className="entry-title title-small" >
                <a href={prop.blogLink}>{prop.title}</a>
              </h6>
              </div>

            {prop.hideBottom === "yes" ?  <div></div> :
            
              <div className="entry-meta" style = {{marginTop : "6px", marginLeft : "-5px"}}>
                <ul>
                  <li className="d-flex align-items-center"><img src = {viewSvg} className = "icon" alt=""></img><div className = "txt">{prop.views}</div></li>
                  <li className="d-flex align-items-center"><img src = {clockSvg} className = "icon" alt=""></img><div className = "txt"><time dateTime="2020-01-01">{prop.publishDate}</time></div></li>
                 </ul>
              </div>

            }
             

          {prop.isPrivate ==="true" &&     <div className="entry-meta" style = {{marginTop : "19px", marginLeft : "-5px", marginBottom : "-2px"}}>
                <ul>
                  {/* <li className="d-flex align-items-center"><img src = {edit} className = "icon" alt=""></img><a href = "#" onClick = {editVid}>Edit</a></li> */}
                  <li className="d-flex align-items-center"><img src = {del} className = "icon" alt=""></img><a href = "#" onClick = {deleteVid}>Delete</a></li>
                 </ul>
              </div>

}

            </article>
      

          </Col >

    
    </>
  )
}
  
