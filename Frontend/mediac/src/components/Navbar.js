import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
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
{/*<ReactBootStrap.NavDropdown title="YEET" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
    </ReactBootStrap.NavDropdown>*/}
    </ReactBootStrap.Nav>
    
    <ReactBootStrap.Nav>
    
    <ReactBootStrap.Nav.Link className="navlink" href="/login">Login</ReactBootStrap.Nav.Link>
    
    
    <ReactBootStrap.Nav.Link className="navlink"  href="/Signup">
        Signup
      </ReactBootStrap.Nav.Link>
    
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;