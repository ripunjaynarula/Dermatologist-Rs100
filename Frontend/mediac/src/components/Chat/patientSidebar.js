import React, { useRef, useState, useEffect } from "react";
import { Tab, Nav, Button, Modal, Form } from "react-bootstrap";
import Conversation from "../Conversation";
import Archive from "./Archive";
import { AiOutlineSearch } from 'react-icons/ai';
import useWindowDimensions from "../../functions/windowDimensions";

import "../styles.css";
const CONVERSATIONS_KEY = "conversations";
const archive_KEY = "archive";
function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;
   const { height, width } = useWindowDimensions();

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <div className="d-flex flex-column" style={{ minHeight: "500px" }}>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <div className="justify-content-center">
{width>600 &&                           <h4 style = {{  fontFamily: "roboto", marginLeft : "8px", fontSize: "20px", marginTop : "5px" }}>Chat</h4>
}
            <Form.Group>
              {/* <Form.Control
                type="text"
                className="w-100"
                placeholder="Search"
                required
              /> */}
            </Form.Group>
          </div>



         {width>600 &&  <Nav variant="tabs" className="justify-content-center">
           
          
          </Nav>}
          <Tab.Content className={width>600 ? "border-right overflow-auto": "overflow-auto"}>
                         <Conversation />

            
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default Sidebar;
