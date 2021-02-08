import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'

export default function Signup() {
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const dobRef = useRef()
  const phoneRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailRef.current.value, name: nameRef.current.value, dob: dobRef.current.value, phone: phoneRef.current.value })
        };
      let res = await fetch('http://localhost:5000/patientSignup', requestOptions)
      res = await res.text()
      res = JSON.parse(res)
      if (res['status'] !== 'verification_mail_sent') {
        setError('Technical Error');
        return;
      }
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      await signup(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      history.push("/verification-sent")
    } catch (e) {
      setError("Failed to create an account")
      setLoading(false)
      console.log(e)
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" ref={phoneRef} required />
            </Form.Group>
            <Form.Group id="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" ref={dobRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
