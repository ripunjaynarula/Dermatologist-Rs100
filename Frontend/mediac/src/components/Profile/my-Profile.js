import React, { useState, useRef, useEffect, useContext } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Card, CardBody,Row, Col } from "reactstrap"
import { useHistory, Link } from "react-router-dom"
import "../../css/Navbar.css";
// import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import {CardMain} from "../../css/Card"
import docimgsq from '../img/docsq.svg';
import docimg from '../img/doc.jpeg'
import  "../styles.css";
import Navbar from "../Navbar"
import BlogList from "../BlogList"
import { BiNotepad, BiBriefcaseAlt,BiLocationPlus,BiBuilding } from "react-icons/bi";
    import facebook from '../img/facebook.svg'
   import linkedin from '../img/linkedin.svg'
   import twitter from '../img/twitter.svg'
   import achievement from '../img/achievement.svg'
   import bcase from '../img/case.svg'
   import building from '../img/building.svg'
   import location from '../img/location.svg'
   import medal from '../img/medal.svg'
import Videos from "../AboutPage/loadVodeosHorizontal"

import useWindowDimensions from "../../functions/windowDimensions"

export default function DocProfile() {
    const {  currentUser } = useAuth()

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
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
  const { height, width } = useWindowDimensions();
   const [about, setAbout] = useState('');
    const [membership, setMembership] = useState('');
    const [facebookc, setFacebook] = useState('');
    const [linkedinc, setLinkeding] = useState('');
        const [isLoading, setIsLoaing] = useState(true);

    const [twitterc, setTwitter] = useState('');
   const [profile, setProfile] = useState('');
   const [cover, setCover] = useState('');
   const [list, setList] = useState([]);
    const [yearsOfExp, setYearsOfExp] = useState([]);
  const [medicalNumber, setMedicalNumber] = useState("") 
  const [clinicName, setClinicName] = useState("") 
  const [expertise, setExpertise] = useState("") 
  const [research, setResearch] = useState("") 
  const [videoList, setVideoList] = useState("") 

 

   useEffect(() =>{
 
 
  
    getData();
  }, [])
  async function getData(){
    
    if(!currentUser)
        return history.replace("/login")

           const token = await currentUser.getIdToken(true)

      const requestOptions = {
        method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
        body: JSON.stringify({})
      }

     try{
 let res = await fetch(process.env.REACT_APP_API_URL+'my-profile', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      console.log(res);
      if(!res['status']){
        history.push('/404');
      }
      else{
        if(res.blogs)
        {
              for(var i =0; i<res.blogs.length  ; i++)
          {
              res.blogs[i].url = "/blog/" + res.blogs[i].url
          } 
        }

          console.log(res.blogs)     
        setVideoList(res.videos)

          setList(res.blogs)
          res = res.data

          setDegree(res['degree']);
          setName(res['name']);
          setEducation(res['education']);
          setExperience(res['pastExperience']);
          setSpecialisation(res['specialisation']);
          setFacebook(res["fb"])
          setLinkeding(res.linkedin)
          setCity(res.city)
          setTwitter(res.twitter)
          setCover(res.coverImage)
          setAbout(res.about)
          setProfile(res.profileImage)
          setYearsOfExp(res.graduationYear)
            setMembership(res.awards)
                 setIsLoaing(false)
                       setMedicalNumber(res.medicalNumber)
        setClinicName(res.clinicName)
        setExpertise(res.expertise)
        setResearch(res.research)

      }
     }catch(e){
     return   history.push('/404');

     }

     setIsLoaing(false)
    }
  return (
    <>
    <div className="Navb"><Navbar /></div>
    {!isLoading&& <>
    
    
       <div style={{backgroundColor:"white"}}>
        <div style={{backgroundColor:"white"}}>
            <div  id="profcover">
               <div id = "round" >
                    {cover && <img id="coverimg" src={cover}/>}
               </div>
            </div>

            {width> 680 ? <>
            
            
            <Container className="d-flex align-items-center justify-content-center">
                <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left" >
                    <div className="row" style = {{marginLeft : "0px", marginRight: "0px" }}>
                        <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center" style={{marginLeft:"0px",paddingRight:"0px"}}>
                            {profile ? <img className="dp" src={profile}/>
                            :
                            <img className="dp" src={docimgsq}/>
                            
                            }
                        </div>
                     
                     
                    </div>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section"  >
                    <div className="row profile-right-section-row" style={{display: 'block'}}>
                        <div className="profile-header" >
                            <div className="row" style={{display: 'block'}}>
                                <div className="col-md-10 col-sm-11 col-xs-6 profile-header-section1 pull-left" style={{paddingRight:"0px"}}>
                                    <h1 style = {{color : "black", fontSize : "24px", fontWeight:"600"  }}>Dr. {name}</h1>
                                     <p style = {{marginBottom : "0px", color : width>=1200 && 'black', marginTop : width>=1200 && '2px'}}>{specialisation}</p>
                                    {width > 680 && <p style = {{fontSize: "14px", fontFamily : "work sans", color : "#0000009b"}}>{yearsOfExp && yearsOfExp!==0 &&yearsOfExp + " years of experience" }</p>}  

{facebookc &&  <a href={facebookc} target="_blank" rel="noreferrer noopener" >
                    <img src = {facebook} className = "icon-mbigger" alt=""></img>
                    </a>       }                    
                    
                    {
                        linkedinc &&  <a href="https://twitters.com/#" target="_blank" rel = "noreferrer">
                    <img src = {linkedin} className = "icon-mbigger" alt=""></img>
                    </a> 
                    }
                    
                    {
                        twitterc &&
                        <a href="https://twitters.com/#" target="_blank" rel = "noreferrer">
                    <img src = {twitter} className = "icon-mbigger" alt=""></img>
                    </a>
                    }


                                </div>
                                
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </Container>

            </> : <>
            
            
            
                 <div className="centre">
                <div className="col-md-1" style={{marginLeft:"-3px", textAlign: "center", marginBottom:"8px"}}>
                            {profile ? <img className="dp" src={profile}/>
                            :
                            <img className="dp" src={docimgsq}/>
                            
                            }

                        </div>

                <h1 style = {{color : "black", fontSize : "24px", fontWeight:"600" , margin:"auto", textAlign:"center" }}>Dr. {name}</h1>


             <p style = {{marginBottom : "5px" , marginTop :  '2px', textAlign:"center"}}>{specialisation}</p>

   { <p style = {{fontSize: "16px", fontFamily : "work sans", color : "#0000009b",  textAlign:"center"}}>{yearsOfExp && yearsOfExp!==0 &&yearsOfExp + " years of experience" }</p>}  

                <div className="col-md-1" style={{  textAlign: "center", marginBottom:"16px"}}>

<div className="col-md-1" style = {{  display:"inline-block",     }}>


    {facebookc &&  <a href={facebookc} target="_blank" rel="noreferrer noopener" >
                    <img src = {facebook} className = "icon-mbigger" alt=""></img>
                    </a>       }                    
                    
                    {
                        linkedinc &&  <a href={linkedinc} target="_blank" rel = "noreferrer">
                    <img src = {linkedin} className = "icon-mbigger" alt=""></img>
                    </a> 
                    }
                    
                    {
                        twitterc &&
                        <a href={twitterc} target="_blank" rel = "noreferrer">
                    <img src = {twitter} className = "icon-mbigger" alt=""></img>
                    </a>
                    }
</div>

</div>

            </div>

            
            
            </>}                            

            <Container  className="align-items-center justify-content-center">
     <div class="section-title" style = {{paddingTop : "10px"}}>
                    <h4 id = "sec"  > About </h4>
                    
                </div><p style = {{color: "#000000ab", fontFamily:"work sans"}}>
    {about}
</p>
<br></br>
  
               <br></br>
                                  </Container>

                                             <div style = {{ backgroundColor: "#ededf2", paddingTop: "25px", paddingBottom:"50px", marginBottom:"20px"}}>
<br></br>
                   <BlogList mail="mail" blogs = {list} name = {name} />
</div>

                   
                    
            <Container id="adincon"  className="align-items-center justify-content-center">                
          
                                                  <br/>
                 
               <div class="section-title" style = {{paddingTop : "10px"}}>
                    <h4 id = "sec"  > Additional Information </h4>
                    
                </div>
            
            
            <br/><br/>

            <Row style = {{ marginLeft : "0px"}}>
  <img src = {medal} className = "icon-small" alt=""></img>
            <h6 id="adinf">Speciality</h6>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "2px",color: "#000000ab",    lineHeight: "1.3", fontFamily:"work sans"}}> {specialisation}</p>
            <br/>


 <Row style = {{ marginLeft : "0px"}}>
  <img src = {bcase} className = "icon-small" alt=""></img>
            <h6 id="adinf"> Past Experience</h6>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "-1.6px",color: "#000000ab", fontFamily:"work sans", whiteSpace: "pre-line",   lineHeight: "1.3"}}> {experience}</p>
            <br/>

          
           <Row style = {{ marginLeft : "0px"}}>
  <img src = {location} className = "icon-small" alt=""></img>
            <h6 id="adinf">Location</h6>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "2px",color: "#000000ab", fontFamily:"work sans"}}>{city}</p>
            <br/>



