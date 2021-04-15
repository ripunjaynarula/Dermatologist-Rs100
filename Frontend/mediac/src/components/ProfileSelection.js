import React, { useState, useEffect } from "react"
import { Card, Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import usersvg from './img/user.svg';
import addusersvg from './img/add-group.svg';

import Modal from 'react-bootstrap/Modal'
import OtherPersonDetails from "./OtherPersonDetails"
import app from "../firebase"

export default function ProfileSelection(props) {

  
    const [error, setError] = useState("")
    const { currentUser } = useAuth()
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
 
  const [profiles, setProfiles] = useState([])
  
  const [togg, setTogg] = useState({showMenu:false});
  /*const emailRef = useRef()
  const onameRef = useRef()
  const ogenRef = useRef()
  const odobRef = useRef()
  const ocityRef = useRef()
  const relRef = useRef()*/
  const MenuVis = togg.showMenu ? 'active' : 'inactive';
  
  useEffect( () => {
    async function getProfiles() {
      if (currentUser) {
        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json','token': token },
          };
        let res = await fetch('http://localhost:5000/getProfiles', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        setProfiles(res['profiles']);
      }
    }
    getProfiles();
  }, [currentUser, setProfiles]);

  const addNewProfile = (id, name, age, gender, relation) => {
    console.log(id);
    let tempProfs = profiles;
    tempProfs.push({id: id, name: name, age: age, gender: gender, relation});
    console.log(tempProfs);
    setProfiles(tempProfs);
  }

     return (
        <div id="formbody">
          <br/>  <br/>
           <h5 style ={{marginBottom : "22px",fontWeight:"bold", marginTop : "32px"}}>Is this for you or someone else? </h5> 
          <Card id="cardbox">
            
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <div id="pf-card">
                <div id="sectionpf">
                  <div id="pf-card" className="scrollmenu">
                    <a className={props.id===-1?'active':'inactive'} key={-1} id="profile" onClick={() => {props.handleSubmit(-1, currentUser.displayName, "none", "");}}><img id="userimg" src={usersvg}/><br/>Me</a>
                    {profiles!==undefined && profiles.map(profile =>(<>
                      <a className={props.id===profile['id']?'active':'inactive'} id="profile" key={profile['id']} onClick={() => {props.handleSubmit(profile['id'], profile['name'], profile['relation'],profile['gender'], profile['age']);}}>
                        
                        <img id="userimg" src={usersvg}/>
                        
                        <br/>
                        {profile['name']}</a></>
                    ))}



                      <a  href="#" className='inactive'   id="profile" onClick={handleShow}><img id="usersvg" src={addusersvg}/><br/>Add Profile</a>

                   </div>
 
                 </div>  

              <Modal show={show} onHide={handleClose} size="lg"aria-labelledby="contained-modal-title-vcenter"centered>
       <div>
        <OtherPersonDetails setProfile={props.handleSubmit} addNewProfile={addNewProfile} close={handleClose}/>
        <br/>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
              </div>
            </Card.Body>
          </Card>
        </div>
        
    )
 
}

