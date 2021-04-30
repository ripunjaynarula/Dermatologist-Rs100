import React, { useRef, useState, useEffect, useContext } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import Navbar from "./Navbar"
import {Texts} from "../css/Texts";
import {TokenContext} from './App'

function AdminLogin() {

    const emailRef = useRef()
    const [token, setToken] = useContext(TokenContext);
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
      e.preventDefault();
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email: emailRef.current.value, pass: passwordRef.current.value})
      }

      let res = await fetch(process.env.REACT_APP_API_URL+'adminLogin', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      if(!res['status']){
        history.push('/adminlogin');
      }
      else{
        setToken(res['secret']);
        history.push('/AddDoc');
      }
    }

    return (
        <div>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
      
      <Card style={{CardMain},{ maxWidth: "400px" }}  >
<Card.Title>

</Card.Title>
        <Card.Body>

          <h2 className="text-center mb-4" style = {Texts.Heading}>Admin Log In</h2>

<hr></hr>       
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{paddingTop: 14}}>
              <Form.Label style = {Texts.FormLabel}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password"  style={{paddingBottom: 22}}>
              <Form.Label  style = {Texts.FormLabel}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="submitbtn" type="submit">
              Log In
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
          </div>
        </Card.Body>
      
      <div className="w-100 text-center mt-2">
      </div><br/>
      </Card>
      
      </Container>
        </div>
    )
}

export default AdminLogin

