import React,{useEffect, useRef, useState}  from "react";
import {   Container } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Modal from 'react-bootstrap/Modal'
import {   Button } from "react-bootstrap";

 

 export default function BlogCard(prop) {

    const [loading, setLoading] = useState(false)

   const [width, setWidth] = useState(0)
    const ref = useRef(null);

 useEffect(() => {
     function handleResize() {

       setWidth(ref.current ? ref.current.offsetWidth : 0)
    
}

    window.addEventListener('resize', handleResize)
       setWidth(ref.current ? ref.current.offsetWidth : "800px")
  }, [ref.current,loading]);

  function hideSpinner() {
        setLoading(true)
        console.log("loadied")
  }


  
      return (
    <>
 
        <Modal  ref={ref}   id = "transparent-modal" animationType='slide' show={prop.show} onHide={prop.onHide} >

        <iframe width="100%" height="600px" src={prop.videoId} title={prop.videoTitle ? prop.videoTitle: "" } 
                     onLoad={hideSpinner}

           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      </Modal>
 
    </>
  )
}
  
