import React, { useRef, useState } from "react"
import { Form, Alert, Button, Dropdown } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import {Texts} from "../css/Texts";
import  "./styles.css";
import app from '../firebase'



export default function OtherPersonForm(props) {

  const emailRef = useRef()
  const onameRef = useRef()
  const ogenRef = useRef()
  const odobRef = useRef()
  const ocityRef = useRef()
  const relRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body: JSON.stringify({name: onameRef.current.value, dob: odobRef.current.value, gender: ogenRef.current.value})
        };

        let res = await fetch('http://localhost:5000/addNewProfile', requestOptions);
        res = await res.text()
        res = JSON.parse(res)
        if (res['status'] === 'saved_successfuly') {
          props.setProfile(res['id'])
        } else {
          // display error!
        }
    }
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
                <Form.Group id="user-relation">
                  <Form.Label style={Texts.FormLabel}>Relation</Form.Label>
                  <Form.Control type="text" ref={relRef} required />
                </Form.Group>
                <Form.Group id="odob">
                <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" ref={odobRef} required />
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
                <Button disabled={loading} className="submitbtn" type="submit">
                  Add Profile
                </Button>
                {/*<h2 className  style={Texts.Heading} >Details about Consultation</h2>
                <Form.Group id="odetails">
                  <Form.Label style={Texts.FormLabel}>Other Details (Additional Information):</Form.Label>
                  <Form.Control type="text" ref={odetailsRef} required /> </Form.Group>*/}
              </Form>
              </div>
        </>
      )

}