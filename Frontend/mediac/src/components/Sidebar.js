import React, { useRef, useState, useEffect } from "react";
import { Tab, Nav, Button, Modal, Form } from "react-bootstrap";
import Conversation from "./Conversation";
import "./styles.css";

function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <div  className="d-flex flex-column" style={{minHeight:"500px"}}>
        <Tab.Container>
          <div className="justify-content-center">
            <Form.Group style={{ paddingTop: 14 }}>
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
              <b>Conversations</b>
            </Nav.Item>
          </Nav>
          <Tab.Content className=" overflow-auto flex-grow-1">
            <Conversation />
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default Sidebar;
