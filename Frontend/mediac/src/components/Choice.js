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
import OtherPersonDetails from "./OtherPersonDetails";
import { Texts } from "../css/Texts";
import { Link, useHistory } from "react-router-dom";
import addusersvg from "./img/add-group.svg";
import Navbar from "./Navbar";
import { CardMain } from "../css/Card";
import "./styles.css";
import { DataContext } from "./App";
import Loading from "./Loading";
import app from "../firebase";


export default function Choice() {
  const [currentProfile, setCurrentProfile] = useState(-1);
  const [currentProfileName, setCurrentProfileName] = useState("");
  const [currentRelation, setCurrentRelation] = useState("");
  const [currentGender, setCurrentGender] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);

  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();

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

  const { currentUser } = useAuth();
  const history = useHistory();
  const [consultationData, setConsultationData] = useContext(DataContext); // for users who add it before logging in

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var question = "";

    document.body.style.backgroundColor = "#ededf2";

  if (urlParams.get("ques")) question = urlParams.get("ques");
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

  //console.log(URLSearchParams(quest))
  const handleProfileSelection = (id, name, relation, gender, age) => {
            console.log(id)

    setCurrentProfile(id);
    setCurrentProfileName(name);
    setCurrentRelation(relation);
    setCurrentGender(gender.toLowerCase());
    setCurrentAge(age);
  };


    const refresh = ( id, gender, age) => {
            console.log(id)

     setCurrentGender(gender.toLowerCase());
    setCurrentAge(age);
  };


  const addConsultation = async () => {
    console.log("handling");
    if (currentProfile === 0) {
      setError("Please select a profile.");
      setLoading(false);
    } else {
      setError("");
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
    }
  }

  const displayRazorpay = async () => {
    let res = await loadRazorpay();
    if (!res) {
      alert("Unable to load Razropay SDK. Are you online?");
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
        addConsultation();
        if (response.razorpay_order_id && response.razorpay_payment_id && response.razorpay_signature){
          return true;
        }
      },
      prefill: {
        name: nameRef.current.value,
        email: currentUser.email,
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    // return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pay = await displayRazorpay();
    if(!pay){
      console.log("Error occurred");
    }
  }
  return (
    <>
    {loadingScreen?(<><Loading id={consultationId}/></>):(
      <>
      <div className="Navb">
        <Navbar />
      </div>
      {error && <Alert variant="danger">{error}</Alert>}

      <Container
        className="align-items-center justify-content-center"
        style={{ maxWidth: "50vh" }}
      >
        <ProfileSelection
          handleSubmit={handleProfileSelection}
          id={currentProfile}
          onLoad = {refresh}
        />
        <div id="formbody">
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

          <Row
            style={{
              paddingTop: "22px",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: "14px",
            }}
          >
            <Button
              disabled={loading}
              style={{ height: "45px", width: "250px" }}
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
      </Container>
      </>
    )}
    </>
  );
}
