import React, { useEffect, useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import "./Navbar.css";
// import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const NavBar = () => {

  const arr = [{link: '/login', text: 'Login'}, {link: '/Signup', text: 'Signup'}];
  const [flag, setFlag] = useState(false);
  const { currentUser } = useAuth()


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
              <ReactBootStrap.Nav.Link  className="navlink" href="/FAQ">FAQs</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink"  href="/contact">Contact</ReactBootStrap.Nav.Link>

            </ReactBootStrap.Nav>
            
              <ReactBootStrap.Nav>
              {flag?'':arr.map((elem) => (
                <ReactBootStrap.Nav.Link className="navLink" href={elem.link} key={elem['link']}>{elem['text']}</ReactBootStrap.Nav.Link>
              ))}
            </ReactBootStrap.Nav>
           </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;