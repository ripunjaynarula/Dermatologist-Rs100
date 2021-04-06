import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import BlogListItem from "./BlogListItem";
import "./BlogList.css";
import { Card, Button, Alert } from "react-bootstrap"
import docimg from './img/doc.jpeg'
import { useAuth } from "../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom"
import {Texts} from "../css/Texts";


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
  const [blogs, setBlogs] = useState([])
 
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
        history.push('/login');
      }
      else{
          setDoctorId(res['doctorId']);
          setTitle(res['title']);
          // setBlogImg(res['blogimg']);
          setPostData(res['postdata']);
          setBlogs(res['docBlogs']);
          setCity(res['city'])
      }
    }
    // checkLogin();
  }, [history, setBlogs])

  return (
    <>
      <div className="BlogList">
        {blogs.length>0?
        <Carousel breakPoints={breakPoints}>
        {blogs.map(blog =>(<>
          <BlogListItem className="BlogListItem" key={blog.title}>
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>{blog.title}</h5>
              <p style={{color:"black", fontSize:"15px"}}>{blog.postdata}</p>
            </div>
            <Link to="">
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </Link>
            </div>
          </BlogListItem>
          </>))}
        </Carousel>
        :<>
        <br></br>
        <p style = {Texts.FormLabel}>No Blogs yet</p></>
}
      </div>
      
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BlogList />, rootElement);