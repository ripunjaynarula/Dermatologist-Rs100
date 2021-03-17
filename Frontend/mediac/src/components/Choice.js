import React, { useRef, useState, useEffect, useContext } from "react"
import { Form, Button,Row, Col, Card, Alert, Dropdown,Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
 import ProfileSelection from './ProfileSelection'
import OtherPersonDetails from './OtherPersonDetails';
import {Texts} from "../css/Texts";
import { Link, useHistory } from "react-router-dom"
import addusersvg from './img/add-group.svg';

import {CardMain} from "../css/Card"

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
   const quest = useRef()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
 
  const { currentUser } = useAuth()
  const history = useHistory()
  const [consultationData, setConsultationData] = useContext(DataContext); // for users who add it before logging in

 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var question = ""

if(urlParams.get('ques'))
  question= urlParams.get('ques')
 
console.log(question)


//console.log(URLSearchParams(quest))
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

         <Container className="align-items-center justify-content-center" style={{ maxWidth: "50vh" }}>
          <ProfileSelection handleSubmit={handleProfileSelection} id={currentProfile}/>    
         {console.log(currentProfileName)}
                  {console.log(currentRelation)}
                  {console.log(currentGender)}

       
          
     

              <div id="formbody">


{currentProfile <0 ?  <h5 style = {{fontWeight:"bold", marginTop : "35px"}} className=" mb-4">Please share some basic info about yourself
 </h5>
:
 <h5 style = {{fontWeight:"bold", marginTop : "35px"}} className=" mb-4">Please share some basic info about your {currentRelation}, {currentProfileName}
 </h5>
}
          
      
          
            <Card style = {CardMain}>


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

{currentGender === "Rather not say" ?                                             <option value="Rather not say" selected>Rather not say</option>
:
                                            <option value="Rather not say">Rather not say</option>
}
{currentGender === "Male" ? <option value="Male" selected >Male</option> :  <option value="male"  >Male</option>}
                       
                       {currentGender === "Female" ?  <option value="Female" selected>Female</option>:  <option value="female">Female</option>}
                        
                </select>
                </Form.Group>
          </Col>
</Row>
    

</Card.Body>


            </Card>
            





 

<h5 style = {{fontWeight: "bold", marginTop : "35px"}}  className=" mb-4">Describe the purpose of the consultation in detail
</h5>

      <Card style = {CardMain}>


<Card.Body>
 
 <Row>
<Col sm>
 <Form.Group id="docType">
                  <Form.Label style={Texts.FormLabel}>Question</Form.Label>
                  <Form.Control type="text" id = "questio" ref = {quest}          
                  defaultValue={question}
 required />
                </Form.Group>

</Col>


 </Row>

              
 
</Card.Body>


            </Card>
            



 

           
      {currentProfile <0 ?  <h5 style = {{ fontWeight:"bold", marginTop : "35px"}} className=" mb-4">Additonal information about yourself
 </h5>
:
 <h5 style = {{  fontWeight:"bold", marginTop : "35px"}} className=" mb-4">Additonal information about your {currentRelation}, {currentProfileName}
 </h5>
}
          
            <Card style = {CardMain}>


<Card.Body>

  <Form onSubmit={handleSubmit}>
                
               
   <Row  style ={{ flexDirection: 'row',justifyContent:'space-between'     }}>


 <Col sm > <Form.Group id="docType">
                  <Form.Label style={Texts.FormLabel}>Height (Optional)</Form.Label>
                  <Form.Control id="height" type="text" ref={heightRef} required />
                </Form.Group>
                </Col>
               

               <Col sm>
                <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Weight (Optional)</Form.Label>
                  <Form.Control id = "weight" type="text" ref={weightRef} required />
                </Form.Group>
               </Col>


               </Row>

                <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Previously diagnosed conditions</Form.Label>
                  <Form.Control type="text" id = "prev" ref={previousRef} required />
                </Form.Group>

                  <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Previous medication</Form.Label>
                  <Form.Control type="text" id = "medi" ref={medicationRef} required />
                </Form.Group>

                   <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>Specify allergies if any</Form.Label>
                  <Form.Control type="text" id = "allergies" ref={allergiesRef} required />
                </Form.Group>
                
             
              </Form>
            


</Card.Body>


            </Card>
            
   <Row style= {{paddingTop :"22px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "14px" }}>
           
      
   <Button disabled={loading} style={{height : "45px" , width : "250px"}}  type="submit" className = "primaryButton" onClick= {handleSubmit}>
              Proceed to Payment
            </Button>
          </Row>
            
              </div>



           <br></br>
               <br></br>       </Container>
               
        </>
  )
}