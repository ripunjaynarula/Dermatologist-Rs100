import React, { useRef, useState, useEffect } from "react";
import { Tab, Nav, Button, Modal, Form } from "react-bootstrap";
import Conversation from "../Conversation";
import Archive from "./Archive";
import { AiOutlineSearch } from 'react-icons/ai';

import "../styles.css";
const CONVERSATIONS_KEY = "conversations";
const archive_KEY = "archive";
function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <div className="d-flex flex-column" style={{ minHeight: "500px" }}>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
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
                           <h5 style = {{marginLeft : "5px", fontWeight: "bold"}}>Chats</h5>

          <Tab.Content className="border-right overflow-auto flex-grow-1">
            <Tab.Pane
              eventKey={CONVERSATIONS_KEY}
              style={{ backgroundColor: "white" }}
            >
              <Conversation />
            </Tab.Pane>
            
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default Sidebar;
