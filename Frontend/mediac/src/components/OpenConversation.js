import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { AiOutlineSend } from "react-icons/ai";
import "./styles.css";

function OpenConversation() {
  return (
    <>
    <div className="contacthead">
      
      Shivansh
      <hr/>
    </div>
    <div className="d-flex flex-column flex-grow-1 chatbg " style={{maxHeight:"460px", marginTop:"-1.7%"}}>
      <div className="flex-grow-1 overflow-auto">

<br/>

        <div className="d-flex flex-column align-items-start justify-content-end px-3 " style={{fontSize: "15px"}}>
          <div className="my-1 d-flex flex-column align-self-end align-items-end">
            <div className={`rounded px-2 py-1 bg-primary text-white`}>
              <p>okay</p>
            </div>
            <div className={`text-muted small text-right `}>
              <p>13:38</p>
            </div>
          </div>
        </div>


        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          <div className="my-1 d-flex flex-column align-items-start">
            <div className={`rounded px-2 py-1 bg-light`}>
              <p>okay</p>
            </div>
            <div className={`text-muted small text-right `}>
              <p>13:38</p>
            </div>
          </div>
        </div>





      </div>
      <Form>
        <Form.Group className="m-2">
          <InputGroup style={{ height: "40px" }}>
            <Form.Control
              as="textarea"
              required
              placeholder="Type your message here..."
              style={{ height: "40px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">
                <AiOutlineSend style={{marginTop:"-3px"}}/>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
    </>
  );
}

export default OpenConversation;
