import React, { useRef, useState } from "react"
import { Form, Alert, Button, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import {Texts} from "../css/Texts";
import  "./styles.css";
import app from '../firebase'



export default function OtherPersonForm(props) {

   const onameRef = useRef()
  const ogenRef = useRef()
  const odobRef = useRef()
 
  const relRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
        console.log( onameRef.current.value)
    console.log( relRef.current.value)
    console.log( ogenRef.current.value)

    console.log( odobRef.current.value)
    if (currentUser) {
        setLoading(true);
        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body: JSON.stringify({name: onameRef.current.value, gender: ogenRef.current.value, relation : relRef.current.value, age : odobRef.current.value })
        };

        let res = await fetch('http://localhost:5000/addNewProfile', requestOptions);
        res = await res.text()
        res = JSON.parse(res)
        if (res['status'] === 'saved_successfuly') {
          props.setProfile(res['id'], res['name']);
          props.addNewProfile(res['id'],res['name']);
          props.addNewAge(res['id'],odobRef.current.value)
          props.addGender(res['id'],ogenRef.current.value)
          props.setCurrentRelation(res['id'],relRef.current.value)

          props.close();
        } else {
          // display error!
          setError('Error adding profile.');
        }
        setLoading(false);
    }
  }

    return (
        <>
        <Container className=" align-items-center justify-content-center" style={{ minWidth: "100%" }}>
          <div id="oform">
          <br/>
          <h5 style={Texts.Heading} >Consult for someone else</h5>
 <br></br>
               {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group  id="oname">
                  <Form.Label style={Texts.FormLabel}>Name</Form.Label>
                  <Form.Control type="text" ref={onameRef} required />
                </Form.Group>
                <Form.Group id="user-relation">
                  <Form.Label style={Texts.FormLabel}>Relation</Form.Label>
  <select name="Relation" ref={relRef} id="dropdown-basic">
        <option style={{display:"none"}}>  </option>

                      <option value="daughter">Daughter</option>
                        <option value="son">Son</option>
                        <option value="mother">Mother</option>
                                                <option value="female">Father</option>
                        <option value="grandmother">Grandmother</option>
                        <option value="grandfather">Grandfather</option>
                        <option value="sister">Sister</option>
                        <option value="brother">Brother</option>
                        <option value="aunt">Aunt</option>
                        <option value="uncle">Uncle</option>
                                                <option value="female">Wife</option>
                        <option value="husband">Husband</option>
                        <option value="cousin">Cousin</option>

                        <option value="friend">Friend</option>

                        
                </select>                </Form.Group>
                <Form.Group id="odob">
                <Form.Label style={Texts.FormLabel}>Age</Form.Label>
              <Form.Control type="number" ref={odobRef} required />
                </Form.Group>
                <Form.Group id="ogen">
                  <Form.Label style={Texts.FormLabel}>Gender</Form.Label>
                      <select name="Gender" ref={ogenRef} id="dropdown-basic">
                                <option style={{display:"none"}}>  </option>

                        <option value="male">Male</option>
                        <option value="female">Female</option>
                                              <option value="others">Rather not say</option>

                        
                </select>
                </Form.Group>
                <br></br>
         
                <Button disabled={loading} className="submitbtn" type="submit">
                  Add Profile
                </Button>
                {/*<h2 className  style={Texts.Heading} >Details about Consultation</h2>
                <Form.Group id="odetails">
                  <Form.Label style={Texts.FormLabel}>Other Details (Additional Information):</Form.Label>
                  <Form.Control type="text" ref={odetailsRef} required /> </Form.Group>*/}
              </Form>
              </div>
              </Container>
        </>
      )

}