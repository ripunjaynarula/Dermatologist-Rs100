import React, { useEffect, useState, useContext, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import {CurrentChatContext, ChatDataContext, SocketContext} from './App';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import "./styles.css";
import OpenConversation from "./OpenConversation";

function Conversation() {
  const [chats, setChats] = useContext(ChatDataContext);
  const [active, setActive] = useState();
  const { currentUser } = useAuth();
  const [socket, setSocket] = useContext(SocketContext);
  const history = useHistory();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  function handleOpenChat(id,email){
  setCurrentChat(id);
  setActive(email)
}


const handleNewMessage = useCallback((msgData) => {
  let messageDiv = document.getElementById(msgData.from);
  if(!messageDiv) {
    messageDiv = document.getElementById(msgData.to)
  }
  const lastText = messageDiv.children[1];
  lastText.innerHTML = msgData.text;
  const date = messageDiv.children[2];
  date.innerHTML = `<small className="live">${msgData.time}, ${msgData.date}`
}, []);

  useEffect(() => {
    async function getChats() {
      if (!currentUser) {
        history.push("/login");
        
      }
      const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
      };
      let res = await fetch(
        "http://localhost:5000/getChatData",
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      await setChats(res["chats"]);
      console.log(chats);
    }
    getChats();
    if(!socket) return;
    socket.on("update", handleNewMessage);
    return () => socket.off("update");
  }, [socket, handleNewMessage]);

  return (
    <div>
    {isMobile && currentChat!==""?<><OpenConversation /></>:(
      <div className="container">
        <div>
          <div className="top w-100">
            <br />
          </div>

          {chats.map((chat) => (
            <>
            {chat.archieved?(<></>):(
              <div
              className="bottom overflow-auto "
              style={{ height: "350px", fontSize: "13px" }}
              onClick={() => {
                let email= currentUser.email === chat.doctorEmail? chat.patientEmail: chat.doctorEmail
                handleOpenChat(chat.chatId,email);
                
              }}
            >
              <div className={`d-flex justify-content-between align-items-center conv ${active===(currentUser.email === chat.doctorEmail? chat.patientEmail: chat.doctorEmail)? 'convactive':''}`} >
                <div className="d-flex flex-row align-items-center conv w-100" style = {{paddingLeft : "5px", paddingRight : "5px"}}>
                  <div className="image" >
                    {" "}
                    <img
                      src="https://i.imgur.com/jhsYqVT.png"
                      width="50"
                    />{" "}
                    <span className="type"></span>{" "}
                  </div>
                  <div className={`d-flex flex-column line-height ml-2 `} style = {{paddingTop: "10px", paddingBottom : "10px",}} id ={ currentUser.email === chat.doctorEmail? chat.patientEmail: chat.doctorEmail }>
                    {" "}
                    <span className="font-weight-bold">
                      {currentUser.email === chat.doctorEmail
                        ? chat.doctorUsername
                        : chat.patientUsername}
                    </span>{" "}
                    <span>
                      {chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1].text
                        : "Start Conversation"}
                    </span>{" "}
                    <span className="d-flex flex-row align-items-center s-now">
                      <small className="live">
                        {chat.messages.length > 0
                          ? chat.messages[chat.messages.length - 1].time + ", "+ chat.messages[chat.messages.length - 1].date
                          : ""}
                      </small>
                    </span>{" "}
                  </div>
                </div>{" "}
                <span className="dots"> </span>
              </div>
              <hr />
              <br />
            </div>
            )}
            </>
          ))}
        </div>
      </div>
    )}
    </div>
  );
}

export default Conversation;