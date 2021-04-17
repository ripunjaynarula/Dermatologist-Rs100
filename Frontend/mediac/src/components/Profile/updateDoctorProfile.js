import React, { useRef,useEffect, useState } from "react"
import { Form, Button,Row,Container,Col,  Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../../css/Card";
import useWindowDimensions from "../../functions/windowDimensions"
 import {Texts} from "../../css/Texts";
import Navbar from "../Header"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
    const nameRef = useRef()
  const phoneRef = useRef()
  const genderRef = useRef()
  const dobRef = useRef()
  const degreeRef = useRef()
  const eduRef = useRef()
  const graduationRef = useRef()
  const usernameRef = useRef()
  const awardsRef = useRef()
const pastExpRef = useRef()
const specializatoinRef = useRef()

  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
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
   useEffect( () => {
    
        document.body.style.backgroundColor = "#ededf2";

    getProfiles();
  }, [ ]);


 async function getProfiles() {


       if (currentUser) {
        const token = await  currentUser.getIdToken(true)
         const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
          body : JSON.stringify({patientUid: currentUser.uid})

          };
        let res = await fetch('http://localhost:5000/my-profile', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
         if(res.isError)
        {
          return
        }
       var resp = res.data
        if(resp.dob)
        {

          setDob(resp.dob.split("T")[0])
        }
        setName(resp.name)
        setGender(resp.gender)
        setPhone(resp.phone)
        setGraduation(resp.graduationYear)
        setDegree(resp.degree)
        setEducation(resp.education)
        setPastExp(resp.pastExp)
        setawards(resp.awards)
        setSpecial(resp.specialisation)
        setUsername(resp.username)


        console.log(resp)
       }

    }
   const onChangePicture = e => {
    if (e.target.files && e.target.files[0]){
           setPicture(URL.createObjectURL(e.target.files[0]) );
      setFile(e.target.files[0])
updateProfileImage();

     


    }
  
    
};

async function updateProfileImage(){



try{

          setLoading(true)
          setError("")
          const token = await currentUser.getIdToken()

   
          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
                body : JSON.stringify({

fileName :   file["name"]

          })
         };

          let res = await fetch('http://localhost:5000/get-profile-upload-url', requestOptions);
         res = await res.text();
           res = JSON.parse(res)
  if(res.url == null )

 {
setLoading ( false)
setError("Some error occured")
   return ;
 }
 let r = await fetch(res.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "image/jpeg",
      "x-amz-acl": "public",
   
     },
  });

if(r.status !== 200)
{
   setLoading ( false)
setError("Some error occured")
   return ;
}
 setLoading (false)
requestOptions.body = JSON.stringify({profileImage: res.fileName})

          let resp = await fetch('http://localhost:5000/save-doctor-profile-image', requestOptions);

if(resp.isError)
{
  setLoading ( false)
setError("Some error occured")
   return ;
}
setSuccess("Profile picture changed successfully")



}catch(e){
setLoading (false)
setError("Some error occured")



}




}

 async function handleSubmit(e) {
    e.preventDefault()
   setError("")
 


     setLoading(true)
  
    

try{
     if(currentUser)
      {
          setError("")
          setLoading(true)

          const token = await  currentUser.getIdToken()
   
          var d={  
           name : nameRef.current.value,
           gender : genderRef.current.value,
           dob : dobRef.current.value,
           phone : phoneRef.current.value,
           graduationYear : graduationRef.current.value,
           degree : degreeRef.current.value,
           education : eduRef.current.value,
           pastExperience : pastExpRef.current.value,
           awards : awardsRef.current.value,
           specialisation : specializatoinRef.current.value,
           username : usernameRef.current.value,
           


            };

 

          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body:JSON.stringify(d)
        };

          let res = await fetch('http://localhost:5000/update-doctor-profile', requestOptions);
   res = await res.text();
          res = JSON.parse(res)

 
          if(res.isError)
          {

            
               setError("Error while updating profile")  

          }else{


            setSuccess("Profile updated successfully")
          }

     setLoading(false)
















      }

}catch(e)
{
         setLoading(false)

}


     setLoading(false)




  
  }
    const hiddenFileInput = React.useRef(null);

   const handleClick = event => {
         hiddenFileInput.current.click();

  };
  return (
    <>
<Navbar selected = "edit" />
<br></br>
<br></br>
          <div>
<br></br>

<Container  style={{    paddingTop: '20px', }}>


 <Card style = {CardMain} >

   <Card.Title>
     
   </Card.Title>
        <Card.Body>

 

          <h5 className="text-left mb-4" style={{letterSpacing : "0"}}>Update Profile</h5>

 
          <hr></hr>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}


          
          <Form onSubmit={handleSubmit}>
            <Row >

