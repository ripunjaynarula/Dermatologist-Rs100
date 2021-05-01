import React , {useState}from "react"
import { Link ,  useHistory} from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { useAuth } from "../contexts/AuthContext"
 import {CardMain} from "../css/Card";
  import {Texts} from "../css/Texts";
// import images
import logodark from "./img/banner3.jpg"
import logolight from "./img/banner3.jpg"
import useWindowDimensions from "../functions/windowDimensions"
import MessageModal from '../utility/confirmationModal'
import { useEffect } from "react";


const EmailVerification = () => {
    const { height, width } = useWindowDimensions();
 const { currentUser,   } = useAuth()
const history = useHistory()


const [show, setShow] = useState(false);
const [message, setMessage] = useState("");

const onClose = ()=>{
  setShow(false)
}
const resendMail= async(e)=>{
  e.preventDefault();
try{
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token : await currentUser.getIdToken() },
        body: JSON.stringify({
          resend : true
        })
      }; 
      let res = await fetch(process.env.REACT_APP_API_URL+'resend-verification', requestOptions)
      res = await res.text()
      res = JSON.parse(res)
      console.log(res);
    
      if (res['status'] === 'already_verified') {
       
       history.push('/dashboard');
        return;
      }
      if(res['status'] === 'verification_sent'){
        setShow(true)
        setMessage("Verification mail sent")
      }
}catch(e)
{
  setShow(true)
  setMessage("Connection Error")
}
  

}
const onlyOnce= async()=>{
 try{
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token : await currentUser.getIdToken() },
        body: JSON.stringify({
         })
      }; 
      let res = await fetch(process.env.REACT_APP_API_URL+'resend-verification', requestOptions)
      res = await res.text()
      res = JSON.parse(res)
      console.log(res);
    
      if (res['status'] === 'already_verified') {
       
       history.push('/dashboard');
        return;
      }
   
}catch(e)
{
  setShow(true)
  setMessage("Connection Error")
}
  

}


 useEffect( () => {
    console.log(process.env.REACT_APP_API_URL)
     onlyOnce();
  }, [] )
  return (

<div>

<Container  style={{  height:"100vh"}}>

 
            <br></br>
            <br></br>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <Link to="dashboard" className="d-block auth-logo">
                
                  <img
                    src={logolight}
                    alt=""
                    height="40"
                    className="auth-logo-light mx-auto"
                  />
                </Link>
                <p className="mt-3">Company Name</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card style = {CardMain}>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p>
                          We have sent you verification email{" "}
                          <span className="font-weight-semibold">
                           {currentUser.email}
                          </span>
                          , Please check it
                        </p>
                        <div className="mt-4">
                          
                          <a href= { "https://"+currentUser.email.split("@")[1]}  target="_blank" rel="noopener noreferrer" className="btn btn-success w-md">
                            Verify email
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Did't receive an email ?{" "}
                  <a href="#" onClick = {resendMail} className="font-weight-medium text-primary">
                    {" "}
                    Resend{" "}
                  </a>{" "}
                </p>

              </div>
            </Col>
          </Row>
        </Container>
   

   <MessageModal show = {show} onHide  = {onClose} message = {message}></MessageModal>

 
 


</div>


 )
}
export default EmailVerification
