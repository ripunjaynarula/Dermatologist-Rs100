 import React, { useEffect, useState, useContext } from "react";
import {   Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import { useAuth } from "../../contexts/AuthContext"
   
  import  "../blog/blog.css";
 import viewSvg from '../img/visibility.svg'
   import clockSvg from '../img/clock.svg'
     import edit from '../img/edit.svg'
   import del from '../img/trash.svg'

import ConfirmationModal from '../Prescription/AddPrescription'
// import ConfirmationModal from '../utility/confirmationModal'
 import useWindowDimensions from "../../functions/windowDimensions"

 

 export default function BlogCard(prop) {

      const { height, width } = useWindowDimensions();
  const history = useHistory();
const [show,setShow] = useState(false)
 
    const {  currentUser } = useAuth();


  const deleteVid = (e) => {
    e.preventDefault()
    e.stopPropagation();
    setShow(true)
 
  };


  
  async function onYes (e)  {
 try{

      var token = null;
      if(currentUser)
      {
        token = await  currentUser.getIdToken(true)
      }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
                  body:JSON.stringify({blogId :  prop.type === "blog"  && prop.id,
                  videoId :  prop.type === "video"  && prop.id,
                  
                  })

          };
          console.log(requestOptions)
        let res ;
        if(prop.type === "blog")
        res = await fetch('http://localhost:5000/delete-blog', requestOptions);
        else
          res = await fetch('http://localhost:5000/delete-video', requestOptions);

        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(!res.isError)
        {
 
            window.location.reload(false);

               
        }else{
               return;
        }

}
catch(e){
        //history.push('/404')
        return;
}

 
      prop.removeFromList()
    setShow(false)
  
  };

  const onHide = (e) => {
 
    setShow(false)
 
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
   height: width < 474 && "100%",
   width : width > 472 && "100%",
 
  objectFit: "cover"}}
  
        

   ></img>
              </div>

              <div class = "limit" style = {{marginTop : "-5px", marginLeft : "-5px"}}>
                <h6 className="entry-title title-small" >
                <a href={prop.blogLink}>{prop.title}</a>
              </h6>
              </div>

              <div className="entry-meta" style = {{marginTop : "6px", marginLeft : "-5px"}}>
                <ul>
                  <li className="d-flex align-items-center"><img src = {viewSvg} className = "icon" alt=""></img><div className = "txt">{prop.views}</div></li>
                  <li className="d-flex align-items-center"><img src = {clockSvg} className = "icon" alt=""></img><div className = "txt"><time dateTime="2020-01-01">{prop.publishDate}</time></div></li>
                 </ul>
              </div>

             

          {prop.isPrivate ==="true" &&     <div className="entry-meta" style = {{marginTop : "19px", marginLeft : "-5px", marginBottom : "-2px"}}>
                <ul>
                  {/* <li className="d-flex align-items-center"><img src = {edit} className = "icon" alt=""></img><a href = "#" onClick = {editVid}>Edit</a></li> */}
                  <li className="d-flex align-items-center"><img src = {del} className = "icon" alt=""></img><a href = "#" onClick = {deleteVid}>Delete</a></li>
                 </ul>
              </div>

}

            </article>
      

          </Col >

<ConfirmationModal show = {show} onHide = {onHide} onYes = {onYes} ></ConfirmationModal>
    
    </>
  )
}
  
