import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import BlogListItem from "./BlogListItem";
import "./BlogList.css";
import { Card, Button, Alert } from "react-bootstrap"
import docimg from './img/doc.jpeg'
import { useAuth } from "../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom"



const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];



export default function BlogList(props) {

  const dbinfo = useRef()
  const history = useHistory()
  const quest = useRef()
  const [title, setTitle] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [blogimg, setBlogImg] = useState('');
  const [postdata, setPostData] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [city, setCity] = useState('');

  useEffect(() =>{
    async function checkLogin(){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email: props.mail})
      }
  
      let res = await fetch('http://localhost:5000/getDocDetails', requestOptions);
      res = await res.text();
      res = JSON.parse(res)
      console.log(res);
      if(!res['status']){
        // history.push('/DoctorLogin');
      }
      else{
          setDoctorId(res['doctorId']);
          setTitle(res['title']);
          setBlogImg(res['blogimg']);
          setPostData(res['postdata']);
          setSpecialisation(res['specialisation']);
          setCity(res['city'])
      }
    }
    checkLogin();
  }, [history])

  return (
    <>
      <div className="BlogList">

        <Carousel breakPoints={breakPoints}>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={blogimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>{title}</h5>
              <p style={{color:"black", fontSize:"15px"}}>{postdata}</p>
            </div>
            <Button href="/blog" id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
        </Carousel>
      </div>
      
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BlogList />, rootElement);