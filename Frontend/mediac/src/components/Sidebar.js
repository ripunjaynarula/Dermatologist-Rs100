import React, { useRef, useState, useEffect } from "react";
import { Tab, Nav, Button, Modal, Form } from "react-bootstrap";
import Conversation from "./Conversation";
import Archive from "./Archive";

import "./styles.css";
const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'
function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  
const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
const conversationsOpen = activeKey === CONVERSATIONS_KEY


  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <div  className="d-flex flex-column" style={{minHeight:"500px"}}>
        <Tab.Container >
        <div className="justify-content-center">
            <Form.Group>
              <Form.Control
                type="text"
                className="w-100"
                placeholder="Search"
                required
              />
            </Form.Group>
          </div>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Archived</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY} style={{backgroundColor:"white"}}>
            <Conversation />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY} style={{backgroundColor:"white"}}>
            <Archive />
          </Tab.Pane>
        </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default Sidebar;
