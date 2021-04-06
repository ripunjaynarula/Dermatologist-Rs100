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
    import facebook from './img/facebook.svg'
   import linkedin from './img/linkedin.svg'
   import twitter from './img/twitter.svg'
   import achievement from './img/achievement.svg'
   import bcase from './img/case.svg'
   import building from './img/building.svg'
   import location from './img/location.svg'
   import medal from './img/medal.svg'


export default function DocProfile() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
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
  const queryString = window.location.pathname;

   useEffect(() =>{
 
 
    async function getData(){
    
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username : queryString})
      }

      let res = await fetch('http://localhost:5000/getDocDetails', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      console.log(res);
      if(!res['status']){
        history.push('/404');
      }
      else{
          setDegree(res['degree']);
          setName(res['name']);
          setEducation(res['education']);
          setExperience(res['experience']);
          setSpecialisation(res['specialisation']);
      }
    }
    getData();
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
                <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left" style={{backgroundColor:"white", marginLeft: "-50px"}}>
                    <div className="row" style = {{marginLeft : "0px", marginRight: "0px" }}>
                        <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center" style={{marginLeft:"0px",paddingRight:"0px"}}>
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
                <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section" style={{marginLeft:"34px", marginTop : "-10px"}}>
                    <div className="row profile-right-section-row" style={{display: 'block'}}>
                        <div className="profile-header" >
                            <div className="row" style={{display: 'block'}}>
                                <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left" style={{paddingLeft:"0px",paddingRight:"0px"}}>
                                    <h1 style = {{color : "black"}}>Dr. {name}</h1>
                                    <p>{degree}</p>
 <a href="https://twitter.com/#" target="_blank" rel = "noreferrer">
                    <img src = {facebook} className = "icon-mbigger" alt=""></img>
                    </a>                           
                    
                     <a href="https://twitters.com/#" target="_blank" rel = "noreferrer">
                    <img src = {linkedin} className = "icon-mbigger" alt=""></img>
                    </a> 
                    
                    <a href="https://twitters.com/#" target="_blank" rel = "noreferrer">
                    <img src = {twitter} className = "icon-mbigger" alt=""></img>
                    </a>


                                </div>
                                
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </Container>

                            
            <br/>

            <Container  className="align-items-center justify-content-center">
            <hr />
            <br/> 
            
            <h4 style = {{fontWeight : 'bold'}}>Blogs by {name}</h4>
                    <BlogList mail="mail"/>
                    <hr/>
                    <br/>
                    </Container>
            <Container id="adincon" className="align-items-center justify-content-center">                
            <h4 style = {{fontWeight : 'bold'}} >Additional Information</h4><br/><br/>

            <Row style = {{ marginLeft : "0px"}}>
  <img src = {medal} className = "icon-bigger" alt=""></img>
            <h5 id="adinf">Speciality</h5>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "6px"}}> {specialisation}</p>
            <br/>


 <Row style = {{ marginLeft : "0px"}}>
  <img src = {bcase} className = "icon-bigger" alt=""></img>
            <h5 id="adinf"> Past Experience</h5>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "6px"}}> {experience}</p>
            <br/>

          
           <Row style = {{ marginLeft : "0px"}}>
  <img src = {location} className = "icon-bigger" alt=""></img>
            <h5 id="adinf">Location</h5>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "6px"}}>{city}</p>
            <br/>



  <Row style = {{ marginLeft : "0px"}}>
  <img src = {building} className = "icon-bigger" alt=""></img>
            <h5 id="adinf">Educational Details</h5>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "6px"}}>{education}</p>
            <br/>

            
            <Row style = {{ marginLeft : "0px"}}>
  <img src = {achievement} className = "icon-bigger" alt=""></img>
            <h5 id="adinf">Professional Memberships</h5>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "6px"}}>Lorem ipsum dolor sit amet,</p>
              <br/>
     
            </Container>
            <br/>
            <br/>


                   
        </div></div>
       </>
  )
}