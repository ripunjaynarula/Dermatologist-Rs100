import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import "./styles.css";
import app from "../firebase";
import "./styles.css";

function Archive() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();

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
              {chat.archieved ? (
                <div
                className="bottom overflow-auto "
                style={{ height: "350px", fontSize: "13px" }}
                onClick={() => {
                  let email= currentUser.email == chat.doctorEmail? chat.patientEmail: chat.doctorEmail
                  handleOpenChat(chat.chatId,email);
                  
                }}
              >
                <div className={`d-flex justify-content-between align-items-center conv ${active===(currentUser.email == chat.doctorEmail? chat.patientEmail: chat.doctorEmail)? 'convactive':''}`} >
                  <div className="d-flex flex-row align-items-center conv w-100">
                    <div className="image">
                      {" "}
                      <img
                        src="https://i.imgur.com/jhsYqVT.png"
                        width="50"
                      />{" "}
                      <span className="type"></span>{" "}
                    </div>
                    <div className={`d-flex flex-column line-height ml-2 `}>
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
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Archive;
