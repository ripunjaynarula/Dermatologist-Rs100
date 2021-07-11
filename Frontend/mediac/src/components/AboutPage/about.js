
import React, {useRef,useEffect, useState, useContext,useLayoutEffect} from "react";
import { Form,Container, Card,Button, Alert, Row, Col } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 import Footer from "../footer"
  import  "./about.css";
 import userSvg from '../img/person.svg'
   import clockSvg from '../img/clock.svg'
  import Gallery from './gallery'
 import DOMPurify from 'dompurify';
 import {reactLocalStorage} from 'reactjs-localstorage';

import Navbar from '../Navbar' 
import { auth } from '../../firebase'
import { useAuth } from "../../contexts/AuthContext"
import VideoModal from '../utility/VideoModal'
import useWindowDimensions from "../../functions/windowDimensions"
import Modal from "react-bootstrap/Modal";
import LoginPopup from "../LoginPopup";
import { DataContext } from '../App';
export default function Home() {

  const history = useHistory();
  const handleClose = () => setShowLogin(false);
  const [flag, setFlag] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("")
    const [showLogin, setShowLogin] = useState(false);

  const [loading, setLoading] = useState(false)
  const [consultationData, setConsultationData] = useContext(DataContext);
  const { height, width } = useWindowDimensions();
  const [videoLink, setLink] = useState ("")
    const [show, setShow] = useState(false);

   const openVideo = (e) => {
    setLink(e)
    setShow(true)
 
  };
  const closeVideo = () => {
    
    setShow(false)
 
  };


 
 useLayoutEffect(() => {
    window.scrollTo(0, 0, {duration:0})
});



const title = "Better Doctors.";
var style = {};
 console.log(width)
 
if(width > 870) style = {
  flex : "40"
}

    document.body.style.backgroundColor = "#ffffff";



 
  const handleShow = (e) => {
e.preventDefault()
 if(!currentUser) {
      setShowLogin(true)

     return
 }
  var role =  reactLocalStorage.get('role') 
 
  if(role === undefined) role  = "";
 
  
  if(role ==="doctor"){
       return history.replace('/doctordashboard');
    }
  
      history.push("/consult/" );

      
  }




    return (

        
    <>



     

        <div className="Navb" ><Navbar  /></div>
 
   

 <section id="hero" class="d-flex align-items-center">
        <div class="container">
            <h1>Skin & Laser Center</h1>
            <h2>Expert consultation at ₹100 only</h2>
            <a href="#about" class="btn-get-started scrollto" onClick = {handleShow}>Consult Now</a>
        </div>
    </section>


<main id = "main" >
 <section id="why-us" class="why-us">
            <div class="container">

                <div class="row">
                    <div class="col-lg-4 d-flex align-items-stretch">
                        <div class="content">
                            <h3>Our mission
</h3>
                            <p>
                                We work on a single goal of giving the best to our patients. With this view, our constant effort is to make people look good and feel happy by enhancing their skin and make them free from the burden of skin diseases and that too at an affordable price.
                            </p>
                            <div class="text-center">
                                <a href="#about" class="more-btn">Learn More </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 d-flex align-items-stretch">
                        <div class="icon-boxes d-flex flex-column justify-content-center">
                            <div class="row">
                                <div class="col-xl-4 d-flex align-items-stretch">
                                    <div class="icon-box mt-4 mt-xl-0">
                                        <i class="bx bx-receipt"></i>
                                        <img src = {process.env.REACT_APP_CDN_URL+"images/block.svg"} height = "60px"></img>

                                        <h4>Confidential</h4>
                                        <p>Your privacy is important - we won't share your information with anyone</p>
                                    </div>
                                </div>
                                <div class="col-xl-4 d-flex align-items-stretch">
                                    <div class="icon-box mt-4 mt-xl-0">
                                        <img src = {process.env.REACT_APP_CDN_URL+"images/future.svg"} height = "60px"></img>
                                         <h4  >Fast Response</h4>
                                        <p>Fill out a form within 5 minutes. Get a treatment plan within 24 hours</p>
                                    </div>
                                </div>
                                <div class="col-xl-4 d-flex align-items-stretch">
                                    <div class="icon-box mt-4 mt-xl-0">
                                        <img src = {process.env.REACT_APP_CDN_URL+"images/doctor.svg"} height = "60px"></img>
                                        <h4>Experts</h4>
                                        <p>Our dermatologists are all qualified, experienced post-graduates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

            </div>
        </section>


       <section id="about" class="about">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-xl-5 col-lg-6 image-box d-flex justify-content-center align-items-stretch position-relative">
                        <img src = "https://d3pxd5vsj7zayf.cloudfront.net/images/clinic-gallery1.jpg" style = {{   backgroundSize: "cover",height: "100%"}}></img>

                        <a href="#" class="glightbox play-btn mb-4" onClick  = {(e) => {
                            e.preventDefault()
                            openVideo("https://www.youtube.com/embed/LJIyvR-QcnU?autoplay=1")
                        }} ></a>
                    </div>

                    <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
                        <h3>Sanstuti Pharmaceuticals</h3>
                        <p>
                            Sanstuti Pharmaceuticals is a quality derma care initiative which has been made with a vision of providing the best of derma care products. The company believes in providing the best yet affordable products. The company gains its confidence from its innovative production lines, continuous Research & Development, strict quality control and strong marketing support.
 
                        </p>

                         <h4 class="title">How we are economical?</h4>
                            <p class="description">
On an average 150 patients consult our clinic daily and we are No.1 in conducting all the advance procedures with best in class laser and technology. Our strong network and connect with people helps us in offering the best services at very economical rates as compared to other renowned clinics in Delhi.</p>
                    
                <h4 class="title">Our strength</h4>
                            <p class="description">
                                
                                Skin n laser centre is equipped with all types of high Quality lasers like Light Sheer Diode Laser, Acupulse Fractional Co2 laser (from Lumenis USA), Q Switch ND Yag laser. Other facilities like chemical peels, Hydra facial, Glutathione fairness injections, UVA/UVB therapy, Lavatron RF, Viora reaction, Derma roller, P.R.P therapy, vitiligo surgeries and hair transplant are also available.

A team of expert dermatologist and therapist work here with a primary goal which is to serve you with the best service.
                            </p>
         
                    </div>
                </div>

            </div>
        </section>


 


<div>



     <section id="gallery" style = {{marginTop : "-43px"}} >
       
       
 
 <div class="section-title" >
                    <h4 id = "sec"  >Clinic Gallery</h4>
                    
                </div>
      <div className = "centre-bigg" style = {{marginTop : "-19px"}}>
        <Gallery></Gallery>
      </div>
       
       
               </section>


</div>


  
  

</main>
   <Footer></Footer>
<VideoModal show = {show} onHide = {closeVideo} videoId = {videoLink}></VideoModal>
  
        <Modal show={showLogin} onHide={handleClose} id="nlogin">
       
       <LoginPopup onClick={handleClose}/>
 
      </Modal>
    </>
  )
}
  
