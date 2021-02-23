import React, { useRef, useState, useEffect } from "react"
import { Form, Card, Alert, Button, Dropdown } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import {Texts} from "../css/Texts";
import  "./styles.css";


export default function OtherPersonForm() {

    const emailRef = useRef()
  const onameRef = useRef()
  const ogenRef = useRef()
  const odobRef = useRef()
  const ocityRef = useRef()
  const odetailsRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const handleSubmit = () => {
    console.log('form submitted');
  }

    return (
        <>
          <div id="formbody">
          <h2 className  style={Texts.Heading} >Person's Information</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group  id="oname">
                  <Form.Label style={Texts.FormLabel}>Name</Form.Label>
                  <Form.Control type="text" ref={onameRef} required />
                </Form.Group>
                <Form.Group id="odob">
                  <Form.Label style={Texts.FormLabel}>Date of Birth</Form.Label>
                  <Form.Control type="text" ref={odobRef} required />
                </Form.Group>
                <Form.Group id="ogen">
                  <Form.Label style={Texts.FormLabel}>Gender</Form.Label>
                      <select name="Gender" ref={ogenRef} id="dropdown-basic">
                      <option value="others">Rather not say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        
                </select>
                </Form.Group>
                <Form.Group id="ocity">
                  <Form.Label style={Texts.FormLabel}>City</Form.Label>
                  <Form.Control type="text" ref={ocityRef} required />
                </Form.Group>
                {/*<h2 className  style={Texts.Heading} >Details about Consultation</h2>
                <Form.Group id="odetails">
                  <Form.Label style={Texts.FormLabel}>Other Details (Additional Information):</Form.Label>
                  <Form.Control type="text" ref={odetailsRef} required />
    </Form.Group>*/}

               

               
              </Form>
              </div>
              <a href="/OtherPersonDetails">
                <p disabled={loading} className="submitbtn"  type="submit">
                    Next
                </p></a>
        </>
      )

}