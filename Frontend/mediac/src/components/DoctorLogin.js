import React, { useRef, useState, useEffect, useContext } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import {Texts} from "../css/Texts";
import { DocMailContext } from './App'
import Navbar from "./Navbar"
export default function DoctorLogin() {
  const demailRef = useRef()
  const dpasswordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [docMail, setDocMail] = useContext(DocMailContext);
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({email: demailRef.current.value, pass: dpasswordRef.current.value})
    };
    let res = await fetch('http://localhost:5000/doctorLogin', requestOptions);
    res = await res.text();
    res = JSON.parse(res)
    if (res['status'] === 'logged_in'){
      setDocMail(demailRef.current.value)
      setLoading(false);
      history.push('/DocProfile')
    }
  }

  return (


    <>
     <div className="Navb"><Navbar /></div>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card style={{CardMain},{ maxWidth: "400px" } } >
        <Card.Body>

          <h2 className="text-center mb-4" style = {Texts.Heading}>Doctor Login</h2>
          <hr></hr>       
     {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{paddingTop: 14}}>
              <Form.Label style = {Texts.FormLabel}>Doctor's Email</Form.Label>
              <Form.Control type="email" ref={demailRef} required />
            </Form.Group>

            <Form.Group id="password"  style={{paddingBottom: 22}}>
              <Form.Label  style = {Texts.FormLabel}>Password</Form.Label>
              <Form.Control type="password" ref={dpasswordRef} required />
            </Form.Group>

            <Button disabled={loading} className="submitbtn" type="submit">
              Log In as Doctor
            </Button>
            {/* <p className="submitbtn" type="submit">Login</p> */}
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      </Container>
    </>
  )
}
