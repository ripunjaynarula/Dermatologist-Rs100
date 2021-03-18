import React, { useEffect, useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory, Link } from "react-router-dom"
import "../css/Navbar.css";
// import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import useWindowDimensions from "../functions/windowDimensions"

const NavBar = () => {

  const arr = [{link: '/login', text: 'Login'}, {link: '/Signup', text: 'Signup'}];
  const [flag, setFlag] = useState(false);
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()
  const [name, setName] = useState("");
  const { height, width } = useWindowDimensions();
  const right =  flag? 

     <ReactBootStrap.NavDropdown  
    className="drop" title={currentUser == null ? "" : currentUser.displayName==null ?"": currentUser.displayName} id="basic-nav-dropdown"    >
                          <ReactBootStrap.NavDropdown.Item href="/update-profile" style = {{fontFamily : "work sans"}}>Edit Profile</ReactBootStrap.NavDropdown.Item>

                    <ReactBootStrap.NavDropdown.Item href="#action/3.1" className = "tile">My Consultations</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item href="#action/3.3" className = "tile">My Medical Records</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item href="#action/3.3" className = "tile">Need Help</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item href="/change-password" className = "tile">Change Password</ReactBootStrap.NavDropdown.Item>

                    <ReactBootStrap.NavDropdown.Divider />
                    <ReactBootStrap.NavDropdown.Item variant="link" onClick={handleLogout} className = "tile">Log Out</ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown>


:

   arr.map((elem) => (
                <ReactBootStrap.Nav.Link className="navlink" href={elem.link} style = {{fontFamily : "work sans"}} key={elem['link']}>{elem['text']}</ReactBootStrap.Nav.Link>
              ))



const [show, setShow] = useState(false);
const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}


  async function handleLogout() {
    setError("")

    try {
      await logout()
          setFlag(false);

      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


  useEffect( () => {
 
 console.log(currentUser)
    if (currentUser) {
 
      setFlag(true);
      return
    }
    setFlag(false);
  }, [currentUser, setFlag])

console.log(width)

  return(
        <div className="Navbar" style={{  }}>
            <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bc">
            <ReactBootStrap.Navbar.Brand id="brand" href="/">LOGO</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto"> 
    
              <ReactBootStrap.Nav.Link className="navlink" href="/about">About</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" href="/add-blog">Blog</ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link  className="navlink" href="/videos">Tube</ReactBootStrap.Nav.Link>
              <ReactBootStrap.NavDropdown className="navlink" title="Conditions" id="basic-nav-dropdown"   >
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="/pimples-acne">Pimples or Acne</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.2">Psoriasis</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile"href="#action/3.3">Eczema</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Warts And Molluscumcontagiosum</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Vitiligo</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Hyper Pigmentation/ Malesma</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Fungal Infection</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Moles or Nevi or skin tags</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Keloid And Hypertrophic Scar</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Lichen planus</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">Hair Loss</ReactBootStrap.NavDropdown.Item>

<tr>
<td   >
  <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.1">Pimples or Acne</ReactBootStrap.NavDropdown.Item>
                   
</td>

<td >
  <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.1">Warts And Molluscumcontagiosum</ReactBootStrap.NavDropdown.Item>
                   

</td>

</tr>
                    <ReactBootStrap.NavDropdown.Item className = "tile" href="#action/3.3">What Is Hirusitism?</ReactBootStrap.NavDropdown.Item>
                  
                </ReactBootStrap.NavDropdown>

 <ReactBootStrap.NavDropdown className="navlink" title="Treatments" id="basic-nav-dropdown"   >
                    <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Divider />
                    <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown>


              <ReactBootStrap.Nav.Link className="navlink"  href="/contact">Contact</ReactBootStrap.Nav.Link>
{!flag ?               <ReactBootStrap.Nav.Link className="navlink"  href="/DoctorLogin">Doctor Login</ReactBootStrap.Nav.Link> : <div></div>}
            
 

  
</ReactBootStrap.Nav>
            
            {width > 1200 ?   <ReactBootStrap.Nav    style = {{marginLeft : "80px"}} className="mr-auto"> 
  

{right}
  
                          </ReactBootStrap.Nav> : 

                            <ReactBootStrap.Nav     className="mr-auto"> 
  

{right}
  
                          </ReactBootStrap.Nav>
                          
                          }

            </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;