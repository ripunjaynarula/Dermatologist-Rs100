import React, { useRef, useState, useEffect } from "react"
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversation from './Conversation'
function Sidebar() {

    const [modalOpen, setModalOpen] = useState(false)
  function closeModal() {
    setModalOpen(false)
  }

    return (
        <div>
            <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Item >Conversations</Nav.Item>
          </Nav.Item>
          
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane >
            <Conversation/>
          </Tab.Pane>
          
        </Tab.Content>
        {/* <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted"></span>
        </div> */}
        {/* <Button onClick={() => setModalOpen(true)} className="rounded-0">
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button> */}
      </Tab.Container>

      {/* <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ?
          <NewConversationModal closeModal={closeModal} /> :
          <NewContactModal closeModal={closeModal} />
        }
      </Modal> */}
    </div>
        </div>
    )
}

export default Sidebar
