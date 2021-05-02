import React, { useRef, useState, useEffect } from "react";
import Tabs, { TabPane } from "rc-tabs";
import "../../node_modules/rc-tabs/assets/index.css";
import "./styles.css";
import Navbar from "./Navbar";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import firebase from "firebase";
import { CardMain } from "../css/Card";
import { CardBody, Col, Card, Container } from "reactstrap";

function Consultations() {
  function callback(e) {
    console.log(e);
  }
  return (
    <>
      <div className="home" style={{ display: "block" }}>
        <div className="Navb">
          <Navbar />
        </div>
      </div>
      <div class="card " style={{ backgroundColor: "#ececec" }}>
        <div className="App">
          <div class="card-body">
            <div
              style={{
                marginTop: "57px",
                minHeight: "46px",
                paddingTop: "12px",
                paddingLeft: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <h5>
                <b>Your Drive</b>
              </h5>
            </div>
            <Tabs defaultActiveKey="1" onChange={callback} tabPosition="left">
              <TabPane tab="Consultations" key="1">
                <h2>Consultations</h2>
                <div
                  class="card"
                  id="detailcard"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div class="card-body" id="detailcard">
                    <div className="float-right">
                      <Button className="submitbtn">Upload</Button>
                    </div>
                  </div>
                  
                </div>
                <br/>
                {/* <p style={{color: "rgb(58, 57, 57)", fontWeight: "900", fontSize:"20px"}}>&nbsp;2021</p> */}
                <div
                  class="card"
                  id="detailcard"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div class="card-body" id="detailcard">
                  <div className="float-left dmcal" style={{backgroundColor: "rgb(204, 200, 200)"}}>
                      <p className="date">03</p>
                      <p className="month">May</p>
                    </div>
                  </div>
                  
                </div>
                <br/>
                <div
                  class="card"
                  id="detailcard"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div class="card-body" id="detailcard">
                    
                  </div>
                  
                </div>
                <br/>
                <div
                  class="card"
                  id="detailcard"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div class="card-body" id="detailcard">
                    
                  </div>
                  
                </div>
                <br/>
                <div
                  class="card"
                  id="detailcard"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                  <div class="card-body" id="detailcard">
                    
                  </div>
                  
                </div>
                <br/>
              </TabPane>
              <TabPane tab="Medical Records" key="2">
                <h2>Medical Records</h2>
                <div class="card" id="detailcard">
                  <div class="card-body" id="detailcard">
                    <div className="float-right">
                      <Button className="submitbtn">Upload</Button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Payment History" key="3">
                <h2>Payment History</h2>
                <div class="card" id="detailcard">
                  <div class="card-body" id="detailcard">
                    <div className="float-right">
                      <Button className="submitbtn">Upload</Button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Need Help?" key="4">
                <h2>Need Help?</h2>
                <div class="card" id="detailcard">
                  <div class="card-body" id="detailcard">
                    
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultations;
