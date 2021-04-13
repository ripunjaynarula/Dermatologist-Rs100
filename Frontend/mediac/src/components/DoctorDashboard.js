import { Container, Card, CardBody, Row, Col } from "reactstrap";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import Header from "./Header";
import docimg from "./img/doc.jpeg";
import "./styles.css";
import "./docdash.css";


export default function DoctorDashboard() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    async function checkLogin() {
      const token = await currentUser.getIdToken(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ email: currentUser.email }),
      };

      let res = await fetch(
        "http://localhost:5000/getDocDetails",
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      if (!res["status"]) {
        history.push("/login");
      } else {
      }
    }
    checkLogin();
  }, []);

  return (
    <>
      <Header />
      <br />
      <Container
        id="doc"
        className="d-flex align-items-center justify-content-center"
     >
        <Card id="doccard"  style={{marginTop:"3%"}}>
          <CardBody>
            <img id="docimg" src={docimg} /> <br />
            <br />
            <p id="posttitle">Post Title</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
              pulvinar lorem felis nec erat.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nunc maximus, nulla ut commodo
              sagittis, sapien dui mattis dui, non pulvinar lorem felis nec
              erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
              pulvinar lorem felis nec eratLorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nunc maximus, nulla ut commodo
              sagittis, sapien dui mattis dui, non pulvinar lorem felis nec
              erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
              pulvinar lorem felis nec erat.
            </p>
          </CardBody>
          <Row
            style={{
              paddingTop: "22px",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: "34px",
              paddingBottom: "4px",
            }}
          ></Row>
        </Card>
      </Container>{" "}
      <br /> <br />
      {/* <Container  className="d-flex align-items-center justify-content-center">
    <div class="card mb-3" >
  <div class="row no-gutters">
    <div class="col-md-4">
      <img id="usersvg" src={usersvg}></img>
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h4 className="card-title" id="docname">Doc {name}</h4>
      <p className="card-text">{degree}</p>
      <p className="card-text">{education}</p> <p>{specialisation}</p><p>{experience}</p>     
      </div>
    </div>
  </div>
</div>
</Container> */}
      <br />
      <br />
    </>
  );
}
