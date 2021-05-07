import React, { useEffect, useState,  } from "react";
import {   Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
  import  "../blog/blog.css";
 
 
  import VideoModal from '../utility/VideoModal'

 
import useWindowDimensions from "../../functions/windowDimensions"
 
 export default function Home() {

  const history = useHistory();
    const [error, setError] = useState("")
const [limit, setLimit] = useState(0)
const [showMore, setShowMore] = useState(false)
       const { height, width } = useWindowDimensions();
  const [videoLink, setLink] = useState ("")

    const [show, setShow] = useState(false);

   const openVideo = (e) => {
     console.log(e)
    setLink(e + "?autoplay=1")
    setShow(true)
 
  };
  const closeVideo = () => {
    
    setShow(false)
 
  };



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
             limit : 16
         })

          };
        let res = await fetch(process.env.REACT_APP_API_URL+'videos', requestOptions);
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





   useEffect( () => {

    var items = 3;

    
    if(width> 1199) {
      
      items = 4
      setLimit(7)
    }else if(width < 768){
      items = 2
      setLimit(3)
    }else{
      setLimit(5)
    } 
  }, [width] )
  
  const handleClick =(e)=>{
    e.preventDefault()
      setShowMore(!showMore)
}
 





    return (
    <>
     {
         list.length !== 0 &&
        
    <div style = {{  backgroundColor: "#ededf2", marginTop: "56px"}}>
        <div class="section-title" style = {{paddingTop : "50px"}}>
                    <h4 id = "sec"  >From Our Doctors</h4>
                    
                </div>
  <div className = "centre-big"  >
     
   <Row>


                      { getBlog()
          
          }
               </Row>
  <div class="text-center" >
            <a href="#" onClick = {handleClick} class="view-more">{showMore ?`Show Less`: `Show More`}</a>
                            </div>
    </div>
    <br></br>
 <br></br>
    </div>
    
     }
            <VideoModal show = {show} onHide = {closeVideo} videoId = {videoLink}></VideoModal>

    </>
  );


  function getBlog(){

 
    return  list.map((blog, i) =>{

if(!showMore)
if(i>limit)
  return <></> ;

return (<>
       
     <Col xs={6} md={width > 1199 ? 3 : 4} >

      <a className= "title" href ="#"   onClick  = {(e) => {
                            e.preventDefault()
                            openVideo(blog.videoLink)
                        }}>

 <div className="videocard"  >
           <img  src= {blog.thumbnail} alt="" style = {{  
 height :    "100%", 
  objectFit: "cover"}}
  
           

   ></img>
   <a href="#" class="play-btn mb-4" onClick  = {(e) => {
                            e.preventDefault()
                            openVideo(blog.videoLink)
                        }} ></a>


              </div>
               <div  style = {{marginTop: "-13px", marginBottom: "28px", marginLeft: width> 790 ? "11px":"4px"}}  >
<h5 style={{color:"black", fontSize:"18px"}} ><b>                {blog.title}
              </b>
              </h5>
              </div>

      </a>

           
             
 

          </Col >

          </>)

    })
  }
  
}
  
