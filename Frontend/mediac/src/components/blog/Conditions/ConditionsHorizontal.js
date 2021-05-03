 import React, {useRef,useEffect, useState, useContext} from "react";
 
  import useWindowDimensions from "../../../functions/windowDimensions"

  
 import {   Row, Col  } from "react-bootstrap"

 
   import {conditions} from "./ConditionsList"
 
export default function Home() {
 
const [limit, setLimit] = useState(0)
const [showMore, setShowMore] = useState(false)
       const { height, width } = useWindowDimensions();

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
    return (
    <>
               <Row>


                      { getBlog()
          
          }
               </Row>
  <div class="text-center" style = {{marginTop: "-12px"}}>
            <a href="#" onClick = {handleClick} class="view-more">{showMore ?`Show Less`: `Show More`}</a>
                            </div>

    </>
  )



  function getBlog(){

 
    return  conditions.map((blog, i) =>{

if(!showMore)
if(i>limit)
  return <></> ;

return (<>
       
     <Col xs={4} md={width > 1199 ? 3 : 4} >

      <a className= "title" href = {blog.url}>

 <div className="conditions-nav"  >
           <img src= {blog.image} alt="" style = {{  
 height :    "100%", 
  objectFit: "cover"}}
  
        

   ></img>
              </div>
               <div  style = {{marginTop: "-13px", marginBottom: "28px", marginLeft: width> 790 ? "11px":"4px"}}  >
<h5 style={{color:"black", fontSize:"18px"}}><b>              <a className ="title" href = {blog.url}>  {blog.title}</a>
              </b>
              </h5>
              </div>

      </a>

           
             
 

          </Col >

          </>)

    })
  }
}
  
