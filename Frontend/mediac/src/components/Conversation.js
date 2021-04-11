import React, { useEffect, useState, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import {CurrentChatContext} from './App';

import "./styles.css";

function Conversation() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

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
  }, []);

  return (
    <div>
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
              onClick={handleChatOpen(chat.id)}
            >
              <div className="d-flex justify-content-between align-items-center" >
                <div className="d-flex flex-row align-items-center conv w-100">
                  <div className="image">
                    {" "}
                    <img
                      src="https://i.imgur.com/jhsYqVT.png"
                      width="50"
                    />{" "}
                    <span className="type"></span>{" "}
                  </div>
                  <div className="d-flex flex-column line-height ml-2">
                    {" "}
                    <span className="font-weight-bold">
                      {currentUser.email == chat.doctorEmail
                        ? chat.patientUsername
                        : chat.doctorUsername}
                    </span>{" "}
                    <span>
                      {chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1].text
                        : "Start Conversation"}
                    </span>{" "}
                    <span className="d-flex flex-row align-items-center s-now">
                      <small className="live">
                        {chat.messages.length > 0
                          ? chat.messages[chat.messages.length - 1].date
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
    </div>
  );
}

export default Conversation;
