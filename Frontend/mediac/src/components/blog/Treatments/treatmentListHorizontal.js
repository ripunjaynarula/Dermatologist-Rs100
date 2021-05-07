 import React, {useRef,useEffect, useState, useContext} from "react";
 
  import useWindowDimensions from "../../../functions/windowDimensions"

  
 import {   Row, Col  } from "react-bootstrap"

 
   import {TreatmentList} from "./treatmentList"
 
export default function Home() {
 
const [limit, setLimit] = useState(0)
const [showMore, setShowMore] = useState(false)
       const { height, width } = useWindowDimensions();

   useEffect( () => {

    var items = 3;

    if(width<768)
    {
        items = 3;
        setLimit(5)
    } else if(width> 1199) {
      
      items = 6
      setLimit(11)
    }else{
      setLimit(7)
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
  <div class="text-center" >
            <a href="#" onClick = {handleClick} class="view-more">{showMore ?`Show Less`: `Show More`}</a>
                            </div>

    </>
  )



  function getBlog(){

 
    return  TreatmentList.map((blog, i) =>{

 if(i>=16) return <></>;


if(!showMore)
if(i>limit)
  return <></> ;

return (<>
       
     <Col xs={4} md={width > 1199 ? 2 : 3} >

      <a className= "title" href = {blog.url} >

 <div className="conditions-nav" style = {{marginBottom:"40px"}} >
           <img src= {blog.image} alt="" style = {{  
 height :    "100%", boxShadow: "0px 2px 5px 0px #0000003f",
  objectFit: "cover"}}
  
        

   ></img>
              </div>
               <div  style = {{marginTop: "-28px", marginBottom: "28px", marginLeft: width> 790 ? "11px":"4px"}}  >
<h5 style={{color:"black", fontSize:"16px"}}><b>             <a className = "title" href = {blog.url}>


       {blog.title}
</a>
              </b>
              </h5>
              </div>

      </a>

           
             
 

          </Col >

          </>)

    })
  }
}
  
