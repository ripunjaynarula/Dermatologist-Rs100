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

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 2500;

function Test() {

    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);
  
    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    React.useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === colors.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
  
      return () => {
        resetTimeout();
      };
    }, [index]);
    return (
        <div>
            <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((backgroundColor, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundColor }}
          ></div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
        </div>
    )
}

export default Test
