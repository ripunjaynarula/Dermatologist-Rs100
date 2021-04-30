import React, {  useState, useEffect  } from "react";
import {   Row,   } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
  
 
 import VideoComponent from "../../videos/videoComponent"
 import {conditions} from "./ConditionsList";
 
import Navbar from '../../Navbar'
     import Footer from "../../footer"

 export default function Home() {
    document.body.style.backgroundColor = "#ededf2";
  const history = useHistory();
 

  

  useEffect(() => getData(), []);
 



 async function  getData() {

 
 
   
  try{

    

}
catch(e){
        //history.push('/404')
        return;
}

 

  }


 

 

    return (
    <>



    
        <div className="Navb" ><Navbar  /></div>

     <section className="breadcrumbs">
      <div className="container">

        <ol>
          <li><a href="/">Home</a></li>
          <li>Conditions</li>
        </ol>
                <h2>Conditions we treat</h2>

 
      </div>
    </section>

    <section  className="blog">
            <div className = "container"  >

 

   <Row>


  {conditions.map((data, index) => (
              <VideoComponent title = {data.title} image = {data.image} 
    publishDate = {""}     views  = {""} videoLink = {"/" + data.url} isPrivate = "false" videoId = {""} hideBottom = "yes" >


    </VideoComponent>
          ))}
    
   
    
   </Row>
 
 
 
 
 
            </div>




    </section>
     <Footer></Footer>
    
    </>
  )
}
  
