import React, { useRef, useState, useEffect } from "react";
import Tabs, { TabPane } from "rc-tabs";
import "../styles.css";
import Navbar from "../Navbar";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
 import { CardBody, Col, Card, Container } from "reactstrap";
import app from "../../firebase";
import Help from "./help"
import Prescriptions from "./Records"

import Consultations from "./Consultaions"
import useWindowDimensions from "../../functions/windowDimensions"
  var key = "1"


function Details() {

  const { height, width } = useWindowDimensions();





  
    var queryString = window.location.pathname;


    var path = queryString.split("/")[queryString.split("/").length - 1]
   console.log(path)
   if(path === "consultations")
   {
     key = "1"
   }
   if(path === "help")
   {
     key = "4"
   }
    if(path ==="payments")
    {
      key = "3"  
   }
    if(path ==="records")
    {
      key = "2"
    }
   useEffect(() => {
    document.body.style.backgroundColor = "#ededf2";

   
    //get data from backend
  }, []);

  return (
    
    <>
               <Navbar />

 
{
  
  width> 600 ? getMain() : 

  key ==='1' ? <div class ='container' style = {{height : height-67, marginTop: "50px"}}>
<Consultations isMobile = 'true'></Consultations> 


  </div> : key ==="4" ?<div class ='container' style = {{height : height-67, marginTop: "50px", paddingTop:"30px"}}>
< Help  isMobile = 'true'> </Help>

  </div>: <div class ='container' style = {{height : height-67, marginTop: "50px"}}>
 <Prescriptions isMobile = 'true'></Prescriptions>


  </div>  

}
 
     </>
  );
}




function getMain(){

    function callback(e) {
    console.log(e);
    if(e ==="3")
    {
      window.history.replaceState(null, "Payment History", "/payments")

    }
    if(e === "1")
    {
      window.history.replaceState(null, "Consultation History", "/consultations")

    }  if(e ==="4")
    {
      window.history.replaceState(null, "Help", "/help")

    }  if(e ==="2")
    {
      window.history.replaceState(null, "Medical Records", "/records")

    }
  }

  return       <div className = "centre topSpace" style = {{maxHeight :"80vh",   paddingTop: "12vh"}}>

     <div class="card " style={{ backgroundColor: "white" }}>
        <div className="App">
          <div class="card-body">
            <div
              style={{
                marginTop: "5px",
                minHeight: "50px",
                paddingTop: "12px",
                paddingLeft: "15px",
                backgroundColor: "white",
                                paddingRight: "1px",

              }}
            >
              <h5>
                <b>Your Drive</b>
              </h5>
            </div>
            <hr></hr>
            <Tabs defaultActiveKey={key}  onChange={callback} tabPosition="left" tabBarStyle= {{_paddingTop:"100px", outline : "none"}} >
               <TabPane tab="Consultations"  key="1" style = {{marginTop:"-10px", marginLeft:"-10px"}}>
                 <Consultations></Consultations>
              </TabPane>
              <TabPane tab="Medical Records" key="2"  style = {{marginTop:"-10px", marginLeft:"-10px"}}>
                 <Prescriptions></Prescriptions>


              </TabPane>
               <TabPane tab="Need Help?" key="4"  className="mpane" style = {{marginTop:"-10px", marginLeft:"-10px"}}>

<Help></Help>           
                </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

 </div>

}

export default Details;
