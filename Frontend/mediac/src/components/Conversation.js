import React, { useEffect, useState, useContext, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import {CurrentChatContext, ChatDataContext, SocketContext,AdditionalChatContext} from './App';
import useWindowDimensions from "../functions/windowDimensions";
import io from "socket.io-client";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import "./styles.css";
import OpenConversation from "./OpenConversation";

function Conversation(props) {
  const [chats, setChats] = useContext(ChatDataContext);
  const [active, setActive] = useState();
  const { currentUser } = useAuth();
  const [socket, setSocket] = useContext(SocketContext);
  const history = useHistory();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);
  const [data, setData] = useContext(AdditionalChatContext)
   const { height, width } = useWindowDimensions();
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setCurrentName] = useState("")
  const [image, setCurrentImage] = useState("")
  const [error, setError] = useState(false)
  
  function handleOpenChat(id, name, image, doctorEmail){
  setCurrentImage(image)
  setCurrentName(name)
  setData({
    image: image,
    name: name
  })
  for(var i=0;i<chats.length; i++)
  {
    if(chats[i].chatId === id)
    {
      if(currentUser.email === chats[i].doctorEmail && !chats[i].doctorRead){
      chats[i].doctorRead = true
    }else if(currentUser.email === chats[i].patientEmail && !chats[i].patientRead)
    {
      chats[i].patientRead = true
    }
    }
  }

  setChats(chats)
  
  width > 600 && setActive(id)
  setCurrentChat(id);
  readMessage(doctorEmail,id)

} 
  const readMessage = (doctorEmail, id)=>{
    var msg = {
      
    }
 
    if (doctorEmail === currentUser.email)
    {
      msg = {
        doctorRead : true
      }
    }else{
        msg = {
          patientRead : true
      }  
    }
    
    var data = {
      chatId: id,
      msg
    }
 
        if (socket) {
            socket.emit("read", data);
        }
  }

const handleNewMessage = useCallback((msgData) => {
  console.log(msgData, "===========")
  let messageDiv = document.getElementById(msgData.chatId);
  if(messageDiv)
  {
     var lastText = messageDiv.children[1];
  lastText.innerHTML = msgData.text;
  const date = messageDiv.children[2];
  date.innerHTML = `<small className="live">${dateAndTime(msgData.timestamp)}`
  }
}, []);


useEffect(()=>{
  if(!socket) return;
    socket.on("update", handleNewMessage);
    return () => socket.off("update");
 }, [socket,  handleNewMessage])



  useEffect(() => {
    async function getChats() {
      if(isLoaded) return
      if (!currentUser) {
        history.push("/login");
        
      }
      
      try{
  console.log("LADKADADAKDOKADOKA", props.type)
    const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body :JSON.stringify({
          type : props.type
        })
      };
      let res = await fetch(
        process.env.REACT_APP_API_URL + 'getChatData',
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      if(res.docs)
      for(var i=0; i<res.docs.length; i++)
      {
        for(var j=0; j<res.chats.length; j++ )
        {
          if(res.docs[i].email === res.chats[j].doctorEmail)
          {
                      console.log(res.docs[i].email, res.chats[j].doctorEmail)

            res.chats[j].profileImage = res.docs[i].profileImage
            res.chats[j].doctorName = "Dr. "+res.docs[i].name
          }
        }
      }
      setIsLoaded(true)
      await setChats(res["chats"]);
      console.log(chats);
      }catch(e){
setError(true)
      setIsLoaded(true)
      }    }
    getChats();
    
  }, []);







  return (
 
  
   !isLoaded ? <div></div>
   : error ? <div>Connection Error</div>:
      <div>
    {width < 601 && currentChat!==""?<><OpenConversation image = {image} name = {"name"} /></>:(
      <div className="container">
        <div>
          {width > 600 && <div className="top w-100">
            <br />
          </div>}

            <div style = {{height: width < 601 ? height - "56" : "400px", overflowY:"auto"}}>


   {chats.map((chat) => (
            <>
            {chat.archieved?(<></>):(
              <div
              className="overflow-auto"
              style={{ fontSize: "13px" }}
              onClick={() => {
                 handleOpenChat(chat.chatId, currentUser.email !== chat.doctorEmail
                        ? chat.doctorName ? chat.doctorName: chat.doctorUsername 
                        : chat.patientUsername, chat.profileImage ? chat.profileImage : "https://i.imgur.com/jhsYqVT.png", chat.doctorEmail);
                
              }}
            >
              <div id ={"th"+ chat.chatId } className={`d-flex justify-content-between align-items-center conv ${active===chat.chatId? 'convactive': (currentUser.email === chat.doctorEmail && !chat.doctorRead) ? 'unread' : (currentUser.email === chat.patientEmail && !chat.patientRead) && "unread"}`} >
                <div className="d-flex flex-row align-items-center conv w-100" style = {{paddingLeft : "5px", paddingRight : "5px"}}>
                  <div  >
                    {" "}
                    <img className="pf-image" src={chat.profileImage ? chat.profileImage : "https://i.imgur.com/jhsYqVT.png"} alt = "" width="50" />{" "}
                    <span className="type"></span>{" "}
                  </div>
                  <div className={`d-flex flex-column line-height ml-2 `} style = {{paddingTop: "10px", paddingBottom : "10px",}} id ={ chat.chatId }>
                    {" "}
                    <span className="font-weight-bold">
                      {currentUser.email !== chat.doctorEmail
                        ? chat.doctorName ? chat.doctorName: chat.doctorUsername 
                        : chat.patientUsername}
                    </span>{" "}
                    <span>
                      {chat.lastMessage 
                        ? chat.lastMessage
                        : "Start Conversation"}
                    </span>{" "}
                    <span className="d-flex flex-row align-items-center s-now">
                      <small className="live">
                        {  chat.updated_at && dateAndTime(chat.updated_at)
                           }
                      </small>
                    </span>{" "}
                  </div>
                </div>{" "}
                <span className="dots"> </span>
              </div>
              <hr />
            </div>
            )}
            </>
          ))}



            </div> 
        
        </div>
      </div>
    )}
    </div>
  
  );
}




















function dateAndTime(unixtime) {
var d = (new Date(unixtime)).toLocaleString().split(":")

      return  d[0] + ":"+d[1]
    };

  function time(unixtime) {
  var t = new Date(unixtime) 
var d = t.getHours()
var am = "AM"
if(d>12) {
  am = "PM"
  d = d-12
}
      return  d + ":"+ t.getMinutes() + " " + am
    };
export default Conversation;