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
    const [doctorId, setDoctorId] = useState('')
    const [consultationId, setconsultationId] = useState('')

 const [successText, setSuccess] = useState(false)
const [showPaymentButton, setPaymentButton] = useState('no')
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
      body: JSON.stringify({id: props.id, isPaid : "notpaid"}),
    };
        let res = await fetch(process.env.REACT_APP_API_URL + 'getConsultationStatus', requestOptions);
    res = await res.text();
    res = JSON.parse(res);
    console.log(res)
     if(res['status'] === 'on'){
           setError(false)
setPaymentButton('on')
setDoctorId(res.doctorEmail)
setconsultationId(res.consultationId)
    }else if(res['status'] === 'cancel'){
           setError(false)

setconsultationId(res.consultationId)
setDoctorId(res.doctorEmail)

        setPaymentButton('cancel')

    }  
else{


  if(res.msg)
  {
       setError(true)

  }
}        loading = false


    }catch(e){
      console.log("Done",e)

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



  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };



 const displayRazorpay = async () => {
    let res = await loadRazorpay();
    if (!res) {
      alert("Unable to load Razropay. Are you online?");
      return;
    }
    const token = await app.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
    };

    res = await fetch(process.env.REACT_APP_API_URL+'razorpay', requestOptions);
    res = await res.text();
    res = JSON.parse(res);

    if(!res['success']){
      return false;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_TEST_KEY,
      amount: res.amount,
      currency: res.currency,
      name: "Mediac",
      description: "Payment for consultation",
      order_id: res.id,
      handler: async function (response) {
        
        if (response.razorpay_order_id && response.razorpay_payment_id && response.razorpay_signature){
                   addConsultation(response.razorpay_order_id,response.razorpay_payment_id, response.razorpay_signature);

          return true;
        }
      },
      prefill: {
        name: props.name,
        email: currentUser.email,
        contact: props.contact

      },
      external: {
 // wallets: ['paytm'],
  handler: async function (data) {
 setError("");
     try{
        const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({
          name: props.name,
         
          phone: props.contact,
      
        }),
      };
      let res = await fetch(
        process.env.REACT_APP_API_URL+'paytm-payment',
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      var details = {
         action : "https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid="+ res.MID+ "&orderId=" + res.ORDER_ID,
         params : {
          "requestType"   : "Payment",
          websiteName   : "WEBSTAGING",
          callbackUrl   : "https://merchant.com/callback",
          txnAmount     : {
              value     : "100.00",
              currency  : "INR",
          },
          userInfo      : {
            "custId"    : "CUST_001",
          },
          mid : res.MID,
          signature : res.checksum,
          orderId : res.ORDER_ID

        }
      }
  
     }catch(e){
       setError("Connection Error")
     } 
 
   }
}
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
     rzp1.on("payment.failed", function (response) {
 
    });
   };











  const addConsultation = async (orderId, paymentId, signature) => {
     setError("");
     try{
        const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({
         
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          razorpaySignature: signature,
          type : "latepaid",
          doctor_email : doctorId,
          cid : props.id || consultationId
        }),
      };
      let res = await fetch(
        process.env.REACT_APP_API_URL+'accept-consultation-user',
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      //go to chat screen
      if(res.success)
      {
 
                history.push("/chat")

   
      }
     }catch(e){
       setError("Connection Error")
     }
  }









  return (
    <>


               <div className="Navb" ><Navbar  /></div>

      <div className="d-flex align-items-center justify-content-center topSpace" style = {{paddingTop: "100px",}}>
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 style = {{color : "#494f57", fontStyle: "work sans"}}>
{showPaymentButton === "on" ? "Your request is accepted" : showPaymentButton === "cancel" ? "Sorry, we cannot connect with you at the moment":"Payment will be enabled after we accept your request"}                  
                </h1>
                <p style = {{color : "#494f57", fontStyle: "open sans", fontSize
                : "24px"}} >If it is taking too much time, <a  href="tel:+917827556162">call us (782 755 6162)</a> </p>
                <div className="mt-5 text-center">
                  

                   {errorText ?  <Alert variant="danger" style= {{marginTop : "20px", marginBottom : "0px"}}>Connection Error</Alert> :
                   
                    disp ? <div class="alert alert-success" role="alert">Consultation Cancelled successfully.  <br/> Amount will be refunded in 7 days</div>  :
                    
                      showPaymentButton === 'no' && <ProgressBar animated now={completed} />}
 
                    {showPaymentButton === "on" ? <><br/> <div class="alert alert-success" role="alert">We are available  <br/> Continue to payment</div> </> : showPaymentButton === "cancel" ?
                    <>
                    <br/><div class="alert alert-danger" role="alert">Sorry for inconvinience, due to heavy load we are not available</div>
                    </> :<></>
                    
                      }
                  <br></br><br></br>
             
                  <Button disabled={showPaymentButton==="on" ? false : true} onClick={displayRazorpay}
                   
                   >
                   Pay and chat
                  </Button>
                    {
                    //For nonpay
                    /* <Button disabled={flag} onClick={handleCancelation}
                   
                   >
                   Cancel
                  </Button> */}
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
