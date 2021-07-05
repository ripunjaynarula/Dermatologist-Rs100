import React, { useState, useEffect } from "react"
import { Card, Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import usersvg from './img/user.svg';
import addusersvg from './img/add-group.svg';
import Modal from 'react-bootstrap/Modal'
import OtherPersonDetails from "./OtherPersonDetails"
import app from "../firebase"
import Carousel from "react-elastic-carousel";
import "./styles.css"
import {  useHistory } from "react-router-dom"

export default function ProfileSelection(props) {

  
    const [error, setError] = useState("")
    const { currentUser } = useAuth()
    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 100, itemsToShow: 2 },
      { width: 368, itemsToShow: 4 },
      { width: 1200, itemsToShow: 5 },
    ];
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [currentGender, setCurrentGender] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [profiles, setProfiles] = useState([])
    const history = useHistory()

     const [phoneNumber,setPhoneNumber] = useState("");

  const [togg, setTogg] = useState({showMenu:false});
 
  const MenuVis = togg.showMenu ? 'active' : 'inactive';
  
  useEffect( () => {
    async function getProfiles() {
     try{
        if (currentUser) {
        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json','token': token },
          };
        let res = await fetch(process.env.REACT_APP_API_URL+'getProfiles', requestOptions);

 
        res = await res.text();
        res = JSON.parse(res)
           
         if(res.redirected)
        {
           history.push(res.url)
           return 
        }
         setPhoneNumber(res.phoneNumber)

        setProfiles(res['profiles']);
        setCurrentAge(res.age)
        setCurrentGender(res.gender)
        res.data.openTime = []
        var _list = res.data.time.split(",");
        for(var i =0 ; i< _list.length;i++)
        {
          var tt = _list[i].split("-")
          var start = new Date("January 1, 1970 " + tt[0])
          var end = new Date("January 1, 1970 " + tt[1])
           while(start <= end)
          {
             
            var hours = start.getHours()
            var amPm = "AM"
            if(hours > 12) {
              amPm = "PM"
              hours= hours -12
            }
            var minutes = start.getMinutes()
            if(minutes < 10) minutes = "0" + minutes 
            res.data.openTime.push(hours + ":" + minutes + " " + amPm)
             start.setTime(start.getTime() + (30 * 60 * 1000));
           }

        }
        console.log(res, "DETAIal")
        props.onLoad("s",res.gender, res.age, res.phoneNumber, res.consultationId, res.data)
      }
     }catch(e)
     {
       console.log(e)
     }


    }
    getProfiles();
  }, [currentUser, setProfiles]);

  const addNewProfile = (id, name, age, gender, relation) => {
    console.log(id);
    let tempProfs = profiles;
    tempProfs.push({id: id, name: name, age: age, gender: gender, relation});
     setProfiles(tempProfs);
  }

     return (
      <>
        <div id=" ">
          <br/>  <br/>
           <h5 style ={{marginBottom : "22px",fontWeight:"bold", marginTop : "32px"}}>Is this for you or someone else? </h5> 
          <Card  >
            
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <div id="pf-card">
                <div id="sectionpf"  style = {{paddingRight: "0px"}}>
                <Carousel id="carouselitemprof" breakPoints={breakPoints} style = {{marginRight: "0px"}}>
                  
                    <a className={props.id===-1?'active':'inactive'} key={-1} id="profile" onLoad={() => {props.handleSubmit(-1, currentUser.displayName, "none", currentGender,currentAge,phoneNumber);}} 
                    onClick={() => {props.handleSubmit(-1, currentUser.displayName, "none", currentGender,currentAge);}}
                    
                    ><img id="userimg" src={usersvg}/><br/>Me</a>

                    {profiles!==undefined && profiles.map(profile =>(<>
                      <a className={props.id===profile['id']?'active':'inactive'} id="profile" key={profile['id']} onClick={() => {props.handleSubmit(profile['id'], profile['name'], profile['relation'],profile['gender'].toLowerCase(), profile['age']);}}>
                        
                        
                        <img id="userimg" src={usersvg}/>
                        
                        <br/>
                        {profile['name']}</a>
                        </>
                    ))}



                      <a  href="#" className='inactive'   id="profile" onClick={handleShow}><img id="addusersvg" src={addusersvg}/><br/>Add Profile</a>
                      
                   </Carousel>
                 </div>  

              <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter"centered>
               <OtherPersonDetails setProfile={props.handleSubmit} addNewProfile={addNewProfile} close={handleClose}/>

      
      </Modal>
              </div>
              
            </Card.Body>
          </Card>
        </div>
        </>
    )
 
}

