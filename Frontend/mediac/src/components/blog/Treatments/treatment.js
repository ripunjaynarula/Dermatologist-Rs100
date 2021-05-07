import React, {useEffect,useRef, useState} from "react";
import { useHistory } from 'react-router-dom'
import  "../../styles.css";
import  "../blog.css";
import Navbar from '../../Navbar'
import DOMPurify from 'dompurify';
import SideBar from "../sidebar"
import {TreatmentList} from "./treatmentList"
      import Footer from "../../footer"

export default function Home() {
  const history = useHistory();

 const [title, setTitle] = useState("")
const [content, setContent] = useState("")
const [link, setLink] = useState("")
 const [imageLink, setImageLink] = useState("")
const [alt, setAlt] = useState("")
const [imgTitle, setImgTitle] = useState("")
const [videos, setVideos] = useState([])
     const ref = useRef(null);

   const [width, setWidth] = useState(false)

 useEffect(() => {
     function handleResize() {

       setWidth(ref.current ? ref.current.offsetWidth  : 0)
    
}

    window.addEventListener('resize', handleResize)
       setWidth(ref.current ? ref.current.offsetWidth  : 0)
  }, [ref.current]);

  const queryString = window.location.pathname;
 


  useEffect(() => getData(), []);

  async function  getData() {
    console.log(queryString.split("/")[queryString.split("/").length - 1])
    
    if(queryString.split("/")[queryString.split("/").length - 1] === "blog")
    {
    history.push('/blogs')
    return;

    }

    var page = queryString.split("/")[queryString.split("/").length - 1];


    for(var i =0; i< TreatmentList.length; i++)
    {
        if(page === TreatmentList[i].url )
        {
                
            setLink(TreatmentList[i].url)
            setContent(TreatmentList[i].body)
            setImageLink(TreatmentList[i].image)
            setTitle(TreatmentList[i].title)
            setAlt(TreatmentList[i].alt)
            setImgTitle(TreatmentList[i].imageTitle)
            setVideos(TreatmentList[i].videos)
        }
    }   
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
          <li><a href="/treatments">Treatments</a></li>
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
               {/* {imageLink &&  <img src= {imageLink} alt={alt} title = {imgTitle}  style = {{  
   width: "100vh",
  objectFit: "cover"}}></img>} */}
              </div>

              <h2 class="entry-title">
                <a href={link}>{title}</a>
              </h2>

         
              <div class="entry-content" ref={ref}>
            
                 <div className="preview" dangerouslySetInnerHTML={createMarkup(content[0])}></div>

{
  videos.length >=1 &&           <iframe  width = {width} height={width / 1.77} src={videos[0]} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

}
{
  content.length >=2 &&    <div className="preview" dangerouslySetInnerHTML={createMarkup(content[1])}></div>
}
{
  videos.length >2 &&           <iframe  width = {width} height={width / 1.77} src={videos[1]} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

}
{
  content.length >3 &&    <div className="preview" dangerouslySetInnerHTML={createMarkup(content[2])}></div>
}


              </div>

           
            </article>
 
 </div>
 
 
<div class="col-lg-4">

             <SideBar condition = {true} treatment = "up"></SideBar>
          </div>
 
 
 
 
 </div>

 
 </div>
 
 
 </section>
</main>
 <Footer></Footer>


 

    </>
  )
}
  
