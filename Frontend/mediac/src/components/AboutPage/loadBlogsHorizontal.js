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
 
const [limit, setLimit] = useState(0)
const [showMore, setShowMore] = useState(false)
 
   useEffect( () => {

    var items = 3;

    
    if(width> 1199) {
      
      items = 4
      setLimit(7)
    }else{
      setLimit(5)
    } 
  }, [width] )
  
  const handleClick =(e)=>{
    e.preventDefault()
      setShowMore(!showMore)
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
        <div class="section-title" style = {{paddingTop : "40px"}}>
                    <h4 id = "sec"  > Articles</h4>
                    
                </div>
  <div className = "centre" style = {{marginTop : "-19px"}}>
     
       <Row>


                      { getBlog()
          
          }
               </Row>
  <div class="text-center" style = {{marginTop: "-12px"}}>
            <a href="#" onClick = {handleClick} class="view-more">{showMore ?`Show Less`: `Show More`}</a>
                            </div>
    </div>
    </div>
        }

    </>
  )







  
  function getBlog(){

 
    return  list.map((blog, i) =>{

if(!showMore)
if(i>limit)
  return <></> ;

return (<>
       
     <Col xs={6} md={width > 1199 ? 3 : 4} >

      <a className= "title" href = {blog.url}>

 <div className="videocard"  >
           <img src= {blog.image} alt="" style = {{  
 height :    "100%", 
  objectFit: "cover"}}
  
        

   ></img>
              </div>
               <div  style = {{marginTop: "-13px", marginBottom: "28px", marginLeft: width> 790 ? "11px":"4px"}}  >
<h5 style={{color:"black", fontSize: width> 790? "16px" : "14px"}}><b>              <a className ="title" href = {blog.url}>  {blog.title}</a>
              </b>
              </h5>
              </div>

      </a>

           
             
 

          </Col >

          </>)

    })
  }
}
  
