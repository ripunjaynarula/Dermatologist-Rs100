import React, { useEffect, useState} from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai";
import "./styles.css";
import app from "../firebase";
import "./styles.css";

function Archive() {



  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(()=>{
    async function getChats(){
      if(!currentUser){
        history.push('/login');
      }
      const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions={
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
      };
      let res = await fetch('http://localhost:5000/getChatData', requestOptions);
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      await setChats(res['chats']);
      console.log(chats);

    }
    getChats();
  }, [])


  
  return (
    <div>
      <div className="container">
        <div>
          <div className="top w-100">
            <br />
          </div>
          <div className="bottom overflow-auto " style={{ height: "350px" ,fontSize: "13px"}}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row align-items-center conv w-100">
                <div className="image">
                  {" "}
                  <img src="https://i.imgur.com/jhsYqVT.png" width="50" />{" "}
                  <span className="type"></span>{" "}
                </div>
                <div className="d-flex flex-column line-height ml-2">
                  {" "}
                  <span className="font-weight-bold">Ripunjay</span>{" "}
                  <span>Lorem Ipsum</span>{" "}
                  <span className="d-flex flex-row align-items-center s-now">
                    <small className="live">11/04/2021</small>
                  </span>{" "}
                </div>
              </div>{" "}
              <span className="dots"> </span>
            </div>
            <hr />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archive;
