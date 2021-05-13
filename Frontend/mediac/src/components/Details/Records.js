import React, { useRef,useEffect, useState } from "react";
import { Form, Button, Container, Card, Alert, } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
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
   export default function Help(props) {
  
  const { currentUser } = useAuth();
  const [consultations, setConsultations] = useState([]);
  const [consultationYears, setConsultationYears] = useState([]);
  const history = useHistory();


   useEffect(() => {

    if (!currentUser) {
      history.push("/login"); 
    }
    //get data from backend
    async function getConsultations() {
      try{
             const token = await  currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({   }),
      };
//prescriptions
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}getActiveConsultation`,
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      let years = {};
      res["consultation"].forEach((consultation) => {
        let year = consultation.startDate.substring(0, 4);
        if(!years[year])
        {
          years[year] = [consultation]
        }else{
           years[year].push(consultation);

        }
      });

 
       setConsultations(years);

      console.log(y , "kkkkk")
      console.log(res.consultation)
      setConsultationYears(Object.keys(years));
      }catch(e)
      {
        
      }
    }
    getConsultations();
    //get data from backend
  }, []);


  return (
    <>
             <div className = "pane">
                  <h2>Prescriptions</h2>
              
                <br />

                <div className = "pane-inner"  style = {{height : props.isMobile && "auto"}}>

                {consultations ? (
                  <>
                    {consultationYears.map((year) => (
                      <>
                        <p>{year}</p>
                        {consultations[year].map((consultation) =>
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
                                          Prescription for {consultation.name}
                                        </b>
                                        <br />
                                     &nbsp;

                                      </p>
                                    </div>
                                  </div>
                                  {
                                    <>
                                    
                                      <div 
                                    className="float-right viewBill"
                                    
                                   >
                                   <a href = {consultation.url} download={  consultation.name+" prescription.png"} target="_blank" rel="noreferrer">

                                       <div  >
                                      <p
                                      className=""
                                    >
                                      Open
                                    </p>
                                   </div>
                                   </a>
                                   
                                  </div>
                                    
                                    </> 
                                  }
                                
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


    
      </>
  );
}
