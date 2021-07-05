import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Dropdown,
  Container,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import ProfileSelection from "./ProfileSelection";
 import { Texts } from "../css/Texts";
import { Link, useHistory } from "react-router-dom";
import addusersvg from "./img/add-group.svg";
import Navbar from "./Navbar";
import { CardMain } from "../css/Card";
import "./styles.css";
import { DataContext } from "./App";
import Loading from "./Loading";
import app from "../firebase";
import Book from './utility/bookAppointment'
import useWindowDimensions from "../functions/windowDimensions"
const dayMap = {
  "0" : "Sunday",
  "1" : "Monday",
  "2" : "Tuesday",
  "3" : "Wednesday",
  "4" : "Thursday",
  "5" : "Friday",
  "6" : "Saturday"
}
export default function Choice() {
  const [currentProfile, setCurrentProfile] = useState(-1);
  const [currentProfileName, setCurrentProfileName] = useState("");
  const [currentRelation, setCurrentRelation] = useState("");
  const [currentGender, setCurrentGender] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const { height, width } = useWindowDimensions();
  const [data, setData] = useState({})
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const phoneRef = useRef();

  const heightRef = useRef();
  const weightRef = useRef();
  const medicationRef = useRef();
  const allergiesRef = useRef();
  const previousRef = useRef();

  const prev = useRef();
  const docType = useRef();
  const info = useRef();
  const quest = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [consultationId, setConsultationId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [openBook, setOpenBook] = useState(false)
  const { currentUser } = useAuth();
  const history = useHistory();
 
  const [clinicDetails, setClinicDetails] = useState({})
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var question = "";
 
  document.body.style.backgroundColor = "#ededf2";

  if (urlParams.get("ques")){
     
     question = urlParams.get("ques");
    if(question === "undefined") question = ""
  }
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


    const loadPaytm = (orderId, token, amount) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/UlYyJJ68894954901885.js";
      script.onload = () => {
        console.log("LOADED")
        onScriptLoad(orderId, token, amount);
      };
      script.onerror = () => {
        console.log("ERROR");
      };
      document.body.appendChild(script);
    });
  };

function onScriptLoad(orderId, token, amount){
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
        "orderId": orderId, /* update order id */
         "token" : token,
         "tokenType": "TXN_TOKEN",
         
        "amount": amount /* update amount */
        },
        "handler": {
          "notifyMerchant": function(eventName,data){
            console.log("notifyMerchant handler function called");
            console.log("eventName => ",eventName);
            console.log("data => ",data);
          } 
        }
      };

      if(window.Paytm && window.Paytm.CheckoutJS){
          window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
              // initialze configuration using init method 
              window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                  // after successfully updating configuration, invoke JS Checkout
                  window.Paytm.CheckoutJS.invoke();
              }).catch(function onError(error){
                  console.log("error => ",error);
              });
          });
      } 
  }


   const handleProfileSelection = (id, name, relation, gender, age) => {
            console.log(id)

    setCurrentProfile(id);
    setCurrentProfileName(name);
    setCurrentRelation(relation);
    setCurrentGender(gender ? gender.toLowerCase() : gender);
    setCurrentAge(age);
  };


    const refresh = ( id, gender, age, phone, consultationId, data) => {
            console.log(id)
    setCurrentPhoneNumber(phone)
setClinicDetails(data)
     setCurrentGender(gender ? gender.toLowerCase() : gender);
    setCurrentAge(age);
    if(consultationId)
    {
          setConsultationId(consultationId);
      setLoadingScreen(true)
    }
  };


  const addConsultation = async (orderId, paymentId, signature) => {
     setError("");
     try{
        const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({
          name: nameRef.current.value,
          gender: genderRef.current.value,
          height: heightRef.current.value,
          age: ageRef.current.value,
          weight: weightRef.current.value,
          medication: medicationRef.current.value,
          allergies: allergiesRef.current.value,
          previousConditions: previousRef.current.value,
          question: quest.current.value,
          phone: phoneRef.current.value,
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          razorpaySignature: signature,

        }),
      };
      let res = await fetch(
        process.env.REACT_APP_API_URL+'newConsultancy',
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      setLoading(false);
      setConsultationId(res['id']);
      setLoadingScreen(true)
     }catch(e){
       setError("Connection Error")
     }
  }




function isDate(val) {
  // Cross realm comptatible
  return Object.prototype.toString.call(val) === '[object Date]'
}

function isObj(val) {
  return typeof val === 'object'
}

  function stringifyValue(val) {
  if (isObj(val) && !isDate(val)) {
    return JSON.stringify(val)
  } else {
    return val
  }
}

