import React, { useState, useEffect } from "react"
import { Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import app from "../firebase"
import personfill from './img/personfill.svg';


export default function ProfileSelection(props) {

 
    const [error, setError] = useState("")
    const { currentUser } = useAuth()

    const [profiles, setProfiles] = useState([])

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
              
              
              <div id="pf-card" className="scrollmenu">
              <Card id="profile" >Me<img id="personfill" ></img></Card>
              
              {profiles.map(profile =>(<>
                <Card id="profile" key={profile['id']}>
                   <p key={profile['id']} onClick={() => {props.handleSubmit(profile['id'], profile['name'])}}> {profile['name']}<img id="personfill" ></img></p></Card><br/></>
              ))}
              </div>
            </Card.Body>
          </Card>
        </div>
    )
}

