import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import app from "../firebase"

export default function ProfileSelection() {

 
    const userchoice = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const history = useHistory()

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
      }, [currentUser])


    return (
        <div>
            <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Is this for you or someone else? </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <p style={{marginLeft:'47%'}} id="newconbtn">Me</p><br/><br/>
              <p style={{ fontWeight: 'bold', position: 'relative', marginLeft:'50%', fontSize:'large'}}>OR</p>
              {/* <p id="newconbtn">Someone Else</p> */}
              {profiles.map(profile =>(
                  <p className="newconbtn" key={profile['id']}>{profile['name']} {profile['id']}</p>
              ))}
            </Card.Body>
          </Card>
        </div>
    )
}

