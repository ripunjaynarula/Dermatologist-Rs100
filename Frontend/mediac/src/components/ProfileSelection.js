import React, { useState, useEffect } from "react"
import { Card, Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import app from "../firebase"
import personfill from './img/personfill.svg';
import Modal from 'react-bootstrap/Modal'
import OtherPersonDetails from './OtherPersonDetails';

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
  /*const emailRef = useRef()
  const onameRef = useRef()
  const ogenRef = useRef()
  const odobRef = useRef()
  const ocityRef = useRef()
  const relRef = useRef()*/
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
            <Card id="formbody">
            <Card.Body>
              <h2 className="text-center mb-4">Is this for you or someone else? </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <div id="pf-card" >
              <div id="pf-card" className="scrollmenu">
              <Card id="profile" onClick={() => {props.handleSubmit(-1, 'You')}}>Me<img id="personfill" ></img></Card>
              {profiles.map(profile =>(<>
                <Card id="profile" key={profile['id']} onClick={() => {props.handleSubmit(profile['id'], profile['name'])}}>
                   <p> {profile['name']}<img id="personfill" ></img></p></Card><br/></>
              ))}
              </div>
              <a href="#" class="addpfbtn" onClick={handleShow}>+</a>
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

