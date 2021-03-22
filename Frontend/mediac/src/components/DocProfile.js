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
import usersvg from './img/user.svg';
import Navbar from "./Navbar"

import {DocMailContext} from './App';

export default function DocProfile() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const dbinfo = useRef()
  const history = useHistory()
  const quest = useRef()
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [specialisation, setSpecialisation] = useState('');

 


  return (
    <>
    <div className="Navb"><Navbar /></div>
    <div style={{backgroundColor:"white"}}>
        <div className="row"style={{backgroundColor:"white"}}>
            <div className="col-md-12 col-sm-12 col-xs-12 image-section" id="profcover">
                <img id="coverimg" src={docimg}/>
            </div>
            <div className="row user-left-part"style={{backgroundColor:"white"}}>
                <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left" style={{backgroundColor:"white"}}>
                    <div className="row ">
                        <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
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
                <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
                    <div className="row profile-right-section-row">
                        <div className="col-md-12 profile-header">
                            <div className="row">
                                <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                                    <h1>Dr. Mario Mendez</h1>
                                    <p>Senior Surgeon</p>
                            <a href="#" id="socmed" className="fa fa-facebook"></a>  
                            <a href="#" id="socmed" className="fa fa-twitter"></a>  
                            <a href="#" id="socmed" className="fa fa-linkedin"></a> <br/><br/>
                                </div>
                                
                                <div className="col-md-4 col-sm-6 col-xs-6 profile-header-section1 text-right pull-rigth">
                                    {/* <button className=" primaryButton btn btn-primary"style={{margin:"auto",width:"7%",textAlign:"center"}}> CONSULT</button>                           */}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div><div className="col-md-12">
                            <div className="border"></div>
                            <h4>Posts by Doctor</h4>
                            <div className="row">
                                <div className="  profile-tag-section text-center" style={{width:"100%"}}>
                                    <div className="row">
                                        <div className="col-md-3 col-sm-3 profile-tag">
                                            <a href="#"><i className="fa fa-calendar-check-o" aria-hidden="true"></i></a>
                                            <p>info</p>
                                        </div>
                                        <div className="col-md-3 col-sm-3 profile-tag">
                                            <a href="#"><i className="fa fa-address-book" aria-hidden="true"></i></a>
                                            <p>feed</p>
                                        </div>
                                        <div className="col-md-3 col-sm-3 profile-tag">
                                            <a href="#"><i className="fa fa-id-card-o" aria-hidden="true"></i></a>
                                            <p>Agenda</p>
                                        </div>
                                        <div className="col-md-3 col-sm-3 profile-tag">
                                            <a href="#"><i className="fa fa-paperclip" aria-hidden="true"></i></a>
                                            <p>Resume</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
        </div></div>
       </>
  )
}