<Col sm>
<Row  style ={{paddingLeft : "22px" , flexDirection: 'row',  display: "flex", alignItems : "center",   }}>
  <img  width="90" height="90" src={picture} alt="" style = {{borderRadius : "50%", objectFit : "cover" }} /> 
 
 <div style ={{width : "20px"}}></div>
 
          <Button disabled={loading} variant="link" style = {{padding: "0px", height : "30px"}} onClick={handleClick}>Change Image</Button>

 <input type="file"  name="myImage" style={{display:'none'}} ref={hiddenFileInput} onChange={onChangePicture}/>


</Row>
 

</Col>

<Col sm>

<Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                required
                defaultValue={name}
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
                                defaultValue={currentUser.email}
disabled = "true"
                ref={emailRef}
              />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="phone-number">
              <Form.Label style = {Texts.FormLabel}>Phone number</Form.Label>
              <Form.Control
                type="text"
                ref={phoneRef}
                defaultValue={phone}
              />
            </Form.Group></Col>

 </Row>




 <Row>

<Col sm>    <Form.Group id="gender">
              <Form.Label style = {Texts.FormLabel}>Gender</Form.Label>
                  <select name="Gender" ref={genderRef} id="dropdown-basic">
                                         <option style={{display:"none"}}>  </option>
{gender === "male" ? <option value="male" selected >Male</option> :  <option value="male"  >Male</option>}
                       
                       {gender === "female" ?  <option value="female" selected>Female</option>:  <option value="female">Female</option>}

 {gender === "rather not say" ?                                             <option value="rather not say" selected>Rather not say</option>
:
                                            <option value="rather not say">Rather not say</option>
}                       
  
                        
                </select>
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="dob">
              <Form.Label style = {Texts.FormLabel}>Date of birth</Form.Label>
              <Form.Control
                type="date"
                ref={dobRef}
                                defaultValue={dob}

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
                ref={degreeRef}
                                defaultValue={degree}

               />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="education">
              <Form.Label style = {Texts.FormLabel}>Education</Form.Label>
              <Form.Control
                type="text"
                ref={eduRef}
                                defaultValue={education}

               />
            </Form.Group></Col>

 </Row>

 <Row>

<Col sm>    <Form.Group id="graduationYear">
              <Form.Label style = {Texts.FormLabel}>Graduation Year</Form.Label>
                 <Form.Control
                type="text"
                ref={graduation}
               />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="username">
              <Form.Label style = {Texts.FormLabel}>Specialisation</Form.Label>
              <Form.Control
                type="text"
                ref={special}
               />
            </Form.Group></Col>

 </Row>


 <Row>

 

<Col sm>   
 <Form.Group id="username">
              <Form.Label style = {Texts.FormLabel}>Username</Form.Label>
              <Form.Control
                type="text"
                ref={username}
               />
            </Form.Group></Col>

 </Row>
<hr></hr>
 <Row>

<Col sm>    <Form.Group id="about">
              <Form.Label style = {Texts.FormLabel}>About Me</Form.Label>
                 <textarea             className="form-control"
 name="comments" style={{width: '100%', 
  
  }} rows="3"></textarea>

            </Form.Group></Col>

 
 

 </Row>
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
Update            </Button>
          </Row>



</Container>

<br></br>
<br></br>

          </div>
     
    </>
  )
}
