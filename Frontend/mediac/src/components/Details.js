import React, { useRef, useState, useEffect } from "react"
import Tabs, { TabPane } from 'rc-tabs';
import '../../node_modules/rc-tabs/assets/index.css';
import "./styles.css";
import Navbar from "./Navbar";
import { Form, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../firebase'
import firebase from 'firebase'
import {CardMain} from "../css/Card";
import { CardBody, Col, Card, Container } from "reactstrap";

function Details() {
    function callback(e) {
        console.log(e);
      }
    return (<>


        <div className = "home" style={{display: "block"}}>
        <div className="Navb" ><Navbar  /></div>
        </div>        
        <div class="card " style={{backgroundColor:"#ececec"}} >
        <div className="App">
        <div class="card-body">
        <div style={{backgroundColor:"white",marginTop: "57px", minHeight:"46px", paddingTop: "12px", paddingLeft:"10px", backgroundColor:"rgba(255, 255, 255, 0.5)"}}>

            <h5><b>Your Drive</b></h5>

        </div>
        <Tabs defaultActiveKey="1" onChange={callback} tabPosition="left">
        <TabPane tab="Consultations" key="1">
            <h2>Consultations</h2>
            <div class="card" id="detailcard">
                <div class="card-body" id="detailcard">
                    <div className="float-right">
                <Button className="submitbtn" >
              Upload
            </Button>
            </div>
                </div>
            </div>
        </TabPane>
        <TabPane tab="Medical Records" key="2">
        <h2>Medical Records</h2>
        <div class="card" id="detailcard">
                <div class="card-body" id="detailcard">
                    <div className="float-right">
                <Button className="submitbtn" >
              Upload
            </Button>
            </div>
                </div>
            </div>
        </TabPane>
        <TabPane tab="Payment History" key="3">
        <h2>Payment History</h2>
        <div class="card" id="detailcard">
                <div class="card-body" id="detailcard">
                    <div className="float-right">
                <Button className="submitbtn" >
              Upload
            </Button>
            </div>
                </div>
            </div>
        </TabPane>
      </Tabs>
      </div>
    </div>
    </div>
    </>
    )
}

export default Details
