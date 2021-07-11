import React, { useRef,useEffect, useState } from "react"
import { Form, Button,Row,Container,Col,  Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../../css/Card";
import useWindowDimensions from "../../functions/windowDimensions"
 import {Texts} from "../../css/Texts";
 import Navbar from "../Navbar"
import {reactLocalStorage} from 'reactjs-localstorage';
import {stopfile} from '../utility/alertUploadFile'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
    const nameRef = useRef()
  const phoneRef = useRef()
  const genderRef = useRef()
  const dobRef = useRef()
 
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

  const [loading, setLoading] = useState(false)
  const history = useHistory()
const [fil, setFil] = useState(null);
  const [picture, setPicture] = useState(null);
  const { height, width } = useWindowDimensions();

 
 const [name, setName] = useState("")

 const [gender, setGender] = useState("")
 const [dob, setDob] = useState("")
 const [phone, setPhone] = useState("")
 
  useEffect( () => {
    
    getProfiles();
  }, [ ]);


   useEffect( () => {
     onlyOnce();
  }, [] )

async function onlyOnce()  {
  if(!currentUser) return;
  var role =  reactLocalStorage.get('role') 
 
  if(role === undefined) role  = "";
 
  
  if(role ==="doctor"){
       return history.replace('/update-doctor');
    }
  }

async function getProfiles() {


       if (currentUser) {
        const token = await  currentUser.getIdToken(true)
        console.log(token)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
          body : JSON.stringify({patientUid: currentUser.uid})

          };
        let res = await fetch(process.env.REACT_APP_API_URL+'patient-profile', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
         if(res.isError)
        {

        }
        res = res.data
        if(!res) return
        setName(res.name)
        if(res.dob)
        {

          setDob(res.dob.split("T")[0])
        }
         setGender(res.gender)
        setPhone(res.phone)
        console.log(res)
       }

    }
 
   const onChangePicture = e => {
    if (e.target.files && e.target.files[0]){
if(stopfile(e.target.files[0])){
        return
      }
      
           setPicture(URL.createObjectURL(e.target.files[0]) );
      setFil(e.target.files[0])
      console.log(e.target.files[0])
      
 
  updateProfileImage(e.target.files[0]);

     


    }
  
    
};

async function updateProfileImage(file){



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

          let res = await fetch(process.env.REACT_APP_API_URL+'get-profile-upload-url', requestOptions);
         res = await res.text();
           res = JSON.parse(res)
  if(res.url == null )

 {
setLoading ( false)
setError("Some error occured")
   return ;
 }


 
// append the fields in presignedPostData in formData            
 

 let r = await fetch(res.url, {
    method: "PUT",
    body: file,
    headers: {
    //  "Content-Type": file.type,
        "Content-Type": "application/octet-stream",
        'x-amz-acl': 'public',   
     },
  });

  console.log(r)

if(r.status !== 200)
{
   setLoading ( false)
setError("Some error occured")
   return ;
}
 setLoading (false)
requestOptions.body = JSON.stringify({profileImage: res.fileName})

          let resp = await fetch(process.env.REACT_APP_API_URL+'save-patient-profile-image', requestOptions);

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
           phone : phoneRef.current.value


            };

 

          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body:JSON.stringify(d)
        };

          let res = await fetch(process.env.REACT_APP_API_URL+'update-patient-profile', requestOptions);
   res = await res.text();
                   console.log(res)

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

      document.body.style.backgroundColor = "#ededf2";

  return (
    <>
    <div className="Navb"><Navbar /></div>
 <br></br>
 <br></br>
 <br></br>
 
          <div>
<br></br>

<div>
  
  <Container  className="d-flex align-items-center justify-content-center topSpace"   style={{     }}>

<Container>


 <Card  style = {CardMain,  { padding:"15px", }}>

   <Card.Title>
     
   </Card.Title>
        <Card.Body>

 <br></br>

          <h4 className="text-left mb-4" style={{letterSpacing : "0"}}>Update Profile</h4>

 
          <hr></hr>
          {error && <Alert variant="danger"  style = {{marginBottom: "24px"}}>{error}</Alert>}
          {success && <Alert variant="success" style = {{marginBottom: "24px"}}>{success}</Alert>}


          
          <Form onSubmit={handleSubmit}>
            <Row >

<Col sm>
<Row  style ={{paddingLeft : "22px" , flexDirection: 'row',  display: "flex", alignItems : "center",   }}>
  <img  width="90" height="90" src={picture == null ?  currentUser.photoURL == null ? null : currentUser.photoURL : picture  } alt="" style = {{borderRadius : "50%", objectFit : "cover" }} /> 
 
 <div style ={{width : "20px"}}></div>
 
          <Button disabled={loading} variant="link" style = {{padding: "0px", height : "30px"}} onClick={handleClick}>Change Image</Button>

 <input type="file"  name="myImage" style={{display:'none'}} ref={hiddenFileInput} onChange={onChangePicture}/>


</Row>
 

</Col>

<Col sm>

<Form.Group id="name">
              <Form.Label style = {Texts.FormLabel}>Name</Form.Label>
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
              <Form.Label  style = {Texts.FormLabel}>Email Address</Form.Label>
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
                                                defaultValue={phone}

                ref={phoneRef}
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
defaultValue={dob}               ref={dobRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group></Col>

 </Row>
 
         
          </Form>
        </Card.Body>
         <br></br>
 <br></br>

      </Card>
      
 


   <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "14px" }}>
           
      

<Button disabled={loading}   className = "secondaryButton" onClick= {() =>        history.push('/')} >
Cancel            </Button>

<div style = {{width : "10px", height : "10px"}}></div>


   <Button disabled={loading} style={{height : "42px" }}  type="submit" className = "primaryButton" onClick= {handleSubmit}>
Update            </Button>
          </Row>
<br></br>
<br></br>

</Container>
</Container>

     
  </div>     </div>
     
    </>
  )
}
