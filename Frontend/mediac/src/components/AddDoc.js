import React, { useRef,useEffect, useState, useContext } from "react"
import { Form, Button,Row,Container,Col,  Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../css/Card";
import useWindowDimensions from "../functions/windowDimensions"
import {Texts} from "../css/Texts";
import {TokenContext} from './App';

function AddDoc() {

    const emailRef = useRef()
    const [token, setToken] = useContext(TokenContext);
    const passwordRef = useRef()
    const nameRef = useRef()
    const phoneRef = useRef()
    const genderRef = useRef()
    const dobRef = useRef()
    const fbRef = useRef()
    const linkedinRef = useRef()

    const degreeRef = useRef()
    const eduRef = useRef()
    const graduationRef = useRef()
    const usernameRef = useRef()
    const awardsRef = useRef()
    const pastExpRef = useRef()
    const specializatoinRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
  
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [file, setFile] = useState("");
    const [picture, setPicture] = useState(null);
    const { height, width } = useWindowDimensions();
  
   
  
   
   const [name, setName] = useState("")
  
   const [gender, setGender] = useState("")
   const [dob, setDob] = useState("")
   const [phone, setPhone] = useState("") 
    const [degree, setDegree] = useState("") 
   const [education, setEducation] = useState("") 
   const [special, setSpecial] = useState("") 
   const [graduation, setGraduation] = useState("") 
    const [username, setUsername] = useState("") 
    const [pastExp, setPastExp] = useState("") 
    const [awards, setawards] = useState("") 

    async function handleSubmit(e) {}
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();

 };

  useEffect(() =>{
    console.log(token);
  })
    return (
        <>
    
              <div>
    <br></br>
    
    <Container  style={{    paddingTop: '20px', }}>
    
    
     <Card style = {CardMain} >
    
       <Card.Title>
         
       </Card.Title>
            <Card.Body>
    
     
    
              <h5 className="text-left mb-4" style={{letterSpacing : "0"}}>Doctor Signup</h5>
    
     
              <hr></hr>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
    
    
              
              <Form onSubmit={handleSubmit}>
                <Row >
    
    <Col sm>
    <Row  style ={{paddingLeft : "22px" , flexDirection: 'row',  display: "flex", alignItems : "center",   }}>
      <img  width="90" height="90" src={picture} alt="" style = {{borderRadius : "50%", objectFit : "cover" }} /> 
     
     <div style ={{width : "20px"}}></div>
     
              <Button disabled={loading} variant="link" style = {{padding: "0px", height : "30px"}} onClick={handleClick}>Add Image</Button>
    
     <input type="file"  name="myImage" style={{display:'none'}} ref={hiddenFileInput} />
    
    
    </Row>
     
    
    </Col>
    
    <Col sm>
    
    <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    required
                    // defaultValue={currentUser.name}
                  />
                </Form.Group>
    
    </Col>
    
    
    
    
    
                </Row>
    
    
                <hr style = {{}}></hr>
     
    
     <Row>
    
    <Col sm>    <Form.Group id="email">
                  <Form.Label style = {Texts.FormLabel}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                             
                    ref={emailRef}
                  />
                </Form.Group></Col>
    
    <Col sm>   
     <Form.Group id="phone-number">
                  <Form.Label style = {Texts.FormLabel}>Phone number</Form.Label>
                  <Form.Control
                    type="text"
                    ref={phoneRef}
                  />
                </Form.Group></Col>
    
     </Row>
    
    
    
    
     <Row>
    
    <Col sm>    <Form.Group id="gender">
                  <Form.Label style = {Texts.FormLabel}>Gender</Form.Label>
                      <select name="Gender" ref={genderRef} id="dropdown-basic">
                                             <option style={{display:"none"}}>  </option>
    {gender === "Male" ? <option value="Male" selected >Male</option> :  <option value="male"  >Male</option>}
                           
                           {gender === "Female" ?  <option value="Female" selected>Female</option>:  <option value="female">Female</option>}
    
     {gender === "Rather not say" ?                                             <option value="Rather not say" selected>Rather not say</option>
    :
                                                <option value="Rather not say">Rather not say</option>
    }                       
      
                            
                    </select>
                </Form.Group></Col>
    
    <Col sm>   
     <Form.Group id="dob">
                  <Form.Label style = {Texts.FormLabel}>Date of birth</Form.Label>
                  <Form.Control
                    type="date"
                    ref={dobRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group></Col>
    
     </Row>
    
    
                <hr style = {{}}></hr>
    
    
     <Row>
    
    <Col sm>    <Form.Group id="degree">
                  <Form.Label style = {Texts.FormLabel}>Degree</Form.Label>
                     <Form.Control
                    type="text"
                    ref={dobRef}
                   />
                </Form.Group></Col>
    
    <Col sm>   
     <Form.Group id="education">
                  <Form.Label style = {Texts.FormLabel}>Education</Form.Label>
                  <Form.Control
                    type="text"
                    ref={dobRef}
                   />
                </Form.Group></Col>
    
     </Row>
    
     <Row>
    
    <Col sm>    <Form.Group id="graduationYear">
                  <Form.Label style = {Texts.FormLabel}>Graduation Year</Form.Label>
                     <Form.Control
                    type="text"
                    ref={dobRef}
                   />
                </Form.Group></Col>
    
    <Col sm>   
    
     <Form.Group id="username">
                  <Form.Label style = {Texts.FormLabel}>Specialisation</Form.Label>
                  <Form.Control
                    type="text"
                    ref={dobRef}
                   />
                </Form.Group></Col>
    
     </Row>
    
    <Row>
    <Col sm>    <Form.Group id="linkedinlink">
                  <Form.Label style = {Texts.FormLabel}>Linkedin Profile Link</Form.Label>
                     <Form.Control
                    type="url"
                    ref={linkedinRef}
                   />
                </Form.Group></Col>
    
    <Col sm>      <Form.Group id="facebooklink">
                  <Form.Label style = {Texts.FormLabel}>Facebook Profile Link</Form.Label>
                     <Form.Control
                    type="url"
                    ref={fbRef}
                   />
                </Form.Group></Col>
    </Row>
     <Row>
    
     
    
    <Col sm>   
     <Form.Group id="username">
                  <Form.Label style = {Texts.FormLabel}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    ref={dobRef}
                   />
                </Form.Group></Col>
    
     </Row>
    <hr></hr>
    
     <Row>
    
    <Col sm>    <Form.Group id="graduationYear">
                  <Form.Label style = {Texts.FormLabel}>Past Experience</Form.Label>
                     <textarea             className="form-control"
     name="comments" style={{width: '100%', 
      
      }} rows="3"></textarea>
    
                </Form.Group></Col>
    
     
     
    
     </Row>
    <Row>
    
    <Col sm>    <Form.Group id="graduationYear">
                  <Form.Label style = {Texts.FormLabel}>Awards</Form.Label>
                     <textarea             className="form-control"
     name="comments" style={{width: '100%', 
     
      }} rows="3"></textarea>
    
                </Form.Group></Col>
    
     
     
    
     </Row>
    
    
    
    
    
    
    
    
    
    
    
              <br></br>
            
              </Form>
            </Card.Body>
          </Card>
          
         
          
          <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "15px" }}>
               
          
    
    <Button disabled={loading}   className = "secondaryButton" onClick= {() =>        history.push('/')} >
    Cancel            </Button>
    
    <div style = {{width : "10px", height : "10px"}}></div>
    
    
       <Button disabled={loading} style={{height : "42px" }}  type="submit" className = "primaryButton" onClick= {handleSubmit}>
    Signup            </Button>
              </Row>
    
    
    
    </Container>
    
    <br></br>
    <br></br>
    
              </div>
         
        </>
      )
}

export default AddDoc
