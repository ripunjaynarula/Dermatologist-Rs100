 import React, {useEffect, useState,  } from "react";
 import { useHistory } from 'react-router-dom'
 
import  "../../styles.css";
 import  "../blog.css";
 
import Navbar from '../../Navbar'
     import Footer from "../../footer"

 import DOMPurify from 'dompurify';

    import SideBar from "../sidebar"

   import {conditions} from "./ConditionsList"
import SEO from '../../utility/seo'
import { Helmet } from "react-helmet";

export default function Home() {
  const history = useHistory();

 const [title, setTitle] = useState("")
const [content, setContent] = useState("")
const [link, setLink] = useState("")
 const [imageLink, setImageLink] = useState("")
const [alt, setAlt] = useState("")
const [imgTitle, setImgTitle] = useState("")


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


for(var i =0; i< conditions.length; i++)
{
    if(page === conditions[i].url )
    {
           setLink(conditions[i].url)
   setContent(conditions[i].body)
   setImageLink(conditions[i].image)
   setTitle(conditions[i].title)
    setAlt(conditions[i].alt)
    setImgTitle(conditions[i].imageTitle)
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

            <Helmet>
                <title>App Title</title>
                <link rel="canonical" href="https://malikgabroun.com" />
                            <meta name="description" content="Nested component" />
 
            </Helmet>
 

   <main>


           <div className="Navb" ><Navbar  /></div>

     <section class="breadcrumbs">
      <div class="container">

       <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/conditions">Conditions</a></li>
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
                <img src= {imageLink} alt={alt} title = {imgTitle}  style = {{  
   width: "100vh",
  objectFit: "cover"}}></img>
              </div>

              <h2 class="entry-title">
                <a href={link}>{title}</a>
              </h2>

              

              <div class="entry-content">
            
                 <div className="preview" dangerouslySetInnerHTML={createMarkup(content)}></div>

              </div>

           
            </article>
 
 </div>
 
 
<div class="col-lg-4">

             <SideBar condition = {true}></SideBar>
          </div>
 
 
 
 
 </div>

 
 </div>
 
 
 </section>
</main>

<Footer></Footer>
   </main>

 

    </>
  )
}
  
