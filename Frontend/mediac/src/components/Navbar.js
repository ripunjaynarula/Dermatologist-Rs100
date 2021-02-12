import React, { useEffect, useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory, Link } from "react-router-dom"
import "./Navbar.css";
// import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const NavBar = () => {

  const arr = [{link: '/login', text: 'Login'}, {link: '/Signup', text: 'Signup'}];
  const [flag, setFlag] = useState(false);
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()



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
        <div className="Navbar">
            <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bc">
            <ReactBootStrap.Navbar.Brand href="/">MEDIAC</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto"> 
    
              <ReactBootStrap.Nav.Link className="navlink" href="/about">About</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" href="/blog">Blog</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link  className="navlink" href="/faq">FAQs</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink"  href="/contact">Contact</ReactBootStrap.Nav.Link>

            </ReactBootStrap.Nav>
            
              <ReactBootStrap.Nav className="form-inline">
              {flag?<div> 
              <ReactBootStrap.Nav.Link className=" navlink" id="updprf" href="/update-profile">Update Profile</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" variant="link" onClick={handleLogout}>Log Out</ReactBootStrap.Nav.Link>
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