import React, { useRef, useState } from "react"
import { Form, Button,Row, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../css/Card";

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard")
      })
      .catch((e) => {
        console.log(e)
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  
  
  return (
    <>

          <div>
<br></br>

 <Card  >

   <Card.Title>
     
   </Card.Title>
        <Card.Body>

 

          <h5 className="text-left mb-4" style={{letterSpacing : "0"}}>Update Profile</h5>

 
          <hr></hr>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="submitbtn" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>



          </div>
     
    </>
  )
}
