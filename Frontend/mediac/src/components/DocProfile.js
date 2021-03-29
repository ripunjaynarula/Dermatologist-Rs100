import React, { useState, useRef, useEffect, useContext } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Card, CardBody,Row, Col } from "reactstrap"
import { useHistory, Link } from "react-router-dom"
import "../css/Navbar.css";
// import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import {CardMain} from "../css/Card"
import docimgsq from './img/docsq.jpeg';
import docimg from './img/doc.jpeg'
import  "./styles.css";
import Navbar from "./Navbar"
import BlogList from "./BlogList"
import { BiNotepad, BiBriefcaseAlt,BiLocationPlus,BiBuilding } from "react-icons/bi";
import {DocMailContext} from './App';

export default function DocProfile() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [docMail, setDocMail] = useContext(DocMailContext);
  const { currentUser, logout } = useAuth()
  const dbinfo = useRef()
  const history = useHistory()
  const quest = useRef()
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [city, setCity] = useState('');
  
  
  useEffect(() =>{
    if (!currentUser) {
        history.push('/login');
        return
    }
    if (currentUser.role !== 'doctor'){
        history.push('/dashboard')
    }
    async function checkLogin(){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email: currentUser.email})
      }

      let res = await fetch('http://localhost:5000/getDocDetails', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      console.log(res);
      if(!res['status']){
        history.push('/login');
      }
      else{
          setDegree(res['degree']);
          setName(res['name']);
          setEducation(res['education']);
          setExperience(res['experience']);
          setSpecialisation(res['specialisation']);
      }
    }
    checkLogin();
  }, [])

  return (
    <>
    <div className="Navb"><Navbar /></div>
    <div style={{backgroundColor:"white"}}>
        <div style={{backgroundColor:"white"}}>
            <div  id="profcover">
                <img id="coverimg" src={docimg}/>
            </div>

            <Container className="d-flex align-items-center justify-content-center">
                <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left" style={{backgroundColor:"white"}}>
                    <div className="row ">
                        <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center" style={{paddingLeft:"0px",paddingRight:"0px"}}>
                            <img className="dp" src={docimgsq}/>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
 
                        </div>
                        <div className="row user-detail-row">
                            <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                            {/* <div className="border"></div> */}
                                {/* <p>FOLLOWER</p>
                                <span>320</span> */}
                            </div>
                            <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                                {/* <div className="border"></div> */}
                                {/* <p>FOLLOWING</p>
                                <span>147</span> */}
                            </div>
                        </div>
                        <div className="col-md-12 user-detail-section2">
                            {/* <div className="border"></div> */}
                            {/* <p>PERFORMANCE</p>
                            <span>56 <small>and 42 review</small></span> */}
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section" style={{marginLeft:"10%"}}>
                    <div className="row profile-right-section-row" style={{display: 'block'}}>
                        <div className=" profile-header" >
                            <div className="row" style={{display: 'block'}}>
                                <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left" style={{paddingLeft:"0px",paddingRight:"0px"}}>
                                    <h1>Dr. {name}</h1>
                                    <p>{degree}</p>
                            <a href="#" id="socmed" className="fa fa-facebook"></a>  
                            <a href="#" id="socmed" className="fa fa-twitter"></a>  
                            <a href="#" id="socmed" className="fa fa-linkedin"></a> <br/><br/>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </Container>

                            
            <br/>

            <Container  className="align-items-center justify-content-center">
            <hr/>
            <br/> 
            
            <h4>Blogs Posted by the Doctor</h4>
                    <BlogList mail={docMail}/>
                    <hr/>
                    <br/>
                    </Container>
            <Container id="adincon" className="align-items-center justify-content-center">                
            <h3 id="adinf">Additional Information</h3><br/><br/>

            <h5 id="adinf"><BiNotepad style={{marginRight: "5px"}}/>Speciality</h5>
            <p>{specialisation}</p>
            <br/>

            <h5 id="adinf"><BiBriefcaseAlt style={{marginRight: "5px"}}/>Past Experience</h5>
            <p>{experience}</p>
            <br/>

            <h5 id="adinf"><BiLocationPlus style={{marginRight: "5px"}}/>Location</h5>
            <p>{city}</p>
            <br/>

            <h5 id="adinf"><BiBuilding style={{marginRight: "5px"}}/>Educational Details</h5>
            <p>{education}</p>
            <br/>

            <h5 id="adinf"><BiBuilding style={{marginRight: "5px"}}/>Professional Memberships</h5>
            <p>Lorem ipsum dolor sit amet,</p>
            <p> consectetur adipiscing elit.</p>
            <p> Curabitur luctus nunc aliquet congue ultricies. </p>
            <br/>
     
            </Container>
            <br/>
            <br/>


                   
        </div></div>
       </>
  )
}