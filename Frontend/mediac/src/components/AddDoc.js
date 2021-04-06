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
    const { signup, currentUser } = useAuth()
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
    const specializationRef = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
  
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [file, setFile] = useState("");
    const [picture, setPicture] = useState(null);
    const { height, width } = useWindowDimensions();
  
   
  
   
   const [name, setName] = useState("")
  
   const [gender, setGender] = useState("")


      const onChangePicture = e => {
    if (e.target.files && e.target.files[0]){
           setPicture(URL.createObjectURL(e.target.files[0]) );
      setFile(e.target.files[0])
 
     


    }
  
    
};

    async function handleSubmit(e) {
      e.preventDefault();
      console.log("Submitting");
      setLoading(true);
      setSuccess("")
      setError("")
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          name: nameRef.current.value, 
          password: passwordRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value, 
          gender: genderRef.current.value, 
          dob: dobRef.current.value, 
          fb: fbRef.current.value, 
          linkedin: linkedinRef.current.value, 
          degree: degreeRef.current.value, 
          edu: eduRef.current.value, 
          password : passwordRef.current.value,
          graduation: graduationRef.current.value, 
          username: usernameRef.current.value, 
          awards: awardsRef.current.value, 
          pastExp: pastExpRef.current.value, 
          specialization: specializationRef.current.value,
          token: token,
          fileName : file ?   file["name"] : ""
        })
      }

      let res = await fetch('http://localhost:5000/doctorSignup', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      console.log('recieved');
      console.log(res);
      if(res['status'] === true && res['message'] === 'signup_complete'){
 
        if(file){
            let r = await fetch(res.url, {
                method: "PUT",
                body: file,
                headers: {
                  "Content-Type": "image/jpeg",
                  "x-amz-acl": "public",
              
                },
              });

            if(r.status === 200)
            {
                       setSuccess("Account created successfully")

            }else{
                                     setSuccess("Error while uploading profile picture")

            }
        }else{
                                 setSuccess("Account created successfully")

        }


      }else if(res["firebaseError"]){
                 setError(res.message.message)


      }
        else{
 
         setError(res['message'])
       }

 
      setLoading(false);
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();

 };

  useEffect(() =>{
    const verifyAdmin = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({token: token})
      }
      let res = await fetch('http://localhost:5000/verifyAdmin', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      console.log(res)
      if(!res['status']){
        history.push('/adminlogin');
      }
    }
    verifyAdmin();
  }, []);

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
    
 <input type="file"  name="myImage" style={{display:'none'}} ref={hiddenFileInput} onChange={onChangePicture}/>
    
    
    </Row>
     
    
    </Col>
    <Col sm>   
     <Form.Group id="username">
                  <Form.Label style = {Texts.FormLabel}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    ref={usernameRef}
                   />
                </Form.Group></Col>
    
    <Col sm>
    
    <Form.Group id="name">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
    
    </Col>
    
    
    
    
    
                </Row>
    
    
                <hr style = {{}}></hr>
     
                <Row>
    
     
    
                <Col sm>
    
    <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    required
                  />
                </Form.Group>
    
    </Col>
    
     </Row>
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
                  />
                </Form.Group></Col>
    
     </Row>
    
    
                <hr style = {{}}></hr>
    
    
     <Row>
    
    <Col sm>    <Form.Group id="degree">
                  <Form.Label style = {Texts.FormLabel}>Degree</Form.Label>
                     <Form.Control
                    type="text"
                    ref={degreeRef}
                   />
                </Form.Group></Col>
    
    <Col sm>   
     <Form.Group id="education">
                  <Form.Label style = {Texts.FormLabel}>Education</Form.Label>
                  <Form.Control
                    type="text"
                    ref={eduRef}
                   />
                </Form.Group></Col>
    
     </Row>
    
     <Row>
    
    <Col sm>    <Form.Group id="graduationYear">
                  <Form.Label style = {Texts.FormLabel}>Graduation Year</Form.Label>
                     <Form.Control
                    type="number"
                    ref={graduationRef}
                   />
                </Form.Group></Col>
    
    <Col sm>   
    
     <Form.Group id="username">
                  <Form.Label style = {Texts.FormLabel}>Specialisation</Form.Label>
                  <Form.Control
                    type="text"
                    ref={specializationRef}
                   />
                </Form.Group></Col>
    
     </Row>
    
    <Row>
    <Col sm>    <Form.Group id="linkedinlink">
                  <Form.Label style = {Texts.FormLabel}>LinkedIn Profile Link</Form.Label>
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
     
    <hr></hr>
    
     <Row>
    
    <Col sm>    <Form.Group id="graduationYear">
                  <Form.Label style = {Texts.FormLabel}>Past Experience</Form.Label>
                  <Form.Control
                    type="year"
                    ref={pastExpRef}
                   />
                    
    
                </Form.Group></Col>
    
     
     
    
     </Row>
    <Row>
    
    <Col sm>    <Form.Group id="graduationYear">
                  <Form.Label style = {Texts.FormLabel}>Awards</Form.Label>
                  <Form.Control className="form-control"
                    ref={awardsRef}
                   />
                    
    
                </Form.Group></Col>
    
     
     
    
     </Row>
    
    
    
    
    
    
    
    
    
    
    
              <br></br>
            
              </Form>
            </Card.Body>
          </Card>
          

          {(error || success) ? <div style = {{height : "20px"}}></div> : <div></div> }
                  {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
    
    
          
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
