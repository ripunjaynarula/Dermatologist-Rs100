import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";

import usersvg from "./img/user.svg";
import Modal from "react-bootstrap/Modal";
import ConfirmationModal from "./utility/confirmationModal";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { GrAttachment,GrDocument,GrPhone,GrArchive, GrClose } from "react-icons/gr";
 import {uploadFile} from './utility/functionUploadImage'
import {reactLocalStorage} from 'reactjs-localstorage';

import useWindowDimensions from "../functions/windowDimensions";

 
import { Form, InputGroup, Button, Spinner,Tooltip ,OverlayTrigger,Popover} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory,Link } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import "./styles.css";
import app from "../firebase";
import { CurrentChatContext, ChatDataContext, SocketContext ,AdditionalChatContext} from "./App";
import loadimg from "./img/loading.webp";
import io from "socket.io-client";
import Conversation from "./Conversation";
import ImageModal from './utility/imageModal'
import Prescription from './Prescription/AddPrescription'
import {stopfile} from './utility/alertUploadFile'

function OpenConversation() {
  const messageRef = useRef();
  const [chatData, setChatData] = useState({});
  const { currentUser } = useAuth();
  const history = useHistory();
  const [socket, setSocket] = useContext(SocketContext);
  const [prevChat, setPrevChat] = useState("");
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);
  const [chats, setChats] = useContext(ChatDataContext);
  const messageEndRef = useRef(null);
  const { height, width } = useWindowDimensions();
  const [chatAdditional, setChatAdditiona] = useContext(AdditionalChatContext);
  const [isDoctor, setIsDoctor] = useState(false)
  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = () => setShow(false);
  const [imageUrl, setImageUrl] = useState("")
  const [showImage, setShowImage] = useState(false)
    const [showPrescription, setShowPrescription] = useState(false)
  const [consultationData, setConsultatinData] = useState({});
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [file, setFile] = useState(null)
  const [showOverlay, setShowOverlay] = useState(false)
     const [confirmMessage, setConfirmMessage] = useState(()=>{})
     const [prescLoad, setPrescLoad] = useState(()=>{})
     const [doc, setDoc] = useState(false)
       const [isEnded, setIsEnded] = useState(false)
  const [isDead, setIsDead] = useState(false)
const [daysLeft, setDaysLeft] = useState(5)
  useEffect( () => {
    console.log(process.env.REACT_APP_API_URL)
     onlyOnce();
  }, [] )

