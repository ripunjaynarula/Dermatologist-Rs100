import React, {useRef,useEffect, useState, useContext} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "../blog/blog.css";
   import BlogCard from '../blog/blogCard'

 import DOMPurify from 'dompurify';

  import BlogList from './VideoCarousel';
 import VideoModal from '../utility/VideoModal'

 import viewSvg from '../img/visibility.svg'

import useWindowDimensions from "../../functions/windowDimensions"
 
 export default function Home() {

  const history = useHistory();
    const [error, setError] = useState("")
        const { height, width } = useWindowDimensions();


const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 1 },
  { width: 1200, itemsToShow: 4 , itemsToScroll: 1}
];


  const [loading, setLoading] = useState(false)
    ;
 
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
         body: JSON.stringify({
             limit : 15
         })

          };
        let res = await fetch('http://localhost:5000/videos', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
 

 console.log("ABABSBS")
               for(var i =0; i< res.videos.length ; i++)
              {
                                 res.videos[i].views = nFormatter(res.videos[i].views) 

              } 
              setList(res.videos)
        }else{

          console.log("anranrarnr")
               return;
        }

}
catch(e){
        //history.push('/404')
        console.log(e)
        return;
}

       setLoading(false)


  }




function nFormatter(num) {
  if(!num) return 0;
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
     {
         list.length !== 0 &&
        
    <div style = {{  backgroundColor: "#ededf2", marginTop: "56px"}}>
        <div class="section-title" style = {{paddingTop : "50px"}}>
                    <h4 id = "sec"  >From Our Doctors</h4>
                    
                </div>
  <div className = "centre-big" style = {{marginTop : "-19px"}}>
     
                    <BlogList mail="mail" blogs = {list} />

    </div>
    <br></br>
<br></br>
<br></br>
    </div>
     }
      
    </>
  );
}
  
