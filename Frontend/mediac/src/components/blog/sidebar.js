import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
import  "../styles.css";
 import  "./blog.css";

import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "../LoginPopup"
import useWindowDimensions from "../../functions/windowDimensions"
 import { DataContext } from '../App';
export default function Home() {

  const history = useHistory();
  const handleClose = () => setShow(false);
   const [show, setShow] = useState(false);
    const {  currentUser } = useAuth();
  const quest = useRef();
  const[loading, setLoading] = useState(false)
  const [error, setError] = useState("")
    const [consultationData, setConsultationData] = useContext(DataContext);
   const dataRef = useRef();
 const[videos, setVideos] = useState([]);
 const[blogs, setBlogs] = useState([])
   const handleChange = () => {
    setConsultationData(dataRef.current.value)
    // history.push('/Choice/?ques=' + quest.current.value ) 

  } 
 async function handleShow(){
   if(!currentUser)
setShow(true)
else
 history.push('/Choice/?ques=' + quest.current.value ) 
 }











  useEffect(() => getData(), []);

 async function  getData() {
       setLoading(true)
          setError("")

try{

   
   const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'  },
          
          };
        let res = await fetch('http://localhost:5000/get-sidebar', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res, "==================")
        if(res.status === "valid")
        {
          
              for(var i =0; i< res.blogs.length ; i++)
                {
 
                  console.log(res.blogs[i].link)
                 //   res[i].blogs = "blogs/" + res[i].blogs 
                }
                  setBlogs(res.blogs)
                for(var j =0; j< res.videos.length ; j++)
                {
                    res.videos[j].link = "../video/" + res.videos[j].link 
                }
                setVideos(res.videos)
                
        }

}
catch(e){}

       setLoading(false)


  }












    return (
    <>
 
   <div class="sidebar">

               <h3 class="sidebar-title">Ask a question</h3>
              <div class="sidebar-item search-form">
           <Form.Control
                type="text"
                ref={quest}
              />    <Row style= {{paddingTop :"14px", flexDirection: 'row', justifyContent: 'flex-start', paddingBottom : "10px", marginLeft : "0px" }}>
              <div class="primaryButtonSmall"  onClick={handleShow}  >
                  <a     style = {{color : "white", fontSize : "14px", textDecoration: "none", borderRadius : "30px",}} href >Consult Now</a>
                </div>
           </Row>
             
              </div>

            
              <h3 class="sidebar-title">Recent Posts</h3>
              <div class="sidebar-item recent-posts">




                    {blogs.map(blog =>(<>
                       <div class="post-item clearfix">
                  <img src={blog.image} alt=""></img>
                  <h4><a href="blog-single.html">{blog.title}</a></h4>
                  <time datetime="2020-01-01">{blog.postDate.split("T")[0]}</time>
                </div>
                      </>
                    ))}
                
   
              
              </div> 

              
            </div> 

 
   <div class="sidebar">

           
         

            
              <h3 class="sidebar-title">Videos</h3>
              <div class="sidebar-item recent-posts">
                
            
             
                    {videos.map(blog =>(<>
                       <div class="post-item clearfix">
                  <img src={blog.thumbnail} style = {{objectFit : "cover"}} alt=""></img>
                  <h4><a href={blog.link} >{blog.title}</a></h4>
                  <time datetime="2020-01-01">{blog.postDate.split("T")[0]}</time>
                </div>
                      </>
                    ))}
                
   
              </div> 

              
            </div> 

     
        <Modal show={show} onHide={handleClose} id="nlogin">
       
       <LoginPopup question = {quest.current == null ? "" :quest.current.value }/>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
 

    </>
  )
}
  
