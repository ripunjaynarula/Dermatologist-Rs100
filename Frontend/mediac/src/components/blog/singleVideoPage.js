import React, {useRef,useEffect, useState, useContext, Component} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
 import DOMPurify from 'dompurify';
import { useAuth } from "../../contexts/AuthContext"
 import viewSvg from '../img/visibility.svg'

import  "../styles.css";
 import  "./blog.css";
import SideBar from "./sidebar"
   import heartSvg from '../img/heart.svg'
      import heartRed from '../img/heartRed.svg'
   import Navbar from '../Navbar'
 import Footer from "../footer"

 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
import { useHistory } from 'react-router-dom'
import page404 from '../utility/page_404'
export default function Video () {
    const { currentUser,  } = useAuth()
const [postId, setPostId] = useState('')
 const [error, setError] = useState(false)
   const [width, setWidth] = useState(false)
const [loading, setLoading] = useState(false)
const [youtubeVideo, setyoutubeVideo] = useState("")
const [title, setTitle] = useState("")
const [content, setContent] = useState("")
const [link, setLink] = useState("")
  const history = useHistory();

const [views, setViews] = useState(0)
const [likes, setLikes] = useState(0)
const [date, setDate] = useState("")
const [liked, setLiked] = useState(false)
const queryString = window.location.pathname;
  
   const ref = useRef(null);

 useEffect(() => {
     function handleResize() {

       setWidth(ref.current ? ref.current.offsetWidth : 0)
    
}

    window.addEventListener('resize', handleResize)
       setWidth(ref.current ? ref.current.offsetWidth : 0)
  }, [ref.current]);


  useEffect(() => getData(), []);

 async function  getData() {

if(queryString.split("/")[queryString.split("/").length - 1] === "video")
{
  history.push('/videos')
  return;

}
   
       setLoading(true)
          setError("")
try{

  var token = null;
  if(currentUser)
  {
     token = await  currentUser.getIdToken(true)
  }
   const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
          body : JSON.stringify({videoLink: queryString.split("/")[queryString.split("/").length - 1]})

          };
        let res = await fetch(process.env.REACT_APP_API_URL+'video', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
                 setyoutubeVideo(res.video.videoLink)
        setTitle(res.video.title)
        setContent((res.video.postData))
        setDate(res.video.postDate.split("T")[0])
        setLikes(res.video.likes)
        setPostId(res.video._id);
 setLink("/video/"+res.video.link)
        setLiked(res.liked)
        setViews( nFormatter(res.video.views) )
        }else{
//history.push('/404')
return;
        }

}
catch(e){
history.push('/404')
return;
}

       setLoading(false)


  }


function nFormatter(num) {
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
     }
     return num;
}



var text = "people found this helpful"
if(likes === 0)
{
  text = ""
}
if(likes === 1)
{
  text = "person found this helpful"
}



  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
 

 
 async function handleClick(e) {
        e.preventDefault();

     if(liked) return
   setLikes(likes+1)
   setLiked(true)



          setLoading(true)
          setError("")

try{

  var token = null;
  if(currentUser)
  {
     token = await  currentUser.getIdToken(true)
  }else{


  }
   const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
          body : JSON.stringify({videoId: postId})

          };
           console.log(JSON.stringify({videoId: postId}))
        let res = await fetch(process.env.REACT_APP_API_URL+'like-video', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
         if(res.status !== "saved_successfuly")
         {
   setLikes(likes-1)
   setLiked(false)
         }
      

}
catch(e){}

       setLoading(false)



  }

   return (
    <>
     <div className="Navb" ><Navbar  /></div>

     <section class="breadcrumbs">
      <div class="container">

       <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/videos">Videos</a></li>
         </ol>
        <h2>{title}</h2>

      </div>
    </section>

 

<main id = "main">

<section id="blog" class="blog">
      <div class="container" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-8 entries" >

            <article ref={ref} class="entry entry-single">

              <div class="entry-img"  style = {{  
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
              
                <iframe  width = {width} height={width / 1.77} src={youtubeVideo} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>


                </iframe>
            
                
                
                
                
                
                
              </div>

              <h2 className="entry-title">
                <a href={link}>{title}</a>
              </h2>

              <div className="entry-meta">
                    <ul>
                  <li className="d-flex align-items-center"><img src = {viewSvg} className = "icon" alt=""></img><div className = "txt">{views}</div></li>

                   <li className="d-flex align-items-center"><img src = {clockSvg} className = "icon" alt=""></img><a ><time dateTime="2020-01-01">{date}</time></a></li>
                  
                </ul>
              </div>

              <div className="entry-content">
            
      <div className="preview" dangerouslySetInnerHTML={createMarkup(content)}></div>
              </div>

              <div clclassNameass="entry-footer">
                 <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'space-between', }}>
              <a href="#" onClick={handleClick} >
<Row style = {{flexDirection: 'row', marginLeft: "16px" }}>

     <img src = {!liked ? heartSvg : heartRed} className = "icon-big" alt=""></img>
     
     <p style = {{fontSize : "14px", color : "#777777"}}> {likes} {text} </p>
     
</Row>

     </a>
 
           </Row>     
              </div>

            </article>
 


 </div>
 
 
<div className="col-lg-4">

   <SideBar></SideBar>

          </div>
 
 
 
 
 </div>

 
 </div>
 
 
 </section>
</main>

 <Footer></Footer>
  


 

    </>
  )
 
 
}
 