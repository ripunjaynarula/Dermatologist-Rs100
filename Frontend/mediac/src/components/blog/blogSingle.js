import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
import  "../styles.css";
 import  "./blog.css";
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
   import heartSvg from '../img/heart.svg'
   import facebook from '../img/facebook.svg'
   import linkedin from '../img/linkedin.svg'
   import twitter from '../img/twitter.svg'
import heartRed from '../img/heartRed.svg'
import Navbar from '../Navbar'
 import Footer from "../footer"

 import DOMPurify from 'dompurify';

import firebase from 'firebase'
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
   import SideBar from "./sidebar"
 
export default function Home() {

        const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
 const [imageLink, setImageLink] = useState("")
const [title, setTitle] = useState("")
const [content, setContent] = useState("")
const [link, setLink] = useState("")
  const history = useHistory();
const [postId, setPostId] = useState('')
const [username, setUsername] = useState('')
const [name, setName] = useState('')
const [profileImage, setProfileImage] = useState('')
const [about, setAbout] = useState('')

const [likes, setLikes] = useState(0)
const [date, setDate] = useState("")
const [liked, setLiked] = useState(false)
const queryString = window.location.pathname;
const [htwitter, setTwitter] = useState('')
const [hfacebook, setFacebook] = useState('')
const [hlinkedin, setLinkedin] = useState('')
const [instagram, setInstagram] = useState("")


  useEffect(() => getData(), []);

 async function  getData() {
console.log(queryString)
 
if(queryString.split("/")[queryString.split("/").length - 1] === "blog")
{
  history.push('/blogs')
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
          body : JSON.stringify({url: queryString.split("/")[queryString.split("/").length - 1]})

          };
        let res = await fetch('http://localhost:5000/blog', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
            setImageLink(res.blog.image)
            setTitle(res.blog.title)
            setContent((res.blog.postData))
            setDate(res.blog.postDate.split("T")[0])
            setLikes(res.blog.likes)
            setPostId(res.blog._id);
            setLink("/blog/" + res.blog.url)
            setProfileImage(res.profileImage)
            setUsername("/doctor/"+res.username)
            setTwitter(res.twitter)
            setFacebook(res.facebook)
            setLinkedin(res.linkedin)
            setAbout(res.about)

            setName(res.name)
            setLiked(res.liked)
        }else{
            history.push('/404')
            return;
        }

}
catch(e){
//history.push('/404')
return;
}

       setLoading(false)


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
          body : JSON.stringify({blogId: postId})

          };
           console.log(JSON.stringify({blogId: postId}))
        let res = await fetch('http://localhost:5000/like-blog', requestOptions);
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








  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
 
    return (
    <>
         <div className="Navb" ><Navbar  /></div>

     <section class="breadcrumbs">
      <div class="container">

       <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li>{title}</li>
        </ol>
        <h2>{title}</h2>

      </div>
    </section>

 

<main id = "main">

<section id="blog" class="blog">
      <div class="container" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-8 entries" >

            <article class="entry entry-single">

              <div class="entry-img" style = {{  
borderTopLeftRadius : "3px", borderTopRightRadius: "3px"}}>
                <img src= {imageLink} alt=""  style = {{  
   width: "100vh",
  objectFit: "cover"}}></img>
              </div>

              <h2 class="entry-title">
                <a href={link}>{title}</a>
              </h2>

              <div class="entry-meta">
                <ul>
                  <li class="d-flex align-items-center"><img src = {userSvg} className = "icon" alt=""></img><a href={username}>{name}</a></li>
                  <li class="d-flex align-items-center"><img src = {clockSvg} className = "icon" alt=""></img><a href={username}><time datetime="2020-01-01">{date}</time></a></li>
                  
                </ul>
              </div>

              <div class="entry-content">
            
                 <div className="preview" dangerouslySetInnerHTML={createMarkup(content)}></div>

              </div>

              <div class="entry-footer">
  <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'space-between', marginRight: "1px", marginLeft: "15px"}}>
                      <a href="#" onClick={handleClick} >

       <Row style = {{flexDirection: 'row', marginLeft: "0px" }}>

<Row style = {{flexDirection: 'row',  }}>

      <img src =  {!liked ? heartSvg : heartRed} className = "icon-big" alt=""></img>
      <p style = {{fontSize : "14px", color : "#777777"}}> {likes} {text} </p>
</Row>
</Row>
        </a>
               
           </Row>            

            
              </div>

            </article>
  <div class="blog-author d-flex align-items-center">
              <img style = {{
 width: "120px",
    marginRight: "20px"

              }} src={profileImage} class=" float-left" alt="" style = {{borderRadius : "80px", height : "120px", width : "120px", marginRight : "18px"}}></img>
              <div>
                <h4>{name}</h4>
                <div class="social-links">
                  {hlinkedin && <a href={hlinkedin} target="_blank" rel = "noreferrer">
                    <img src = {linkedin} className = "icon-bigger" alt=""></img>
                    </a>}
                  {hfacebook && <a href={hfacebook} target="_blank" rel = "noreferrer">
                    <img src = {facebook} className = "icon-bigger" alt=""></img>
                    </a>}
                {htwitter &&   <a href={htwitter} target="_blank" rel = "noreferrer">
                    <img src = {twitter} className = "icon-bigger" alt=""></img>
                    </a>}

                </div>
                <p>
{about}                </p>
              </div>
            </div>


 </div>
 
 
<div class="col-lg-4">

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
  