async function onlyOnce()  {
  if(!currentUser) return;
  var role =  reactLocalStorage.get('role') 
 
  if(role === undefined) role  = "";
 
  
  if (role === "doctor" )
   { 
setDoc(true)
   }}
  const togglePresc = (e) => {
    if(e)
    e.preventDefault()
  setShowOverlay(false)
    setShowPrescription(!showPrescription);
   };

   const handleClick = event => {
         hiddenFileInput.current.click();

  };

    const hiddenFileInput = React.useRef(null);


       const handlePresc = (e) => {
         e && e.preventDefault()
         setShowOverlay(false)
  
         hiddenFileInputPresc.current.click();

  };



    const hiddenFileInputPresc = React.useRef(null);
   const onChangePicture = async (e) => {
      if (e.target.files && e.target.files[0]){
      if(stopfile(e.target.files[0])){
        return
      }
      setIsFileUploading(true)
 
  var r = await uploadFile(e.target.files[0], 'get-upload-chatfile', currentUser, socket,    chatData["doctorEmail"] === currentUser.email
          ? chatData["patientEmail"]
          : chatData["doctorEmail"], currentChat, 'image',chatAdditional.name, chatData)


     setIsFileUploading(false)
    if(r.chatId === currentChat)
    {
      appendChild("image", r.url)
    }else{

    }



    }
   
   }
   

      const onSendPresc = async (e) => {
      if (e.target.files && e.target.files[0]){
     if(stopfile(e.target.files[0])){
        return
      }       setPrescLoad(true)
  var r = await uploadFile(e.target.files[0], 'get-upload-chatfile', currentUser, socket,    chatData["doctorEmail"] === currentUser.email
          ? chatData["patientEmail"]
          : chatData["doctorEmail"], currentChat, "pres",chatAdditional.name, chatData)


     setPrescLoad(false)
    if(r.chatId === currentChat)
    {
       appendChild("pres", r.url)
    }else{

    }



    }
   
   }
   



  const toggleImage = ()=> setShowImage(false)
  const changeShowImage = (image)=>{
       setImageUrl(image)
       setShowImage(true)
  }
  const handleShow = () => {
    setShow(true);
   };
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete Conversation
  </Tooltip>
);
const sendFileTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Send file
  </Tooltip>
);
const toggleOverlay = () => {
    setShowOverlay(!showOverlay)

}
function prescriptionTooltip (props){

    return   <Tooltip id="presc-tooltip" {...props}  >
<div className = "overlay">

    <a href = "#" onClick = {handlePresc} >
        Image Prescription
      </a>
 </div>

<div  className = "overlay">
        <a href = "#"  onClick={togglePresc} >Digital Prescription</a>

</div>

      </Tooltip>
  
}
const callTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
   Call
  </Tooltip>
);
const endTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    End Consultation
  </Tooltip>
);

 


  function handleSubmit(e) {
    e.preventDefault();
    if (!messageRef) return;
    if (!messageRef.current) return;
    if (!messageRef.current.value.trim()) return;
   

    let msgData = {
      chatId: currentChat,
      from: currentUser.email,
      to:
        chatData["doctorEmail"] === currentUser.email
          ? chatData["patientEmail"]
          : chatData["doctorEmail"],
 
      text: messageRef.current.value,
    };
    msgData.timestamp = Date.now()
        var data = {
       patientRead : chatData["doctorEmail"] === currentUser.email ? false : true,
            doctorRead :chatData["doctorEmail"] === currentUser.email ? true : false,
            msgData
    }
    if (socket) {
      socket.emit("send", data);
    }
    chatData["messages"].push(msgData);
    // append child
   appendChild("text", "")
  }

  function appendChild(type, url){
    var time = new Date();
    var options = {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    };
    try{
    const chatDiv = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "align-items-end my-1 align-self-end flex-column d-flex mine";
    var textDiv;
    if(type === "text")
    {
    
      textDiv = document.createElement("div");
      textDiv.className = "text-white bg-primary py-1 px-2 rounded";
       textDiv.textContent = messageRef.current.value;
        messageRef.current.value = "";
 


    }else if(type === "image" || type === "pres"){
      
      textDiv = document.createElement("div");
      textDiv.className = "text-white bg-primary py-1 px-2 rounded chat-image";
      textDiv.onclick = function clickHandler(){
        changeShowImage(url)
        };
      var  imgChild = document.createElement("img")
      imgChild.src = url
      textDiv.appendChild(imgChild);
       if(type === "pres")
      {
             
                var br = document.createElement("br")
                                var p = document.createElement("p")

          p.textContent = "Prescription"
             textDiv.appendChild(br)

            textDiv.appendChild(p)
      }
    }
    
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
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }catch(e){}
  }


  const handleKeypress = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const readMessage = ()=>{
    var msg = {
      
    }
    console.log(chatData)
    console.log(currentUser.email)
    if (chatData["doctorEmail"] === currentUser.email)
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
      chatId: currentChat,
      msg
    }
    console.log(data, "------------")
       if (socket) {
            socket.emit("read", data);
        }
  }
  const handleNewMessage = useCallback((msgData) => {
    readMessage()
    if (chatData["messages"]) {
      chatData["messages"].push(msgData);
    }
    //append child 
    var time = new Date();
    const chatDiv = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    console.log(currentUser.email, msgData.from)
     messageDiv.className = currentUser.email === msgData.from ? "align-items-end my-1 align-self-end flex-column d-flex mine" :"align-items-start my-1 flex-column d-flex their";
    var textDiv;
    if(msgData.type ==="image" || msgData.type ==="pres")
    {
 

         textDiv  = document.createElement("div");
    textDiv.className =   currentUser.email === msgData.from ? "text-white bg-primary py-1 px-2 rounded chat-image" : "bg-light py-1 px-2 rounded chat-image" ;
 textDiv.onclick = function clickHandler(){
      changeShowImage(process.env.REACT_APP_CDN_URL+msgData.url)
      };
     var  imgChild = document.createElement("img")
     imgChild.src = process.env.REACT_APP_CDN_URL+msgData.url
        textDiv.appendChild(imgChild); 
            if(msgData === "pres")
      {
             
                var br = document.createElement("br")
                                var p = document.createElement("p")

          p.textContent = "Prescription"
             textDiv.appendChild(br)

            textDiv.appendChild(p)
      }   
    }else{
   
     textDiv  = document.createElement("div");
    textDiv.className = currentUser.email === msgData.from ? "text-white bg-primary py-1 px-2 rounded" :"bg-light py-1 px-2 rounded";
    textDiv.textContent = msgData["text"];
       
        }
        messageDiv.appendChild(textDiv);
//
    const timeDiv = document.createElement("div");
    timeDiv.className =  currentUser.email === msgData.from ? "text-muted small date text-right": "text-muted small date";
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
function callback(url){
    console.log(url)    
       let msgData = {
            chatId: currentChat,
            from: currentUser.email,
            to: chatData["doctorEmail"] === currentUser.email
          ? chatData["patientEmail"]
          : chatData["doctorEmail"],
            type: "pres",
            text: "Prescription",
            url: url,
           
        };
    var data = {
       patientRead : chatData["doctorEmail"] === currentUser.email ? false : true,
            doctorRead :chatData["doctorEmail"] === currentUser.email ? true : false,
            msgData
    }
     setTimeout(function(){
        if (socket) {
            socket.emit("send", data);
        }
       appendChild("pres", process.env.REACT_APP_CDN_URL+ url)
       console.log("end")

      return true;
      },1200);
    
 
 }
  const handleArchiveButton = async () => {
  try{
  const token = await app.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({ id: currentChat, type : "end" }),
    };
      let res = await fetch(
          process.env.REACT_APP_API_URL + 'toggleArchive',
          requestOptions
        );
        res = await res.text();
        res = JSON.parse(res);
        if(res.success)
        {
            window.location.reload(false);

        }
  
  }catch(e){

  }
  };

    const handleDeleteButton = async () => {
  try{
  const token = await app.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({ id: currentChat, type : 'delete' }),
    };
      let res = await fetch(
          process.env.REACT_APP_API_URL + 'toggleArchive',
          requestOptions
        );
        res = await res.text();
        res = JSON.parse(res);
        if(res.success)
        {
            window.location.reload(false);

        }
  
  }catch(e){

  }
  };


  useEffect(() => {
    async function getChats() {
      setError(false);
      if (!currentUser) {
        history.push("/login");
      }
      console.log(currentChat);
      if (currentChat === "" || currentChat === prevChat) {
        return;
      }
      setChatData({});
      setPrevChat(currentChat);
      try {

        const token = await app.auth().currentUser.getIdToken(true);
        const newSocket = io(process.env.REACT_APP_API_URL, {query: { currentChat , }}, {transports: ['websocket']});
        setSocket(newSocket);
        setisLoading(true);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json", token: token },
          body: JSON.stringify({ chatId: currentChat }),
        };
        let res = await fetch(
          process.env.REACT_APP_API_URL + 'getChatById',
          requestOptions
        );
        res = await res.text();
        res = JSON.parse(res);
        console.log(res);
        if(res.role === "doctor"){ setIsDoctor(true)}
        else{
          setIsEnded(res.isEnded)
          setIsDead(res.isBlocked)
          setDaysLeft(res.daysLeft)
        }
        setChatData(res["chats"]);
        setConsultatinData(res.data)
           setisLoading(false);
 
      console.log(chatData);
      if (messageEndRef)
        if (messageEndRef.current)
          messageEndRef.current.scrollIntoView({ behavior: "auto" });
      return () => newSocket.close();
      } catch (e) {
        setError(true);
      }

   
    }
    getChats();
    if (!socket) return;
    socket.on("new-message", handleNewMessage);
    return () => socket.off("new-message");
  }, [currentChat, socket, handleNewMessage]);

  if (chatData["messages"]) {
    return (
      <>
        <div className="chat" style={{ zIndex: "1", overflowX: "hidden" }}>
          <div className="contacthead">
            <div style={{ float: "left" }}>
              {width < 601 ? (
                <>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "-10px",
                      position: "absolute",
                    }}
                  >
                    <Button onClick={handleBackButton} id="cancelbtn">
                      <AiOutlineArrowLeft color="black" />
                    </Button>
                  </div>
                  &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              ) : (
                <></>
              )}
              <img className = "pf-image" src={chatAdditional.image} alt = ""/>
              &nbsp;&nbsp;
              {chatAdditional.name}
            </div>

            <hr />
            <div style={{ float: "right" }}>
{    isDoctor && consultationData && consultationData.phone ?   <OverlayTrigger 
    placement="bottom"
    delay={{ show: 300, hide: 0 }}
    overlay={callTooltip}
  >
        <a  href={"tel:" + consultationData.phone} >
           {isMobile ?
           
           <Button
                alt="Archive/Unarchive"
                id="cancelbtn"
               >
                <GrPhone />
              </Button>
            :
                         <p style = {{display : "inline-block", fontWeight: "400", paddingRight:"10px"}}>{consultationData.phone}</p>

           
           }

</a>
 </OverlayTrigger> : isDoctor && <p style = {{display : "inline-block", fontWeight: "400"}}>Phone number not given</p> }

         
                        {isDoctor &&    <OverlayTrigger
    placement="bottom"
    delay={{ show: 300, hide: 0 }}
    overlay={endTooltip}
  >
           <Button
                alt="End Consultationn"
                id="cancelbtn"
       onClick = { ()=>{

          
                  setConfirmMessage("end")
                  handleShow()
       }}              >
                <GrClose />
              </Button>
 </OverlayTrigger>}
   
              
              
             {!isDoctor &&    <OverlayTrigger
    placement="bottom"
    delay={{ show: 300, hide: 0 }}
    overlay={renderTooltip}
  >
           <Button
                alt="Archive/Unarchive"
                id="cancelbtn"
                 onClick = {()=>{
                   
                  setConfirmMessage("delete")
                  handleShow()
                }}
              >
                <GrArchive />
              </Button>
 </OverlayTrigger>}
       
            </div>
          </div>
          <div
            className="d-flex flex-column flex-grow-1 chatbg  "
            style={{
              marginTop: "-1.7%",
              height: width < 601 ? height - "175" : "550px",
              overflowX: "hidden",
            }}
            id="chatbox"
          >
            <div className="flex-grow-1 overflow-auto">
              <br />

            <div  id="chatMessages">


                {chatData["messages"].map((message) => (
                <>
                  <div
                    className={`my-1 d-flex flex-column ${
                      currentUser.email === message["from"]
                        ? "align-self-end align-items-end mine"
                        : "align-items-start their"
                    }`}
                  >
                    {
                      (message["type"] === "doctor" && isDoctor) ?

                      <div
                      className={`rounded px-2 py-1 ${
                        currentUser.email === message["from"]
                          ? "bg-primary text-white"
                          : "bg-light"
                      }`}
                      style={{
                        marginTop: "4px",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      {message["text"]}
                    </div>                      :

                                          (message["type"] === "patient" && !isDoctor) ?

                      <div
                      className="rounded px-2 py-1 bg-light"
                      style={{
                        marginTop: "4px",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      {message["text"]}
                    </div>                      :
                      message["type"] ==="image" || message["type"] ==="pres"  ?
                      
                      
                   <>
                   
                    <div onClick = {()=>{
                      changeShowImage(process.env.REACT_APP_CDN_URL + message["url"])
                    }}
                      className={`rounded px-2 py-1 chat-image ${
                        currentUser.email === message["from"]
                          ? "bg-primary text-white"
                          : "bg-light"
                      }`}
                      style={{
                        marginTop: "4px",
                        marginLeft:
                          currentUser.email === message["from"]
                            ? "35px"
                            : "4px",
                        marginRight:
                          currentUser.email === message["from"]
                            ? "4px"
                            : "35px",
                      }}
                    >
                      <img src = {process.env.REACT_APP_CDN_URL + message["url"]} ></img>
                     {message["type"] === "pres" && <><br></br> Prescription</>}
                    </div>
                  { message["timestamp"] &&  <div
                      className={`text-muted small date ${
                        currentUser.email === message["from"]
                          ? "text-right"
                          : ""
                      }`}
                      style={{ marginLeft: "4px", marginRight: "4px" }}
                    >
                      {dateAndTime(message["timestamp"])}
                    </div>}

                   
                   </>

                      :
                      <>
                      
                      <div
                      className={`rounded px-2 py-1 ${
                        currentUser.email === message["from"]
                          ? "bg-primary text-white"
                          : "bg-light"
                      }`}
                      style={{
                        marginTop: "4px",
                        marginLeft:
                          currentUser.email === message["from"]
                            ? "35px"
                            : "4px",
                        marginRight:
                          currentUser.email === message["from"]
                            ? "4px"
                            : "35px",
                      }}
                    >
                      {message["text"]}
                    </div>
                  { message["timestamp"] &&  <div
                      className={`text-muted small date ${
                        currentUser.email === message["from"]
                          ? "text-right"
                          : ""
                      }`}
                      style={{ marginLeft: "4px", marginRight: "4px" }}
                    >
                      {dateAndTime(message["timestamp"])}
                    </div>}
                      
                      </>


                    }
                  </div>
             
             

             
                </>
              ))}
             
             
             
         
            </div>
             
               
                           <div ref={messageEndRef}></div>

            </div>
           {  isEnded &&<div
                      className="rounded px-2 py-1 bg-light"
                      style={{
                         marginLeft: "14px",
                        marginRight: "14px",
                        textAlign:"center",
                        marginTop:"6px"
                      }}
                    >
                      {isDead ? <div>Consultation Ended, you don't have any follow up left</div> : <div>


                        Consultation Ended, you have a free follow up for {daysLeft} days
                      </div> }
                    </div> } 
               

           { !isDead ? <div>
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

                        display: "flex",
                        fontSize: "14px",
                        paddingTop: "8px",
                      }}
                    ></Form.Control>

 <input type="file" accept = 'image/*'  name="myImage" style={{display:'none'}} ref={hiddenFileInput} onChange={onChangePicture}/>
 <input type="file" accept = 'image/*'  name="myImage" style={{display:'none'}} ref={hiddenFileInputPresc} onChange={onSendPresc}/>

                    
                    <InputGroup.Append>

                        {isDoctor &&   <OverlayTrigger
                          placement="top" show = {showOverlay} 
                          delay={{ show: 300, hide:  0 }}
                          overlay={prescriptionTooltip}>
                            <Button className="attach" onClick = {toggleOverlay} style={{ backgroundColor: "white" }}  >
                             { prescLoad ? 
                                    <Spinner  animation="border" variant="dark"  style = {{height: "20px", width : "20px"}}  />
                                                            :<GrDocument />
                              }</Button>

                        </OverlayTrigger>}


                         <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 300, hide:  0 }}
                          overlay={sendFileTooltip}>
                            <Button disabled = {isFileUploading} className="attach" style={{ backgroundColor: "white" }} onClick={handleClick} >

                              {isFileUploading ? 
                                                            <Spinner  animation="border" variant="dark"  style = {{height: "20px", width : "20px"}}  />
                                                            :
                                                            <GrAttachment></GrAttachment>
}
                            </Button>

                        </OverlayTrigger>

                     
                      <Button type="submit" onKeyPress={handleKeypress}>
                        <AiOutlineSend style={{ marginTop: "-3px" }} />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>

            :
             <Link
                    className="btn btn-primary"
                    to="/consult" style = {{borderTopLeftRadius:"0px", borderTopRightRadius:"0px"}}
                  >
                    Start a new consultation
                  </Link>
         }
         
         
          </div>
          <ConfirmationModal
            show={show}
            onHide={handleClose}
            onYes={confirmMessage === "end" ? handleArchiveButton : handleDeleteButton}
            message = {"You want to " + confirmMessage + " this consultation"}
          ></ConfirmationModal>

          <ImageModal
            show = {showImage}
            onHide = {toggleImage}
            url = {imageUrl}
          >

          </ImageModal>

          <Prescription
          show = {showPrescription}
          onHide = {togglePresc}
          name = {chatAdditional.name}
          chatId = {currentChat}
          callback = {callback}
          email = {chatData["doctorEmail"] === currentUser.email
          ? chatData["patientEmail"]
          : chatData["doctorEmail"]}
          >

          </Prescription>
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center   p-5"
          style={{ height : "100%"}}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      </>
    );
  } else if (error) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center   p-5"
          style={{  backgroundColor: "white !important",height : "100%" }}
        >
          <p>Connection Error</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center   p-5"
          style={{   height : "100%" }}
        >
{!doc && !isDoctor &&    <Link
                    className="btn btn-primary"
                    to="/consult"
                  >
                    Start a new consultation
                  </Link>}
        </div>
      </>
    );
  }
}

 

function dateAndTime(unixtime) {
  var t = new Date(unixtime) 
var d = t.getHours()
var am = "AM"
if(d>12) {
  am = "PM"
  d = d-12
}
      return  d + ":"+ t.getMinutes() + " " + am
    };
export default OpenConversation;