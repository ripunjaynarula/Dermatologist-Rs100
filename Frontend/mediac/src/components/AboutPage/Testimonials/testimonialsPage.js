import React, {  useState, useEffect  } from "react";
import {   Row,  Col ,Button} from "react-bootstrap"
import { useHistory } from 'react-router-dom'
   import { useAuth } from "../../../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "../../LoginPopup"
 
  import useWindowDimensions from "../../../functions/windowDimensions"
 import {BeforeAfter} from "./beforeAfter";
  import {Testimonials} from "./testimonialsList";

import Navbar from '../../Navbar'
     import Footer from "../../footer"

 export default function Home() {
   const history = useHistory();
 
    const {  currentUser } = useAuth();
  const handleClose = () => setShow(false);
   const [show, setShow] = useState(false);
  
       const { height, width } = useWindowDimensions();

  useEffect(() => getData(), []);
 


 async function handleShow(){
   if(!currentUser)
setShow(true)
else
 history.push('/Choice/?ques='  ) 
 }



 async function  getData() {

 
  
 

  }


 

 

    return (
    <>



    
        <div className="Navb" ><Navbar  /></div>

 

    <section  className="">
            <div className = "centre"  >

<br></br>
<br></br>
 <div class="section-title" >
                    <h4 id = "sec"  >Our Expertise</h4>
                    
                </div>
 

   <Row style = {{marginTop:"-25px"}}>


  {BeforeAfter.map((data, index) => (
          

<>
{
    fBeforeAfter(data.name, data.age, data.before, data.after)

}
<div  ></div>
</>

          ))}
    
   

   </Row>

</div>

<div className="consult-banner">

<div className = "container">

<Row>
    <Col xs = {7} md = {7}>


<div style = {{marginTop:width<469 && "26px"}} >
    {width>460 && <h5>Goodbye doubts </h5>}
<h3> Consult an expert dermatologist at Rs.100 </h3>
</div>


    </Col>


        <Col xs = {3} md = {4}>


<div style = {{marginTop:width<560? "28px":"9px", }}>
       <div class="primaryButtonLight"   onClick={handleShow}    >
                  <a     style = {{color : "white",   textDecoration: "none",}} href >Consult Now</a>
                </div>
</div>

        </Col>

</Row>

</div>

</div>

 <br></br>


 <div className = "centre">
  <div class="section-title" >
                    <h4 id = "sec"  >A Word From Our Patients</h4>
                    
                </div>
 
 <Row  style = {{marginTop:"-25px"}}>



  {Testimonials.map((data, index) => (
          

testimonial(data.name, data.age, data.review, data.image, data.socialMedia)


          ))}
    
    
 </Row>
 
 
            </div>




    </section>
     <Footer></Footer>
    
    </>
  )




  function testimonial(name , age, review, image, socialMedia){
      return <>

        <Col xs={width > 597 ? 6:12} md={width > 1199 ? 4 :6}  >
              <div style = {{padding:"28px"}}>


         <div className="testimonials" style = {{backgroundColor:"white"}}  >
        <img className= "full" src= {image} alt=""  
  
        

   ></img>
    
        

{

(name ||age) &&
    <>
    
    
                   <div  style = {{marginTop: "14px",  marginBottom: "10px", marginLeft:  "18px" }}  >
<Row style = {{marginLeft:"2px"}}>
    <h5 ><b>  {name}
              </b> 
              </h5>{
               age&&  <>
                  <h5 className= "age">{age}</h5>
                  </>
              }
</Row>


              </div>
 
        
    
    </>



}
 
<div style = {{marginBottom:"20px"}}>
    <p>
        {review}
    </p>
</div>


              </div>
    
</div>
          </Col >

       
      </>
  }


  function fBeforeAfter(name , age, before, after){
      return <>
      
        <Col xs={width > 597 ? 6:12} md={width > 1199 ? 4 :6}  >
 

       <div  style = {{padding:"28px",}}>

             <div className="testimonials" style = {{backgroundColor:"white"}}  >
        <img className= "left" src= {process.env.REACT_APP_CDN_URL + before} alt=""  style = {{ borderBottomLeftRadius: (!(name || age)) ? "10px":"0px"   }}
  
        

   ></img>
      <img src= {process.env.REACT_APP_CDN_URL +after} className = "right" alt="" style = {{ borderBottomRightRadius: (!(name || age)) ? "10px":"0px"   }}
  
        

   ></img>
        

{

(name ||age) &&
    <>
    
    
                   <div  style = {{marginTop: "14px",  marginBottom: "10px", marginLeft:  "18px" }}  >
<Row style = {{marginLeft:"2px"}}>
    <h5 ><b>  {name}
              </b> 
              </h5>{
               age&&  <>
             <h5 className= "age">{age}</h5>
                  </>
              }
</Row>


              </div>
 
        
    
    </>
}


              </div>
    
       </div>

          </Col >

      
              <Modal show={show} onHide={handleClose} id="nlogin">
       
       <LoginPopup onClick={handleClose} question = {"" }/>
 
      </Modal>
      </>
  }
}
  
