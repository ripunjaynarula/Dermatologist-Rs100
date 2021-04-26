import React, {  useState, useEffect  } from "react";
import {   Row,   } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
   import  "./blog.css";
 
 import VideoComponent from "./blogCardSmall"
 
 
import Navbar from '../Header'
 import { useAuth } from "../../contexts/AuthContext"
   
 export default function Home() {
  const history = useHistory();
    const { login, currentUser } = useAuth();
   const [error, setError] = useState("")
  
  const [loading, setLoading] = useState(false)
 
    const [list, setList] = useState([])


  

  useEffect(() => getData(), []);
 



 async function  getData() {

 
     document.body.style.backgroundColor = "#ededf2";

   
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
        let res = await fetch('http://localhost:5000/my-blogs', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
 
              for(var i =0; i< res.blogs.length ; i++)
              {
                                  res.blogs[i].views = nFormatter(res.blogs[i].views) 
res.blogs[i].postDate = res.blogs[i].postDate.split("T")[0]
            }

              setList(res.blogs)
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


 
 const removeFromList = (e) => {
          list.splice(e, 1);
         console.log(list)
         setList(list)

  
  };
 



    return (
    <>
<Navbar  />
    

    <section  className="blog">
            <div className = "container"  style = {{marginTop : "70px"}} >

 

   <Row>


  {list.map((data, index) => (
              <VideoComponent title = {data.title} image = {data.image} 
    publishDate = {data.postDate} removeFromList = {() => removeFromList(index)}  type = "blog"  views  = {data.views} videoLink = {'/blog/'+ data.url} isPrivate = "true" id = {data._id} >


    </VideoComponent>
          ))}
    
   
    
   </Row>
 
 
 
 
 
            </div>




    </section>
     
    
    </>
  )
}
  
