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
        <Tab.Container activeKey={activeKey} onSelect={(k) => {setActiveKey(k)}}>
          <div className="justify-content-center">
            <Form.Group>
              {/* <Form.Control
                type="text"
                className="w-100"
                placeholder="Search"
                required
              /> */}
            </Form.Group>
          </div>
          <Nav variant="tabs" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey={CONVERSATIONS_KEY}>
                <b>Conversations</b>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={archive_KEY}>
                <b>Archived</b>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="border-right overflow-auto flex-grow-1">
            <Tab.Pane
              eventKey={CONVERSATIONS_KEY}
              style={{ backgroundColor: "white" }}
            >
              <Conversation type = "conver" key = "r" />
            </Tab.Pane>
            <Tab.Pane
              eventKey={archive_KEY}
              style={{ backgroundColor: "white" }}
            >
               <Archive type = "archive" key = "ss" />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default Sidebar;
