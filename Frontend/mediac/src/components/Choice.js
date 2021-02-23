import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import app from "../firebase"

export default function Choice(){

    
 
  const userchoice = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const history = useHistory()

  useEffect( () => {
    async function getProfiles() {
      if (currentUser) {
        console.log("Hello")
        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json','token': token },
          };
        let res = await fetch('http://localhost:5000/getProfiles', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
      }
    }
    getProfiles();
  }, [currentUser, history])

  const handleSubmit = () => {
    console.log('form submitted');
  }
    return (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Is this for you or someone else? </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <a style={{marginLeft:'47%'}} href="/ConsultationForm" id="newconbtn">Me</a><br/><br/>
              <p style={{ fontWeight: 'bold', position: 'relative', marginLeft:'50%', fontSize:'large'}}>OR</p>
              <a href="/OtherPersonForm" id="newconbtn">Someone Else</a>
            </Card.Body>
          </Card>
          </>
  )

}