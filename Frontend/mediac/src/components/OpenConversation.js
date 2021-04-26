import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";

import usersvg from "./img/user.svg";
import Modal from 'react-bootstrap/Modal'

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";

import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import "./styles.css";
import app from "../firebase";
import { CurrentChatContext, ChatDataContext } from "./App";
import loadimg from "./img/loading.webp";
import io from "socket.io-client";
import Conversation from "./Conversation";

function OpenConversation() {
  const messageRef = useRef();
  const [chatData, setChatData] = useState({});
  const { currentUser } = useAuth();
  const history = useHistory();
  const [socket, setSocket] = useState();
  const [prevChat, setPrevChat] = useState("");
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);
  const [chats, setChats] = useContext(ChatDataContext);
  const messageEndRef = useRef(null);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("showing");
  }

  function handleSubmit(e) {
    e.preventDefault();
    var time = new Date();
    var options = {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    };
    
    let msgData = {
      date: time.toLocaleDateString("en", options),
      from: currentUser.email,
      time: time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      text: messageRef.current.value,
    };
    if (socket) {
      socket.emit("send", msgData);
    }
    chatData["messages"].push(msgData);
    //append child
    const chatDiv = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.className =
      "align-items-end my-1 align-self-end flex-column d-flex mine";
    const textDiv = document.createElement("div");
    textDiv.className = "text-white bg-primary py-1 px-2 rounded";
    textDiv.textContent = messageRef.current.value;
    messageDiv.appendChild(textDiv);
    const timeDiv = document.createElement("div");
    timeDiv.className = "text-muted small date text-right";
    timeDiv.textContent = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    messageDiv.appendChild(timeDiv);
    chatDiv.appendChild(messageDiv);
    messageRef.current.value = "";
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
  const handleKeypress = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const handleNewMessage = useCallback((msgData) => {
    if (chatData["messages"]) {
      chatData["messages"].push(msgData);
    }
    //append child
    var time = new Date();
    const chatDiv = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "align-items-start my-1 flex-column d-flex their";
    const textDiv = document.createElement("div");
    textDiv.className = "bg-light py-1 px-2 rounded";
    textDiv.textContent = msgData["text"];
    messageDiv.appendChild(textDiv);
    const timeDiv = document.createElement("div");
    timeDiv.className = "text-muted small date";
    timeDiv.textContent = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    messageDiv.appendChild(timeDiv);
    chatDiv.appendChild(messageDiv);
    messageRef.current.value = "";
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleBackButton = () => {
    console.log("Clicked");
    setCurrentChat("");
  };

  const handleArchiveButton = async () => {
   
    const token = await app.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({ id: currentChat }),
    };
    let res = await fetch(
      "http://localhost:5000/toggleArchive",
      requestOptions
    );
    res = await res.text();
    res = JSON.parse(res);
    chats.map(chat => {
      if(chat.chatId === currentChat){
        chat.archieved = !chat.archieved;
      }
    });
    window.location.reload(false);
  };

  useEffect(() => {
    async function getChats() {
      if (!currentUser) {
        history.push("/login");
      }
      console.log(currentChat);
      if (currentChat === "" || currentChat === prevChat) {
        return;
      }
      setPrevChat(currentChat);
      const newSocket = io("http://localhost:5000/", {
        query: { currentChat },
      });
      setSocket(newSocket);
      const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ chatId: currentChat }),
      };
      let res = await fetch(
        "http://localhost:5000/getChatById",
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      setChatData(res["chats"]);
      console.log(chatData);
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      return () => newSocket.close();
    }
    getChats();
    if (!socket) return;
    socket.on("new-message", handleNewMessage);
    return () => socket.off("new-message");
  }, [currentChat, socket, handleNewMessage]);

  if (chatData["messages"]) {
    return (
      <>
      <div className="chat" style={{height:"100%", zIndex:"1"}}>
        <div className="contacthead">
          <div style={{ float: "left" }}>
            {isMobile ? (
              <>
                <Button onClick={handleBackButton}>
                  <AiOutlineArrowLeft />
                </Button>
                &nbsp;&nbsp;
              </>
            ) : (
              <></>
            )}
            <img id="userimg" style={{ width: "13%" }} src={usersvg} />
            &nbsp;&nbsp;
            {chatData["doctorEmail"] === currentUser.email
              ? chatData["patientUsername"]
              : chatData["doctorUsername"]}
          </div>

          <hr />
          <div style={{ float: "right" }}>
            <Button alt="Archive/Unarchive" id="cancelbtn" onClick={handleShow}>
              <FiArchive/>
            </Button>
          </div>
        </div>
        <div
          className="d-flex flex-column flex-grow-1 chatbg "
          style={{ marginTop: "-1.7%" }}
          id="chatbox"
        >
          <div className="flex-grow-1 overflow-auto" id="chatMessages">
            <br />

            {chatData["messages"].map((message) => (
              <>
                <div
                  className={`my-1 d-flex flex-column ${
                    currentUser.email === message["from"]
                      ? "align-self-end align-items-end mine"
                      : "align-items-start their"
                  }`}
                >
                  <div
                    className={`rounded px-2 py-1 ${
                      currentUser.email === message["from"]
                        ? "bg-primary text-white"
                        : "bg-light"
                    }`} style = {{marginTop: "4px", marginLeft : "4px", marginRight : "4px", }}
                  >
                    {message["text"]}
                  </div>
                  <div
                    className={`text-muted small date ${
                      currentUser.email === message["from"] ? "text-right" : ""
                    }`}
                    style = {{marginLeft : "4px", marginRight : "4px"}}
                  >
                    {message["time"]}
                  </div>
                </div>
              </>
            ))}
            <div ref={messageEndRef}></div>
          </div>



         



          <Form onSubmit={handleSubmit} autocomplete="off">
            <Form.Group className="m-2">
              <InputGroup id="bottommsg" style={{ height: "40px" }}>
                <Form.Control
                  id="sendmsg"
                  as="textarea"
                  ref={messageRef}
                  required
                  placeholder="Type your message here..."
                  onKeyPress={(event) => {
                    if (event.key == "Enter") {
                      handleSubmit(event);
                    }
                  }}
                  style={{
                    height: "40px",
                    resize: "none",
                    borderRadius: "4px",
                    display: "flex",
                    fontSize: "14px",
                    paddingTop: "8px",
                  }}
                />
                <InputGroup.Append>
                  <Button type="submit" onKeyPress={handleKeypress}>
                    <AiOutlineSend style={{ marginTop: "-3px" }} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleArchiveButton}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center   p-5"
          style={{ marginTop: "5%", backgroundColor: "white !important" }}
        >
          <img src={loadimg} />
        </div>
      </>
    );
  }
}

export default OpenConversation;
