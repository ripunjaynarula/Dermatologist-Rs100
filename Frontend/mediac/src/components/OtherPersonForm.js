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
  const onameRef = useRef()
  const relRef = useRef()
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
              <h2 className="text-center mb-4"  style={Texts.Heading} >Person's Information</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group  id="oname">
                  <Form.Label style={Texts.FormLabel}>Name</Form.Label>
                  <Form.Control type="text" ref={onameRef} required />
                </Form.Group>
                <Form.Group id="user-relation">
                  <Form.Label style={Texts.FormLabel}>Relation</Form.Label>
                  <Form.Control type="text" ref={relRef} required />
                </Form.Group>
            
                <a href="/OtherPersonDetails">
                <p disabled={loading} className="submitbtn"  type="submit">
                    Next
                </p></a>
              </Form>
              </div>
            </Card.Body>
          </Card>
      
         
        </>
      )

}