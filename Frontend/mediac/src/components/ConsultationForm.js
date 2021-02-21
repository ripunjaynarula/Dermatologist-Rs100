import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'

export default function NewConsultation(){

    
  const docType = useRef()
  const info = useRef()
  const city = useRef()
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
              <div id="cardbox">
              <h2 className="text-center mb-4">Consult Us</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                
                <Form.Group id="docType">
                  <Form.Label>Type of Doctor</Form.Label>
                  <Form.Control type="text" ref={docType} required />
                </Form.Group>
                <Form.Group id="city">
                <Form.Label>City</Form.Label>
                  <Form.Control type="text" ref={city} required />
                </Form.Group>
                <Form.Group id="info">
                  <Form.Label>Additional Information (symptoms, allergies, current medication)</Form.Label>
                  <Form.Control type="text" ref={info} required />
                </Form.Group>
                
               
                <p disabled={loading} className="submitbtn" type="submit">
                    Submit
                </p>
              </Form>
              </div>
            </Card.Body>
          </Card>
          </>
  )

}