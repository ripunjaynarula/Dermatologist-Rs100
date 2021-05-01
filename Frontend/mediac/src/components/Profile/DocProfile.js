import React, { useState, useRef, useEffect, useContext } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Card, CardBody,Row, Col } from "reactstrap"
import { useHistory, Link } from "react-router-dom"
import "../../css/Navbar.css";
// import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import {CardMain} from "../../css/Card"
import docimgsq from '../img/docsq.jpeg';
import docimg from '../img/doc.jpeg'
import  "../styles.css";
import Navbar from "../Navbar"
import BlogList from "../BlogList"
import { BiNotepad, BiBriefcaseAlt,BiLocationPlus,BiBuilding } from "react-icons/bi";
    import facebook from '../img/facebook.svg'
   import linkedin from '../img/linkedin.svg'
   import twitter from '../img/twitter.svg'
   import achievement from '../img/achievement.svg'
   import bcase from '../img/case.svg'
   import building from '../img/building.svg'
   import location from '../img/location.svg'
   import medal from '../img/medal.svg'

import useWindowDimensions from "../../functions/windowDimensions"

export default function DocProfile() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const dbinfo = useRef();
  const history = useHistory();
  const quest = useRef();
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [city, setCity] = useState("");
  const queryString = window.location.pathname;
  const { height, width } = useWindowDimensions();

  console.log(width);

  var mar = "0px";
  if (width < 1200) {
    mar = "15px";
  }
  useEffect(() => {
    async function getData() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: queryString }),
      };

      let res = await fetch(
       process.env.REACT_APP_API_URL+'getDocDetails',
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      if (!res["status"]) {
        history.push("/404");
      } else {
        setDegree(res["degree"]);
        setName(res["name"]);
        setEducation(res["education"]);
        setExperience(res["experience"]);
        setSpecialisation(res["specialisation"]);
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="Navb">
        <Navbar />
      </div>
      <div style={{ backgroundColor: "white" }}>
        <div style={{ backgroundColor: "white" }}>
          <div id="profcover">
            <div id="round">
              <img id="coverimg" src={docimg} />
            </div>
          </div>

          <Container className="d-flex align-items-center justify-content-center">
            <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
              <div
                className="row"
                style={{ marginLeft: "0px", marginRight: "0px" }}
              >
                <div
                  className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center"
                  style={{ marginLeft: "0px", paddingRight: "0px" }}
                >
                  <img className="dp" src={docimgsq} />
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center"></div>
                <div className="row user-detail-row">
                  <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                    {/* <div className="border"></div> */}
                    {/* <p>FOLLOWER</p>
                                <span>320</span> */}
                  </div>
                  <div className="col-md-12 col-sm-12 user-detail-section2 pull-right">
                    {/* <div className="border"></div> */}
                    {/* <p>FOLLOWING</p>
                                <span>147</span> */}
                  </div>
                </div>
                <div className="col-md-12 user-detail-section2">
                  {/* <div className="border"></div> */}
                  {/* <p>PERFORMANCE</p>
                            <span>56 <small>and 42 review</small></span> */}
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
              <div
                className="row profile-right-section-row"
                style={{ display: "block" }}
              >
                <div className="profile-header">
                  <div className="row" style={{ display: "block" }}>
                    <div
                      className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <h1 style={{ color: "black", fontSize: "24px" }}>
                        Dr. adadasd
                      </h1>
                      <p
                        style={{
                          marginBottom: mar,
                          color: width >= 1200 && "black",
                          marginTop: width >= 1200 && "2px",
                        }}
                      >
                        adsdadad arejdgiuh uahqjei
                      </p>
                      {width > 1200 && (
                        <p
                          style={{
                            fontSize: "14px",
                            fontFamily: "work sans",
                            color: "#0000009b",
                          }}
                        >
                          10 years of experience
                        </p>
                      )}
                      <a
                        href="https://twitter.com/#"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={facebook}
                          className="icon-mbigger"
                          alt=""
                        ></img>
                      </a>

                      <a
                        href="https://twitters.com/#"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={linkedin}
                          className="icon-mbigger"
                          alt=""
                        ></img>
                      </a>

                      <a
                        href="https://twitters.com/#"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={twitter}
                          className="icon-mbigger"
                          alt=""
                        ></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container className="align-items-center justify-content-center">
            <h5 style={{ fontWeight: "bold" }}>About</h5>
            <p style={{ color: "#000000ab", fontFamily: "work sans" }}>
              adauejaj fwsojae alwewhrwuawnlucefhou faweurhqowrehpNV
              WEFJUOIJDODEC FSFCSFRFSF SFSFSFDS
            </p>
            <br></br>
            <hr />
            <br />

            <h5 style={{ fontWeight: "bold" }}>Blogs by {name}</h5>
            <BlogList mail="mail" />
            <br />

            <hr />
            <br />
          </Container>

          <Container
            id="adincon"
            className="align-items-center justify-content-center"
          >
            <h5 style={{ fontWeight: "bold" }}>Additional Information</h5>
            <br />
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <img src={medal} className="icon-small" alt=""></img>
              <h6 id="adinf">Speciality</h6>
            </Row>
            <p
              style={{
                marginLeft: "31px",
                marginTop: "2px",
                color: "#000000ab",
                fontFamily: "work sans",
              }}
            >
              {" "}
              {specialisation}
            </p>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <img src={bcase} className="icon-small" alt=""></img>
              <h6 id="adinf"> Past Experience</h6>
            </Row>
            <p
              style={{
                marginLeft: "31px",
                marginTop: "2px",
                color: "#000000ab",
                fontFamily: "work sans",
              }}
            >
              {" "}
              {experience}
            </p>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <img src={location} className="icon-small" alt=""></img>
              <h6 id="adinf">Location</h6>
            </Row>
            <p
              style={{
                marginLeft: "31px",
                marginTop: "2px",
                color: "#000000ab",
                fontFamily: "work sans",
              }}
            >
              {city}
            </p>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <img src={building} className="icon-small" alt=""></img>
              <h6 id="adinf">Educational Details</h6>
            </Row>
            <p
              style={{
                marginLeft: "31px",
                marginTop: "2px",
                color: "#000000ab",
                fontFamily: "work sans",
              }}
            >
              education
            </p>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <img src={achievement} className="icon-small" alt=""></img>
              <h6 id="adinf">Professional Memberships</h6>
            </Row>
            <p
              style={{
                marginLeft: "30px",
                marginTop: "2px",
                color: "#000000ab",
                fontFamily: "work sans",
              }}
            >
              Lorem ipsum dolor sit amet,
            </p>
            <br />
          </Container>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
