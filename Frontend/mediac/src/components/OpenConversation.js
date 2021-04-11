import React, { useEffect, useState, useContext} from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai";
import "./styles.css";
import app from "../firebase";
import {CurrentChatContext} from './App';


function OpenConversation() {
  const [chatData, setChatData] = useState({});
  const { currentUser } = useAuth();
  const history = useHistory();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);


  useEffect(()=>{
    async function getChats(){
      if(!currentUser){
        history.push('/login');
      }
      console.log(currentChat)
      if(currentChat===""){
        return
      }
      const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions={
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({chatId: currentChat})
      };
      let res = await fetch('http://localhost:5000/getChatById', requestOptions);
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      setChatData(res['chats']);
      // chatData['messages'].map(message =>{
      //
      // })
      console.log(chatData);
    }
    getChats();
  }, [currentChat])

  if(chatData['messages']){
    return (

    
      <>
      
      <div className="contacthead">
        
        {chatData['doctorEmail'] === currentUser.email?chatData['patientUsername']:chatData['doctorUsername']} 
        <hr/>
      </div>
      <div className="d-flex flex-column flex-grow-1 chatbg " style={{maxHeight:"460px", marginTop:"-1.7%"}}>
        <div className="flex-grow-1 overflow-auto">
  
  <br/>
  
  
  {chatData['messages'].map(message =>(<>
            <div className={`my-1 d-flex flex-column ${currentUser.email===message['from'] ? "align-self-end align-items-end" : "align-items-start"
                  }`} >
                  <div
                    className={`rounded px-2 py-1 ${ currentUser.email===message['from'] ? "bg-primary text-white" : "bg-light"}`} >
                    {message['text']}
                  </div>
                  <div
                    className={`text-muted small ${ currentUser.email===message['from'] ? "text-right" : ""}`} >
                       {message['time']}
                  </div>
                </div>
                </>
  ))}
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
  }else {
    return(
      <>
        Nothing to show!
      </>
    )
  }
  
}

export default OpenConversation;
