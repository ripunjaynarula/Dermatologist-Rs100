import React, { useState, useRef, useEffect, useContext } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Container,  ProgressBar, Row, Button,Col, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";
 import loadimg from "./img/loading.webp";
import "./styles.css";
import Navbar from "./Navbar";
import app from "../firebase";
import error from "./img/error-img.png"


export default function Loading(props) {
  const [flag, setFlag] = useState(true);
  const [disp, setDisp] = useState(false);
  const [ completed, setCompleted] = useState(.1)
  const { currentUser } = useAuth();
 const [successText, setSuccess] = useState(false)

 const [errorText, setError] = useState(false)
  const history = useHistory();
    document.body.style.backgroundColor = "#ededf2";
 var loading = false;


   const checkStatus = async () => {
    i++
    console.log(i, loading)
    if(loading) return;
    loading = true
    try{
console.log("CHECKING")
          const token =  await app.auth().currentUser.getIdToken(true);
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({id: props.id}),
    };
        let res = await fetch(process.env.REACT_APP_API_URL + 'getConsultationStatus', requestOptions);
    res = await res.text();
    res = JSON.parse(res);
    console.log(res)
     if(res['status']){
      history.push('/chat')
          setError(false)

    }  
else{
  if(res.msg)
  {
       setError(true)

  }
}        loading = false


    }catch(e){
      console.log("Done")

       setError(true)
    }
    loading = false
  }

  const handleCancelation = async() => {
    setSuccess('')
    const token = await app.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({consultationId: props.id,  }),
    };
    let res = await fetch(process.env.REACT_APP_API_URL + 'cancelConsultation', requestOptions);
    res = await res.text();
    res = JSON.parse(res);
    if(res['status']){
      setSuccess("Amount will be reunded in 7 days")
     setFlag(false);
     setDisp(true);
    }
  }
var i = 0;
  useEffect(() => {

      setInterval(()=>{
        checkStatus()
      }, 15000);
   setTimeout(() => {

      setFlag(false);
     }, 300000);
 checkStatus()
  }, []);
  useEffect(() => {
 
    var i=0
    setInterval(() => {
 
if(i/6 >=100) i=0

        setCompleted(i/6)
            i++;

    }, 500);
  }, []);
  return (
    <>


               <div className="Navb" ><Navbar  /></div>

      <div className="d-flex align-items-center justify-content-center" style = {{paddingTop: "100px",}}>
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 style = {{color : "#494f57", fontStyle: "work sans"}}>
                  We are connecting you
                </h1>
                <h4 style = {{color : "#494f57", fontStyle: "work sans"}} >Sit back and relax</h4>
                <div className="mt-5 text-center">
                  

                   {errorText ?  <Alert variant="danger" style= {{marginTop : "20px", marginBottom : "0px"}}>Connection Error</Alert> : disp ? <div class="alert alert-success" role="alert">
          Consultation Cancelled successfully.  <br/> Amount will be refunded in 7 days
        </div>  :  <ProgressBar animated now={completed} />}
 

                  <br></br><br></br>
                  <Button disabled={flag} onClick={handleCancelation}
                   
                   >
                   Cancel Consultation
                  </Button>
                
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={error} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
 
   
    
    </>
  );
}
