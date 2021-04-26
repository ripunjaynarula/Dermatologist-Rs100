import React, { useEffect, useState, useRef } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import "../css/Navbar.css";
import "./styles.css";
import SelectBox from "./navDopdown";
// import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useWindowDimensions from "../functions/windowDimensions";
import { conditions } from "./blog/Conditions/ConditionsList";
import { TreatmentList } from "./blog/Treatments/treatmentList";

const NavBar = (props) => {
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
   useEffect(() => {
     if (props.type === "trans") {
      const handleScroll = () => {
        const show = window.scrollY > 20;
        if (navRef.current !== show) {
          setNavBackground(show);
        }
      };
      document.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    } else {
      setNavBackground(true);
    }



  }, []);
  const conditionList = (
    <div
      aria-labelledby=""
      class="dropdown-menu show"
      style={{ margin: "0px" }}
    >
        {conditions.map((data, index) => (
         
 
      <a href={"/"+data.url} class="tile dropdown-item">
        {data.title}
      </a>
          ))}


    
    </div>
  );

    const treatment = (
    <div
      aria-labelledby=""
      class="dropdown-menu show"
      style={{ margin: "0px" }}
    >
        {TreatmentList.map((data, index) => (
         
 
      <a href={"/"+data.url} class="tile dropdown-item">
        {data.title}
      </a>
          ))}


    
    </div>
  );

  const arr = [
    { link: "/login", text: "Login" },
    { link: "/Signup", text: "Signup" },
  ];
  // const menuIconClick = () => {
  //   //condition checking to change state from true to false and vice versa
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };
  const [flag, setFlag] = useState(false);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const [name, setName] = useState("");
  const { height, width } = useWindowDimensions();




   const log = (
    <div
      aria-labelledby=""
      class="dropdown-menu show"
      style={{ margin: "0px" }}
    >
      <a href="/update-profile" class="tile dropdown-item">
        Edit Profile
      </a>
      <a href="#action/3.2" class="tile dropdown-item">
        My Consultations
      </a>
      <a href="#action/3.3" class="tile dropdown-item">
         My Medical Records
      </a>
          <a href="#action/3.3" class="tile dropdown-item">
         Payment History
      </a>
        <a href="#action/3.3" class="tile dropdown-item">
        Need Help
      </a>
       <a href="/change-password" class="tile dropdown-item">
         Change Password
      </a>
      <hr></hr>
        <a     href="#"    onClick={handleLogout}
  class="tile dropdown-item">
        Log Out
      </a>
    </div>
  );
 
  const right = flag ?  (

        <SelectBox
              data={log}
 title = {
     currentUser == null
          ? ""
          : currentUser.displayName == null
          ? ""
          : currentUser.displayName
      }
                    type={props.type}
            ></SelectBox>
     
  ) : (
    arr.map((elem) => (
      <ReactBootStrap.Nav.Link
        className="navlink"
        href={elem.link}
        style={{
          transition: "0.5s ease",
          color:
            width < 1201 ? "#62636a" : !navBackground ? "white" : "#62636a",
        }}
        key={elem["link"]}
      >
        {elem["text"]}
      </ReactBootStrap.Nav.Link>
    ))
  );

 

  async function handleLogout(e) {
    e.preventDefault()
    setError("");

    try {
      await logout();
      setFlag(false);

      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    if (currentUser) {
      setFlag(true);
      return;
    }
    setFlag(false);
  }, [currentUser, setFlag]);

  return (
    <div className="Navbar" style={{}}>
      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="xl"
        className="bc"
        fixed="top"
        style={{
          transition: "0.3s ease",
          backgroundColor:
            width < 1201 ? "white" : !navBackground ? "transparent" : "white",
                     boxShadow: navBackground &&  "0px 0px 10px rgba(147, 149, 151, 0.25)"

        }}
      >
        <ReactBootStrap.Navbar.Brand
          id="brand"
          style={{
            transition: "0.5s ease",
            color: width < 1201 ? "black" : !navBackground ? "white" : "black",
          }}
          href="/"
        >
          LOGO
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
             <ReactBootStrap.Nav.Link
              className="navlink"
              href="/about"
              style={{
                transition: "0.5s ease",
                color:
                  width < 1201
                    ? "#62636a"
                    : !navBackground
                    ? "white"
                    : "#62636a",
              }}
            >
              About Us
            </ReactBootStrap.Nav.Link>

            <ReactBootStrap.Nav.Link
              className="navlink"
              href="/blog"
              style={{
                transition: "0.5s ease",
                color:
                  width < 1201
                    ? "#62636a"
                    : !navBackground
                    ? "white"
                    : "#62636a",
              }}
            >
              Blog
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link
              className="navlink"
              href="/videos"
              style={{
                transition: "0.5s ease",
                color:
                  width < 1201
                    ? "#62636a"
                    : !navBackground
                    ? "white"
                    : "#62636a",
              }}
            >
              Videos
            </ReactBootStrap.Nav.Link>

            <SelectBox
              data={conditionList}
              title="Conditions"
              type={props.type}
            ></SelectBox>
            <SelectBox
              data={treatment}
              title="Treatments"
              type={props.type}
            ></SelectBox>
            <ReactBootStrap.Nav.Link
              className="navlink"
              href="/chat"
              style={{
                transition: "0.5s ease",
                color:
                  width < 1201
                    ? "#62636a"
                    : !navBackground
                    ? "white"
                    : "#62636a",
              }}
            >
              Chat
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>

          {width > 1200 ? (
            <ReactBootStrap.Nav
              style={{
                marginLeft: width< 1200 ? "-5%":
                   width < 1250
                    ? "80px"
                    : width < 1300
                    ? "110px"
                    : width < 1350
                    ? "165px"
                    : width < 1400
                    ? "205px"
                    : width < 1450
                    ? "280px"
                    : width < 1500
                    ? "300px"
                    : "350px",
                    
              }}
              className="mr-auto"
            >
              {right}
            </ReactBootStrap.Nav>
          ) : (
            <ReactBootStrap.Nav className="mr-auto">
              
              
              
              
              {right}</ReactBootStrap.Nav>
          )}
        </ReactBootStrap.Navbar.Collapse>
        
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