function buildForm({ action,  params }) {
  const form = document.createElement('form')
  form.setAttribute('method', 'post')
  form.setAttribute('action', action)
 
  Object.keys(params).forEach(key => {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', stringifyValue(params[key]))
    form.appendChild(input)
  })

  return form
}

    function post(details) {
  const form = buildForm(details)
   document.body.appendChild(form)
  form.submit()
  form.remove()
}


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
      handler: function (response) {
         setPaymentId(response.razorpay_payment_id)
        
        if (response.razorpay_order_id && response.razorpay_payment_id && response.razorpay_signature){
                  addConsultation(response.razorpay_order_id,response.razorpay_payment_id, response.razorpay_signature);

          return true;
        }
      },
      prefill: {
        name: nameRef.current.value,
        email: currentUser.email,
        contact: phoneRef.current.value

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
          name: nameRef.current.value,
         
          phone: phoneRef.current.value,
      
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
       console.log(res);

loadPaytm(res.ORDER_ID, token, res.TXN_AMOUNT)

 //     post(details)
   //   console.log("PSOTED");

   // res = await fetch("https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=" + res.MID +"&orderId=" + res.ORDER_ID, opt);      
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

  const handleSubmit = async (e) => {
    e.preventDefault();
var rightNow = false;
  setError("")
    console.log(nameRef.current.value)
    if(!nameRef.current)
    {
      setError("Please set name")
      return;
    }
    if(!nameRef.current.value)
    {
      setError("Please set name")
      return;
    }
    if(!phoneRef.current.value)
    {
      setError("Please set phone number on which we can contact you regarding consultation")   
         return;

    }
    if(!phoneRef.current.value)
    {
      setError("Please set phone number on which we can contact you regarding consultation") 
      return;

    }
  var phoneno = /^\d/;
if(!phoneRef.current.value.match(phoneno))
{
        setError("Please set correct phone number")
      return;

}
if(phoneRef.current.value.length >13  )
{
        setError("Please set correct phone number ")
      return;

}if(phoneRef.current.value.length <10  )
{
        setError("Please set correct phone number ")
      return;

}
if(clinicDetails.openDays)
  if(!clinicDetails.openDays.includes(dayMap[new Date().getDay()]))
  {
     rightNow = true
  }else{
      if(clinicDetails.openTime)
      {

    console.log("LINE 411")
          var now  = new Date()
          var j =0;
          for(var i=0; i<clinicDetails.openTime.length; i++)
          {

            var time = new Date(now.toDateString() + " " + clinicDetails.openTime[i])

            if(    time > now)
            {
              
               j++
            }
          }
          if(new Date(now.toDateString() + " " + clinicDetails.openTime[0]) > now){
            j =0
          }

          if(j===0)
          {
            rightNow = true;
           }
      } 
  } 

if(rightNow)
{
    var data = {
                    name: nameRef.current.value,
          gender: genderRef.current.value,
          height: heightRef.current.value,
          age: ageRef.current.value,
          weight: weightRef.current.value,
          medication: medicationRef.current.value,
          allergies: allergiesRef.current.value,
          previousConditions: previousRef.current.value,
          question: quest.current.value,
          phone: phoneRef.current.value,
          through : "payment"
                }

                setData(data)
                setOpenBook(true)
                return;
    
}
         
  
       
        setLoading(true);

    console.log()
   await displayRazorpay();
         setLoading(false);

    
  }
  return (
    <>
    {loadingScreen?(<><Loading id={consultationId} paymentId={paymentId}/></>):(
      <>
      <div className="Navb">
        <Navbar />
      </div>

      <div
        className="container"
       >
         <br/>
        <ProfileSelection
          handleSubmit={handleProfileSelection}
          id={currentProfile}
          onLoad = {refresh}
        />
        <div id=" ">
          {currentProfile < 0 ? (
            <h5
              style={{ fontWeight: "bold", marginTop: "35px" }}
              className=" mb-4"
            >
              Please share some basic info about yourself
            </h5>
          ) : (
            <h5
              style={{ fontWeight: "bold", marginTop: "35px" }}
              className=" mb-4"
            >
              Please share some basic info about your {currentRelation},{" "}
              {currentProfileName}
            </h5>
          )}
    
          <Card style={CardMain}>
            <Card.Body>
              <Row>
                <Col sm>
                  <Form.Group id="docType">
                    <Form.Label style={Texts.FormLabel}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      ref={nameRef}
                      defaultValue={currentProfileName}
                      required
                    />
                  </Form.Group>
                </Col>
                 <Col sm>
                  <Form.Group id="docType">
                    <Form.Label style={Texts.FormLabel}>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      ref={phoneRef}
                      defaultValue={currentPhoneNumber}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm>
                  {" "}
                  <Form.Group id="city">
                    <Form.Label style={Texts.FormLabel}>Age</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={currentAge}
                      ref={ageRef}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm>
                  <Form.Group id="name">
                    <Form.Label style={Texts.FormLabel}>Gender</Form.Label>
                    <select name="prev" ref={genderRef} id="dropdown-basic">
                      <option style={{ display: "none" }}> </option>

                      {currentGender === "rather not say" ? (
                        <option value="rather not say" selected>
                          Rather not say
                        </option>
                      ) : (
                        <option value="rather not say">Rather not say</option>
                      )}
                      {currentGender  === "male" ? (
                        <option value="male" selected>
                          Male
                        </option>
                      ) : (
                        <option value="male">Male</option>
                      )}

                      {currentGender  === "female" ? (
                        <option value="female" selected>
                          Female
                        </option>
                      ) : (
                        <option value="female">Female</option>
                      )}
                    </select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <h5
            style={{ fontWeight: "bold", marginTop: "35px" }}
            className=" mb-4"
          >
            Describe the purpose of the consultation in detail
          </h5>

          <Card style={CardMain}>
            <Card.Body>
              <Row>
                <Col sm>
                  <Form.Group id="docType">
                    <Form.Label style={Texts.FormLabel}>Question</Form.Label>
                    <Form.Control
                      type="text"
                      id="questio"
                      ref={quest}
                      defaultValue={question}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {currentProfile < 0 ? (
            <h5
              style={{ fontWeight: "bold", marginTop: "35px" }}
              className=" mb-4"
            >
              Additonal information about yourself
            </h5>
          ) : (
            <h5
              style={{ fontWeight: "bold", marginTop: "35px" }}
              className=" mb-4"
            >
              Additonal information about your {currentRelation},{" "}
              {currentProfileName}
            </h5>
          )}

          <Card style={CardMain}>
            <Card.Body>
              <Form>
                <Row
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Col sm>
                    {" "}
                    <Form.Group id="docType">
                      <Form.Label style={Texts.FormLabel}>
                        Height (Optional)
                      </Form.Label>
                      <Form.Control
                        id="height"
                        type="text"
                        ref={heightRef}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col sm>
                    <Form.Group id="city">
                      <Form.Label style={Texts.FormLabel}>
                        Weight (Optional)
                      </Form.Label>
                      <Form.Control
                        id="weight"
                        type="text"
                        ref={weightRef}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group id="city">
                  <Form.Label style={Texts.FormLabel}>
                    Previously diagnosed conditions
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="prev"
                    ref={previousRef}
                    required
                  />
                </Form.Group>

                <Form.Group id="city">
                  <Form.Label style={Texts.FormLabel}>
                    Previous medication
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="medi"
                    ref={medicationRef}
                    required
                  />
                </Form.Group>

                <Form.Group id="city">
                  <Form.Label style={Texts.FormLabel}>
                    Specify allergies if any
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="allergies"
                    ref={allergiesRef}
                    required
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>       
              

           {error && <>
           <div style= {{height: "30px"}}></div> 
           <Alert variant="danger">{error}</Alert>
           </>}

          <Row
            style={{
              paddingTop: "12px",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: "14px",
            }}
          >

   <Button
              disabled={loading}
              style={{ height: "45px", width: "250px", marginTop:"10px" }}
              type="submit"
              className="secondaryButton"
              onClick={()=>{
  setError("")
    console.log(nameRef.current.value)
    if(!nameRef.current)
    {
      setError("Please set name")
      return;
    }
    if(!nameRef.current.value)
    {
      setError("Please set name")
      return;
    }
    if(!phoneRef.current.value)
    {
      setError("Please set phone number on which we can contact you regarding consultation")   
         return;

    }
    if(!phoneRef.current.value)
    {
      setError("Please set phone number on which we can contact you regarding consultation") 
      return;

    }
  var phoneno = /^\d/;
if(!phoneRef.current.value.match(phoneno))
{
        setError("Please set correct phone number")
      return;

}
if(phoneRef.current.value.length >13  )
{
        setError("Please set correct phone number ")
      return;

}if(phoneRef.current.value.length <10  )
{
        setError("Please set correct phone number ")
      return;

}
                var data = {
                    name: nameRef.current.value,
          gender: genderRef.current.value,
          height: heightRef.current.value,
          age: ageRef.current.value,
          weight: weightRef.current.value,
          medication: medicationRef.current.value,
          allergies: allergiesRef.current.value,
          previousConditions: previousRef.current.value,
          question: quest.current.value,
          phone: phoneRef.current.value,
          through : ""
                }

                setData(data)
                setOpenBook(true)
              }}
            >
              Schedule for later
            </Button>

{width> 538 ? <div style = {{width : "10px"}}/> : <br/>}
 
       <Button
              disabled={loading}
              style={{ height: "45px", width: "250px", marginTop : "10px" }}
              type="submit"
              className="primaryButton"
              onClick={handleSubmit}
            >
              Proceed to Payment
            </Button>
          </Row>
        </div>
        <br></br>
        <br></br>{" "}
      </div>
      </>
    )}

    <Book days = {clinicDetails.openDays} data = {data} isClinicOpen = {clinicDetails.isClinicOpen} time = {clinicDetails.openTime && clinicDetails.openTime} show = {openBook} onHide = {()=>{setOpenBook(false)}}></Book>
    </>
  );
}
