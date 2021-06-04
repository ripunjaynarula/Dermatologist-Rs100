import React, { useRef, useState, useEffect } from "react";
import { Tab, Nav, Button, Modal, Form } from "react-bootstrap";
import Conversation from "../Conversation";
import Archive from "./Archive";
import { AiOutlineSearch } from 'react-icons/ai';
import useWindowDimensions from "../../functions/windowDimensions";
 import Tabs, { TabPane } from "rc-tabs";

import "../styles.css";
const CONVERSATIONS_KEY = "conversations";
const archive_KEY = "archive";
  var key = CONVERSATIONS_KEY

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
                    {/* <Tabs defaultActiveKey={key}  tabPosition="top" tabBarStyle= {{  outline : "none"}} >

     <TabPane tab="Conversations"  key="conversations" style = {{marginTop:"-10px", marginLeft:"-10px"}}>
              <Conversation type = "conver" key = "r" />
              </TabPane>
        


           <TabPane tab="Archives"  key="archive" style = {{marginTop:"-10px", marginLeft:"-10px"}}>
               <Archive type = "archive" key = "ss" />
              </TabPane>
        


</Tabs> */}


        <Tab.Container activeKey={activeKey} unmountOnExit = {true} variant = {"pills"} mountOnEnter={true} onSelect={(k) => {setActiveKey(k)}}>
         
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
            <div>
              <Conversation type = "archive" key = "archiveLEy" />
            </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
    
    
    
      </div>
    </div>
  );
}

export default Sidebar;
