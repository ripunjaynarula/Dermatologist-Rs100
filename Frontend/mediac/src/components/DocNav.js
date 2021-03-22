import React, { useEffect, useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory, Link } from "react-router-dom"
import "../css/Navbar.css";
// import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const NavBar = () => {

  const arr = [{link: '/login', text: 'Login'}, {link: '/Signup', text: 'Signup'}];
  const [flag, setFlag] = useState(false);
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()
  const [name, setName] = useState("");


  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


  useEffect( () => {
    if (currentUser) {
 
      setFlag(true);
      return
    }
    setFlag(false);
  }, [currentUser, setFlag])



  return(
        <div className="Navbar" style={{  }}>
            <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bc">
            <ReactBootStrap.Navbar.Brand id="brand" href="/">MEDIAC</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto"> 
    
              <ReactBootStrap.Nav.Link className="navlink" href="/about">About</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" href="/add-blog">Blog</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link  className="navlink" href="/faq">FAQs</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink"  href="/contact">Contact</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink"  href="/DoctorLogin">Doctor Login</ReactBootStrap.Nav.Link>

            </ReactBootStrap.Nav>
            
              <ReactBootStrap.Nav className="form-inline">
              {flag?<div> 
              <ReactBootStrap.Dropdown  >
                <ReactBootStrap.Dropdown.Toggle variant="success" style = {{backgroundColor: "white", color : "#737373", border : "none", borderInlineColor : "white"}}   >
                
                </ReactBootStrap.Dropdown.Toggle >

                <ReactBootStrap.Dropdown.Menu style = {{ border : "none",      boxShadow: "0px 0px 13px 1px #e2d9d9",
}}>
                  
                  <ReactBootStrap.Dropdown.Item href="#/action-2">My Consultations</ReactBootStrap.Dropdown.Item>
                  <ReactBootStrap.Dropdown.Item href="#/action-2">My Medical Records</ReactBootStrap.Dropdown.Item>

                  <ReactBootStrap.Dropdown.Item   href="/update-profile">Edit Profile</ReactBootStrap.Dropdown.Item>
  
                  <ReactBootStrap.Dropdown.Divider />

                  <ReactBootStrap.Dropdown.Item  variant="link" onClick={handleLogout}>Log Out</ReactBootStrap.Dropdown.Item>
                </ReactBootStrap.Dropdown.Menu>
              </ReactBootStrap.Dropdown>
              </div>:arr.map((elem) => (
                <ReactBootStrap.Nav.Link className="navlink" href={elem.link} key={elem['link']}>{elem['text']}</ReactBootStrap.Nav.Link>
              ))}
            </ReactBootStrap.Nav>
           </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;