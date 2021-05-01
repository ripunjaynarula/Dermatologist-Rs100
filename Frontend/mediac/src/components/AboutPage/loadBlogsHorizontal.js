import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "../blog/blog.css";
   import BlogCard from '../blog/blogCard'

 import DOMPurify from 'dompurify';

import useWindowDimensions from "../../functions/windowDimensions"
 import BlogList from '../BlogList';

 export default function Home() {

  const history = useHistory();
    const [error, setError] = useState("")
  
  const [loading, setLoading] = useState(false)
    ;
  const { height, width } = useWindowDimensions();

 var style = {};
  
if(width > 870) style = {
  flex : "40"
}






    const [list, setList] = useState([])


  

  useEffect(() => getData(), []);
 



 async function  getData() {

 
 
   
       setLoading(true)
          setError("")
try{

     
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
 
          };
        let res = await fetch(process.env.REACT_APP_API_URL+'blogs-limit', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
 
               for(var i =0; i< res.blogs.length ; i++)
              {
                 res.blogs[i].postDate =  res.blogs[i].postDate.split("T")[0]
                                  res.blogs[i].url =  "/blog/" + res.blogs[i].url

              } 
              setList(res.blogs)
        }else{

          console.log("anranrarnr")
               return;
        }

}
catch(e){
        //history.push('/404')
        return;
}

       setLoading(false)


  }














    return (
    <>

        {list.length !== 0 &&
        
            <div>
        <div class="section-title" style = {{paddingTop : "70px"}}>
                    <h4 id = "sec"  > Articles</h4>
                    
                </div>
  <div className = "centre" style = {{marginTop : "-19px"}}>
     
                    <BlogList mail="mail" blogs = {list} />

    </div>
    </div>
        }

    </>
  )
}
  
