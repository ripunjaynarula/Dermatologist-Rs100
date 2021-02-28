 
import {
   CardBody,
  Col,
  Card,
  CardSubtitle,
  Container,
} from "reactstrap"
import { convertToHTML } from 'draft-convert';

 import "../../css/buttons.css";

import React, { useRef, useState, useEffect } from "react"
import {   Form, Button,   Row, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../../firebase'
import firebase from 'firebase'
// Form Editor
import { EditorState } from 'draft-js';
import {Styles} from "../../css/Styles"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import useWindowDimensions from "../../functions/windowDimensions"
//Import Breadcrumb
 function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
const FormEditors = () => {


  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { height, width } = useWindowDimensions();
 const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
 
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      var user =  await login(emailRef.current.value, passwordRef.current.value)
console.log(await user.user.getIdToken())
       setLoading(false)
      history.push("/dashboard")
     } catch(e) {
      if (e['code'] === 'auth/user-not-found' || e['code'] === "auth/wrong-password") {
        setError("Incorrect email or password")
      }
      else {
        setError("Internal error.");
      }
      setLoading(false)
    }
  }


 const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    console.log(currentContentAsHTML);
  }
console.log(width)
  return (

 
      <Container style={{ minHeight: "100vh", borderRadius : "0", minWidth: width , backgroundColor : "#ededf2"}}>
      <React.Fragment>
      <div >
        <Container fluid={true} style = {{padding : width> 1400 ?   "90px 180px":  width <1000  ? "40px 10px" : "80px 80px" }}>
          <Row>
            <Col>
              <h2><strong>Write Blog</strong></h2>
              <br></br>
              <Card>
                <CardBody>
              

                  <Form method="post">
 <Form.Group id="email" style={{paddingTop: 14}}>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Title</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Content</Form.Label>
 
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
   editorState={editorState}
        onEditorStateChange={handleEditorChange}
                      editorStyle={{ minHeight :"200px", border: "1.2px solid #ced3da", borderRadius : "4px", paddingLeft: "13px" }} 
                     />
                  </Form>
<br></br>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Content</Form.Label>

                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row style= {{paddingTop :"22px", paddingLeft : "18px", flexDirection: 'row', justifyContent: 'flex-end', paddingRight : "16px",  }}>
           

<Button disabled={loading}  type="submit"  className = "secondaryButton">
              Save as draft
            </Button>

<div style = {{width : "10px", height : "10px"}}></div>
     
   <Button disabled={loading}  type="submit" className = "primaryButton">
              Publish
            </Button>
          </Row>




        </Container>
      </div>
    </React.Fragment>
</Container>
   )
}

export default FormEditors
