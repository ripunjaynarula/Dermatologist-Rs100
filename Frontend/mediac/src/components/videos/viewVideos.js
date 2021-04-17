import React, {  useState, useEffect  } from "react";
import {   Row,   } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
   import  "../blog/blog.css";
 
 import VideoComponent from "./videoComponent"
  import InfiniteScroll from 'react-infinite-scroll-component';

 
import Navbar from '../Navbar'
 import { useAuth } from "../../contexts/AuthContext"
   
 export default function Home() {
    document.body.style.backgroundColor = "#ededf2";
  const history = useHistory();
    const { login, currentUser } = useAuth();
   const [error, setError] = useState("")
  
  const [loading, setLoading] = useState(false)
 
    const [list, setList] = useState([])


  

  useEffect(() => getData(), []);
 



 async function  getData() {

 
 
   
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
 
          };
        let res = await fetch('http://localhost:5000/videos', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
 
              for(var i =0; i< res.videos.length ; i++)
              {
                res.videos[i].views = nFormatter(res.videos[i].views) 
              }

              setList(res.videos)
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



 async function  fetchData() {

 
 
   
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
 
          };
        let res = await fetch('http://localhost:5000/videos', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
 
              for(var i =0; i< res.videos.length ; i++)
              {
                res.videos.views = nFormatter(res.videos.views) 
                list.push(res.videos[i])
              }

              setList(list)
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




    return (
    <>
        <div className="Navb" ><Navbar  /></div>

     <section className="breadcrumbs">
      <div className="container">

        <ol>
          <li><a href="/">Home</a></li>
          <li>Videos</li>
        </ol>
 
      </div>
    </section>

    <section  className="blog">
            <div className = "container"  >

 

   <Row>


  {list.map((data, index) => (
              <VideoComponent title = {data.title} image = {data.thumbnail} 
    publishDate = {data.postDate}     views  = {data.views} videoLink = {data.link} isPrivate = "false" videoId = {data.videoId} >


    </VideoComponent>
          ))}
    
   
    
   </Row>
 
 
 
 
 
            </div>




    </section>
     
    
    </>
  )
}
  
