import React, { useRef, useState, useEffect } from "react";
import Tabs, { TabPane } from "rc-tabs";
import "./styles.css";
import Navbar from "./Navbar";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import firebase from "firebase";
import { CardMain } from "../css/Card";
import { CardBody, Col, Card, Container } from "reactstrap";
import app from "../firebase";

// var month_name = function(dt){
const mlist = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
//     return mlist[dt.getMonth()];
//   };
var i, x, y, z;

function Details() {
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


 
  const { currentUser } = useAuth();
  const [consultations, setConsultations] = useState([]);
  const [consultationYears, setConsultationYears] = useState([]);
  const history = useHistory();


  
    var queryString = window.location.pathname;

  var key = "1"

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

    if (!currentUser) {
      history.push("/login");
    }
    //get data from backend
    async function getConsultations() {
      const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ email: currentUser.email }),
      };

      let res = await fetch(
        `${process.env.REACT_APP_API_URL}getActiveConsultation`,
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      setConsultations(res["consultation"]);
      let years = [];
      res["consultation"].forEach((consultation) => {
        let year = consultation.startDate.substring(0, 4);
        years.push(year);
      });
      setConsultationYears(years);
    }
    getConsultations();
    //get data from backend
  }, []);

  return (
    <>
      <div className="home" style={{ display: "block" }}>
        <div className="Navb">
          <Navbar />
        </div>
      </div>
 

 <div className = "centre" style = {{maxHeight :"80vh",   paddingTop: "12vh"}}>

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
            <Tabs defaultActiveKey={key} onChange={callback} tabPosition="left" style= {{_paddingTop:"100px"}} >
               <TabPane tab="Consultations"  key="1" style = {{marginTop:"-10px", marginLeft:"-10px"}}>
           <div style = {{backgroundColor:"#f1eff5", padding:"30px"}}>
                  <h2>Consultations</h2>
                <div
                  class="card"
                  id="detailcard"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                 
                </div>
                <br />

                <div style = {{height:"60vh", overflow:"auto"}}>

                {consultations ? (
                  <>
                    {consultationYears.map((year) => (
                      <>
                        <p>{year}</p>
                        {consultations.map((consultation) =>
                          consultation.startDate.substring(0, 4) === year ? (
                            <>
                              <div style={{ fontSize: "0px" }}>
                                {
                                  ((x =
                                    parseInt(consultation.startDate[5]) * 10),
                                  (y = parseInt(consultation.startDate[6])))
                                }
                              </div>

                              <div
                                className="card"
                                id="detailcard"
                                style={{
                                  backgroundColor: "white",
                                }}
                              >
                                <div class="card-body" id="detailcard">
                                  <div
                                    className="float-left dmcal"
                                    style={{ paddingBottom: "-2px" }}
                                  >
                                    <p
                                      className="datecal"
                                      style={{ marginBottom: "-5px" }}
                                    >
                                      <b>
                                        {consultation.startDate[8] +
                                          consultation.startDate[9]}
                                      </b>
                                    </p>
                                    <p
                                      className="monthcal"
                                      style={{ marginBottom: "5px" }}
                                    >
                                      {mlist[x + y - 1]}
                                    </p>
                                  </div>
                                  <div>
                                    <div
                                      className="consuldoc"
                                      style={{
                                        display: "flex",
                                         marginleft: "140px",
                                      }}
                                    >
                                      <p>
                                        <b>
                                          Consultation Ended
                                        </b>
                                        <br />
                                        Record for {consultation.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <br />
                            </>
                          ) : (
                            <></>
                          )
                        )}
                      </>
              
              
                    ))}
                  </>
                ) : (
                  <>
                    <div
                      class="card"
                      id="detailcard"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                    >
                      <div class="card-body" id="detailcard">
                        <p>No Data Yet</p>
                      </div>
                    </div>
                    <br />
                  </>
                )}

                </div>
 

           </div>


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
                  <div class="card-body" id="detailcard"></div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

 </div>
 
 
     </>
  );
}

export default Details;
