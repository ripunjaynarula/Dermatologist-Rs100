import React, { useRef, useState, useEffect, useContext } from "react"
import { Form, Button,Row, Col, Card, Alert, Dropdown,Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
 import ProfileSelection from './ProfileSelection'
import OtherPersonDetails from './OtherPersonDetails';
import NewConsultation from './ConsultationForm';
import {Texts} from "../css/Texts";
import { Link, useHistory } from "react-router-dom"


import { DataContext } from './App'

export default function Choice(){

  const [currentProfile, setCurrentProfile] = useState(-1); 
  const [currentProfileName, setCurrentProfileName] = useState('');
   const [currentRelation, setCurrentRelation] = useState('');
  const [currentGender, setCurrentGender] = useState('');
  const [currentAge, setCurrentAge] = useState('');
 

  const nameRef = useRef()
  const ageRef = useRef()
  const genderRef = useRef()
   

  const heightRef = useRef()
  const weightRef = useRef()
  const medicationRef = useRef()
  const allergiesRef = useRef()
  const previousRef = useRef()
  



  const prev = useRef()
  const docType = useRef()
  const info = useRef()
 
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
 
  const { currentUser } = useAuth()
  const history = useHistory()
  const [consultationData, setConsultationData] = useContext(DataContext); // for users who add it before logging in

  const handleProfileSelection = (id, name, relation, gender, age) => {
    setCurrentProfile(id);
    setCurrentProfileName(name)
    setCurrentRelation(relation)
    setCurrentGender(gender)
    setCurrentAge(age)

  }

  const resetSelection = () => {
    setCurrentProfile(0);
  }
  const handleSubmit = () => {
    if (currentProfile === 0) {
      setError("Please select a profile.");
    }
    else {
      setError("");
      // send request to backend!
    }
  }
  return (
        <>
                      {error && <Alert variant="danger">{error}</Alert>}

         <Container className=" align-items-center justify-content-center" style={{ maxWidth: "50vh" }}>
          <ProfileSelection handleSubmit={handleProfileSelection} id={currentProfile}/>    
         {console.log(currentProfileName)}
                  {console.log(currentRelation)}
                  {console.log(currentGender)}

       
          
          <br></br>
            <br></br>

              <div id="formbody">


{currentProfile <0 ?  <h5 className=" mb-4">Please share some basic info about yourself
 </h5>
:
 <h5 className=" mb-4">Please share some basic info about your {currentRelation}, {currentProfileName}
 </h5>
}
          
      
          
            <Card>


<Card.Body>
 
 <Row>
<Col sm>
 <Form.Group id="docType">
                  <Form.Label style={Texts.FormLabel}>Name</Form.Label>
                  <Form.Control type="text" ref = {nameRef}          
                  defaultValue={currentProfileName}
 required />
                </Form.Group>

</Col>


 </Row>

              
<Row>

<Col sm>  <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Age</Form.Label>
                  <Form.Control type="text" 
                  defaultValue = {currentAge}
                   ref={ageRef} required />
                </Form.Group></Col>

  <Col sm> 
                <Form.Group id="name">
                  <Form.Label style={Texts.FormLabel}>Gender</Form.Label>
                      <select 
                                     
                      name="prev" ref={genderRef} id="dropdown-basic">
                                <option style={{display:"none"}}>  </option>

{currentGender === "others" ?                                             <option value="others" selected>Rather not say</option>
:
                                            <option value="others">Rather not say</option>
}
{currentGender === "male" ? <option value="male" selected >Male</option> :  <option value="male"  >Male</option>}
                       
                       {currentGender === "female" ?  <option value="female" selected>Female</option>:  <option value="female">Female</option>}
                        
                </select>
                </Form.Group>
          </Col>
</Row>
    

</Card.Body>


            </Card>
            





<br></br>


 



           
      {currentProfile <0 ?  <h5 style = {{marginTop : "20px"}} className=" mb-4">Additonal information about yourself
 </h5>
:
 <h5 style = {{marginTop : "20px"}} className=" mb-4">Additonal information about your {currentRelation}, {currentProfileName}
 </h5>
}
          
            <Card>


<Card.Body>

  <Form onSubmit={handleSubmit}>
                
               
   <Row  style ={{ flexDirection: 'row',justifyContent:'space-between'     }}>


 <Col sm > <Form.Group id="docType">
                  <Form.Label style={Texts.FormLabel}>Height (Optional)</Form.Label>
                  <Form.Control type="text" ref={heightRef} required />
                </Form.Group>
                </Col>
               

               <Col sm>
                <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Weight (Optional)</Form.Label>
                  <Form.Control type="text" ref={weightRef} required />
                </Form.Group>
               </Col>


               </Row>

                <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Previously diagnosed conditions</Form.Label>
                  <Form.Control type="text" ref={previousRef} required />
                </Form.Group>

                  <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Previous medication</Form.Label>
                  <Form.Control type="text" ref={medicationRef} required />
                </Form.Group>

                   <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Specify allergies if any</Form.Label>
                  <Form.Control type="text" ref={allergiesRef} required />
                </Form.Group>
                
               
                <p disabled={loading} className="submitbtn" onClick={handleSubmit}>
                    Proceed to Payment
                </p>
              </Form>
            


</Card.Body>


            </Card>
            
            
              </div>
                      </Container>
        </>
  )
}