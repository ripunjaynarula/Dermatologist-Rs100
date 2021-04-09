import React, { useEffect, useState , useRef} from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import "../css/Navbar.css";
import "./styles.css";
import SelectBox from './navDopdown'
// import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useWindowDimensions from "../functions/windowDimensions";

const NavBar = (props) => {
  
  
  
  
  const [navBackground, setNavBackground] = useState(false)
    const navRef = useRef()
    navRef.current = navBackground
    useEffect(() => {
     console.log(props.type)
     if(props.type === "trans")
     {
       const handleScroll = () => {
        const show = window.scrollY > 20
        if (navRef.current !== show) {
          setNavBackground(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
     }else{
       setNavBackground(true)
     }

    }, [])
  
  
  
  
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
  const right = flag ? (
    <ReactBootStrap.NavDropdown
      className="drop"
      title={
        currentUser == null
          ? ""
          : currentUser.displayName == null
          ? ""
          : currentUser.displayName
      }
      id="basic-nav-dropdown"
    >
      <ReactBootStrap.NavDropdown.Item
        href="/update-profile"
        style={{ fontFamily: "work sans" }}
      >
        Edit Profile
      </ReactBootStrap.NavDropdown.Item>

      <ReactBootStrap.NavDropdown.Item href="#action/3.1" className="tile">
        My Consultations
      </ReactBootStrap.NavDropdown.Item>
      <ReactBootStrap.NavDropdown.Item href="#action/3.3" className="tile">
        My Medical Records
      </ReactBootStrap.NavDropdown.Item>
      <ReactBootStrap.NavDropdown.Item href="#action/3.3" className="tile">
        Need Help
      </ReactBootStrap.NavDropdown.Item>
      <ReactBootStrap.NavDropdown.Item href="/change-password" className="tile">
        Change Password
      </ReactBootStrap.NavDropdown.Item>

      <ReactBootStrap.NavDropdown.Divider />
      <ReactBootStrap.NavDropdown.Item
        variant="link"
        onClick={handleLogout}
        className="tile"
      >
        Log Out
      </ReactBootStrap.NavDropdown.Item>
    </ReactBootStrap.NavDropdown>
  ) : (
    arr.map((elem) => (
      <ReactBootStrap.Nav.Link
        className="navlink"
        href={elem.link}
  style={{ transition: '0.5s ease',  color :  width < 1201 ? "#62636a" :  !navBackground ? "white" : "#62636a" }}        key={elem["link"]}
      >
        {elem["text"]}
      </ReactBootStrap.Nav.Link>
    ))
  );

 
 const conditions = <div aria-labelledby="" class="dropdown-menu show" style={{margin: "0px"}}><a href="/pimples-acne" class="tile dropdown-item">Pimples or Acne</a><a href="#action/3.2" class="tile dropdown-item">Psoriasis</a><a href="#action/3.3" class="tile dropdown-item">Eczema</a><a href="#action/3.3" class="tile dropdown-item">Warts And Molluscumcontagiosum</a><a href="#action/3.3" class="tile dropdown-item">Vitiligo</a><a href="#action/3.3" class="tile dropdown-item">Hyper Pigmentation/ Malesma</a><a href="#action/3.3" class="tile dropdown-item">Fungal Infection</a><a href="#action/3.3" class="tile dropdown-item">Moles or Nevi or skin tags</a><a href="#action/3.3" class="tile dropdown-item">Keloid And Hypertrophic Scar</a><a href="#action/3.3" class="tile dropdown-item">Lichen planus</a><a href="#action/3.3" class="tile dropdown-item">Hair Loss</a><tr><td><a href="#action/3.1" class="tile dropdown-item">Pimples or Acne</a></td><td><a href="#action/3.1" class="tile dropdown-item">Warts And Molluscumcontagiosum</a></td></tr><a href="#action/3.3" class="tile dropdown-item">What Is Hirusitism?</a></div>

 

  async function handleLogout() {
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
    <div className="Navbar" style={{ }}>
      <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bc"  fixed="top" 
      
      
       style={{ transition: '0.3s ease',  backgroundColor : width < 1201 ? "white" : !navBackground ? "transparent" : "white" }}
        >
        <ReactBootStrap.Navbar.Brand id="brand"    style={{ transition: '0.5s ease',  color :  width < 1201 ? "black" : !navBackground ? "white" : "black" }} href="/">
          LOGO
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
            <ReactBootStrap.Nav.Link className="navlink" href="/#"  style={{ transition: '0.5s ease',  color :  width < 1201 ? "#62636a" :  !navBackground ? "white" : "#62636a" }}>
              About
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link className="navlink" href="/blog"  style={{ transition: '0.5s ease',  color :   width < 1201 ? "#62636a" : !navBackground ? "white" : "#62636a" }}>
              Blog
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link className="navlink" href="/videos"  style={{ transition: '0.5s ease',  color :   width < 1201 ? "#62636a" : !navBackground ? "white" : "#62636a" }}>
              Videos
            </ReactBootStrap.Nav.Link>



<SelectBox data = {conditions} title = "Conditions" type = {props.type}></SelectBox>
<SelectBox data = {conditions} title = "Treatments" type = {props.type}></SelectBox>


        
        
          </ReactBootStrap.Nav>

          {width > 1200 ? (
            <ReactBootStrap.Nav
              style={{ marginLeft: width < 1250 ? "80px" : width < 1300 ? "110px" : width < 1350 ? "165px"  : width < 1400 ? "205px" :   width < 1450 ? "280px":  width < 1500 ? "300px":  "350px" }}
              className="mr-auto"
            >
              {right}
            </ReactBootStrap.Nav>
          ) : (
            <ReactBootStrap.Nav className="mr-auto">{right}</ReactBootStrap.Nav>
          )}
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
