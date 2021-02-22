import React, { useRef, useState, useEffect } from "react"
import { Form, Card, Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import {Texts} from "../css/Texts";


export default function OtherPersonForm() {

    const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const phoneRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const handleSubmit = () => {
    console.log('form submitted');
  }

    return (
        <>
          <Card  style={CardMain} >
            <Card.Body>
             < div id="cardbox">
              <h2 className="text-center mb-4"  style={Texts.Heading} >Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group  id="name">
                  <Form.Label style={Texts.FormLabel}>Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label style={Texts.FormLabel}>Phone Number</Form.Label>
                  <Form.Control type="text" ref={phoneRef} required />
                </Form.Group>
            
                <Form.Group id="email">
                  <Form.Label style={Texts.FormLabel}>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label style={Texts.FormLabel}>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
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