import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext"
import  { useEffect } from 'react';
import { useHistory, Link } from "react-router-dom"
import SelectBox from "./navDopdown";
import useWindowDimensions from "../functions/windowDimensions";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  
  SidebarContent,
  
} from "react-pro-sidebar";
import logoutic from "./img/logout.svg"
import blogic from "./img/blog.svg"
import chatic from "./img/chat.svg"
import editProf from "./img/proileEdit.svg"
import addBlog from "./img/writing.svg"
import addVideo from "./img/video-marketing.svg"

import myVideo from "./img/youtube.svg"

//import icons from react icons
import { FaList } from "react-icons/fa";
import {  FiArrowLeftCircle, FiArrowRightCircle,FiArrowRight,FiArrowLeft, FiAlignJustify} from "react-icons/fi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";


const Header = (props) => {
  const arr = [{link: '/login', text: 'Login'}, {link: '/Signup', text: 'Signup'}];
  // const menuIconClick = () => {
  //   //condition checking to change state from true to false and vice versa
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };
  const [flag, setFlag] = useState(false);
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()
  const [name, setName] = useState("");

const [show, setShow] = useState(false);
const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}

  const { height, width } = useWindowDimensions();

  async function handleLogout(e) {
    setError("")

        e.preventDefault();

    try {
      await logout()
          setFlag(false);

      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


  const doctorDrop = (
    <div
      aria-labelledby=""
      class="dropdown-menu show"
      style={{ margin: "0px" }}
    >
          <a href="/doctordashboard" class="tile dropdown-item">
        Dashboard
      </a>
          <a href="/my-profile" class="tile dropdown-item">
        My Profile
      </a>
      <a href="/update-doctor" class="tile dropdown-item">
        Edit Profile
      </a>
      <a href="/chat/d" class="tile dropdown-item">
        Chats
      </a>
     
   
       <a href="/my-blogs" class="tile dropdown-item">
         My Blogs
      </a>
        <a href="/my-videos" class="tile dropdown-item">
         My Videos
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
              data={ doctorDrop}
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
             "#62636a",
        }}
        key={elem["link"]}
      >
        {elem["text"]}
      </ReactBootStrap.Nav.Link>
    ))
  );
  useEffect( () => {
 
 console.log(currentUser)
    if (currentUser) {
 
      setFlag(true);
      return
    }
    setFlag(false);
  }, [currentUser, setFlag])

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
   
    <div>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
         
          
            {/* <div className="closemenu" id="pcarrow" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div> */}
          <SidebarContent>

             <Menu iconShape="square">
              <MenuItem active = {props.selected === "chat" ? true : false}  icon = {<img src = {chatic} alt = "" height ="22px"></img>}><a href= "/chat/d" style = {{color : "white"}}>Chats</a> 

          </MenuItem>
              <MenuItem active = {props.selected === "addBlog" ? true : false}  icon = {<img src = {addBlog} alt = "" height ="22px"></img>}><a href= "/add-blog" style = {{color : "white"}}>Add Blogs</a> 
</MenuItem>
              <MenuItem active = {props.selected === "myblog" ? true : false}  icon = {<img src = {blogic} alt = "" height ="22px"></img>}><a href= "/my-blogs" style = {{color : "white"}}>My Blogs</a> 
</MenuItem>
              <MenuItem active = {props.selected === "add-video" ? true : false}  icon = {<img src = {addVideo} alt = "" height ="22px"></img>}><a href= "/add-video" style = {{color : "white"}}>Add Video</a> 
</MenuItem>
              <MenuItem active = {props.selected === "my-videos" ? true : false}  icon = {<img src = {myVideo} alt = "" height ="22px"></img>}><a href= "/my-videos" style = {{color : "white"}}>My Videos</a> 
</MenuItem>

 
 <MenuItem active = {props.selected === "edit" ? true : false}  icon = {<img src = {editProf} alt = "" height ="22px"></img>}><a href= "/update-doctor" style = {{color : "white"}}>Edit Profile</a> 
</MenuItem>
              <MenuItem  icon = {<img src = {logoutic} alt = "" height ="22px"></img>}><a href= "#" style = {{color : "white"}} onClick = {handleLogout}>Log Out</a> </MenuItem>

 <MenuItem active = {props.selected === "noti" ? true : false}  ><a href= "/notification" style = {{color : "white", fontSize:"14.4px"}}>Notification Register</a> 
</MenuItem>

            </Menu>
          </SidebarContent>
          
        </ProSidebar>
      
      </div>
      </div>
      <div className="Navbar" style={{position:"fixed", zIndex:"2", width:"100%"}}>
            <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bc">
            <div className="closemenu"  onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiAlignJustify id="arrow"/>
              ) : (
                <FiAlignJustify id="arrow"/>
              )}
            </div>
            <ReactBootStrap.Navbar.Brand id="brand2" style={{color: "black",marginLeft:"30px"}} href="/">LOGO</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto"> 
    

   



              </ReactBootStrap.Nav >
                   <ReactBootStrap.Nav className="mr-auto"> 
    

   



              </ReactBootStrap.Nav ><ReactBootStrap.Nav className="mr-auto"> 
    

   



              </ReactBootStrap.Nav >
            <ReactBootStrap.Nav className="mr-auto"> 
    

   



              </ReactBootStrap.Nav ><ReactBootStrap.Nav className="mr-auto"> 
    

   



              </ReactBootStrap.Nav ><ReactBootStrap.Nav className="mr-auto"> 
    

   



              </ReactBootStrap.Nav >
              { (
            <ReactBootStrap.Nav className="form-inline"
              style={{
                marginLeft:   "350px",
                    
              }}
              className="mr-auto"
            >
              {right}
            </ReactBootStrap.Nav>
          ) }
           </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
        </div>
    </>
  );
};

export default Header;