{education && <>

<Row style = {{ marginLeft : "0px"}}>
  <img src = {building} className = "icon-small" alt=""></img>
            <h6 id="adinf">Educational Details</h6>

            </Row>
            <p style={{marginLeft: "31px", marginTop: "-1.6px",color: "#000000ab", fontFamily:"work sans" , whiteSpace: "pre-line",   lineHeight: "1.3"}}>{education}</p>
            <br/>
</>}


            
            <Row style = {{ marginLeft : "0px"}}>
  <img src = {achievement} className = "icon-small" alt=""></img>
            <h6 id="adinf">Achievements</h6>

            </Row>
            <p style={{marginLeft: "30px", marginTop: "-1.6px",color: "#000000ab", fontFamily:"work sans", whiteSpace: "pre-line",   lineHeight: "1.3"

}}>{membership}</p>
              <br/>
     


{expertise && <>

          <Row style = {{ marginLeft : "0px", marginTop:"-21px"}}>
  <img src = {achievement} className = "icon-small" alt=""></img>
            <h6 id="adinf">Expertise</h6>

            </Row>
            <p style={{marginLeft: "30px", marginTop: "-1.6px",color: "#000000ab", fontFamily:"work sans", whiteSpace: "pre-line",   lineHeight: "1.3"

}}>{expertise}</p>
              <br/>

</>}
{research && <>

          <Row style = {{ marginLeft : "0px" }}>
  <img src = {achievement} className = "icon-small" alt=""></img>
            <h6 id="adinf">Research</h6>

            </Row>
            <p style={{marginLeft: "30px", marginTop: "-1.6px",color: "#000000ab", fontFamily:"work sans", whiteSpace: "pre-line",   lineHeight: "1.3"

}}>{research}</p>
              <br/>

</>}
            </Container>
            <br/>
            <br/>


                   
        </div>
        
        
        <Videos videos = {videoList} name = {name}></Videos>
        
        </div>

    
    
    </>}




        </>
  )
}