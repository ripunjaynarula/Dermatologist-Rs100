import React, { useState, useEffect } from "react"
import { Card, Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import app from "../firebase"
import usersvg from './img/user.svg';
import Modal from 'react-bootstrap/Modal'
import OtherPersonDetails from "./OtherPersonDetails"

export default function ProfileSelection(props) {

 
    const [error, setError] = useState("")
    const { currentUser } = useAuth()
    const [profiles, setProfiles] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
  const [name, setname] = useState('');
  const [title, setTitle] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [docMail, setDocMail] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [active, setActive] = useState(false);
  const [togg, setTogg] = useState({showMenu:false});
  /*const emailRef = useRef()
  const onameRef = useRef()
  const ogenRef = useRef()
  const odobRef = useRef()
  const ocityRef = useRef()
  const relRef = useRef()*/
  const MenuVis = togg.showMenu ? 'active' : 'inactive';

 const toggleMenu = () => {
    setTogg({
      showMenu: !togg.showMenu
    })
  }

  


  
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
            setProfiles(res['profiles']);
          }
        }
        getProfiles();
      }, [currentUser, setProfiles])


    return (
        <div>
          <br/>  <br/>
           <h2 className="text-center mb-4">Is this for you or someone else? </h2>
            <Card id="formbody">
            
            <Card.Body>
             
              {error && <Alert variant="danger">{error}</Alert>}
              
              <div id="pf-card" >
                <div id="sectionpf">
                  <div id="pf-card" className="scrollmenu">
                  <a className={MenuVis} id="profile" onClick={() => {props.handleSubmit(-1, 'You')}}><img id="usersvg" src={usersvg}/><br/>Me</a>
                  {profiles.map(profile =>(<>
                    <a className={MenuVis} id="profile" key={profile['id']} onClick={() => {props.handleSubmit(profile['id'], profile['name'])}} onClick={toggleMenu}><img id="usersvg" src={usersvg}/><br/>
                       {profile['name']}</a></>
                  ))}
                  </div>
                 
                  <a href="#" className="addpfbtn" onClick={handleShow}>+</a>
                  </div>

              <Modal show={show} onHide={handleClose} size="lg"aria-labelledby="contained-modal-title-vcenter"centered>
       <div>
        <OtherPersonDetails setProfile={props.handleSubmit}/>
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

