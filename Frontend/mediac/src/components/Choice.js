import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'

export default function Choice(){

    
 
  const userchoice = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const handleSubmit = () => {
    console.log('form submitted');
  }
    return (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Is this for you or someone else? </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <a href="/ConsultationForm" id="newconbtn">Me</a>
              <a href="/OtherPersonForm" id="newconbtn">Someone Else</a>
            </Card.Body>
          </Card>
          </>
  )

}