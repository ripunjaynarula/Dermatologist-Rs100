import React from "react";
import { ListGroup } from "react-bootstrap";
import "./styles.css";

function Conversation() {
  return (
    <div>
      <div className="container">
        <div>
          <div className="top w-100">
            <br />
          </div>
          <div className="bottom overflow-auto " style={{ height: "350px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row align-items-center conv w-100">
                <div className="image">
                  {" "}
                  <img src="https://i.imgur.com/jhsYqVT.png" width="50" />{" "}
                  <span className="type"></span>{" "}
                </div>
                <div className="d-flex flex-column line-height ml-2">
                  {" "}
                  <span className="font-weight-bold">Shivansh</span>{" "}
                  <span>Lorem Ipsum</span>{" "}
                  <span className="d-flex flex-row align-items-center s-now">
                    <small className="live">10/04/2021</small>
                  </span>{" "}
                </div>
              </div>{" "}
              <span className="dots"> </span>
            </div>
            <hr />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
