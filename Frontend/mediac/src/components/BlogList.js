import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import BlogListItem from "./BlogListItem";
import "./BlogList.css";
import { Card, Button, Alert } from "react-bootstrap"
import docimg from './img/doc.jpeg'


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function BlogList() {
  return (
    <>
      <div className="BlogList">

        <Carousel breakPoints={breakPoints}>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>Blog Title</h5>
              <p style={{color:"black", fontSize:"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper ac ante in convallis. In sit amet elementum leo.</p>
            </div>
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>Blog Title</h5>
              <p style={{color:"black", fontSize:"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper ac ante in convallis. In sit amet elementum leo.</p>
            </div>
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>Blog Title</h5>
              <p style={{color:"black", fontSize:"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper ac ante in convallis. In sit amet elementum leo.</p>
            </div>
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>Blog Title</h5>
              <p style={{color:"black", fontSize:"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper ac ante in convallis. In sit amet elementum leo.</p>
            </div>
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>Blog Title</h5>
              <p style={{color:"black", fontSize:"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper ac ante in convallis. In sit amet elementum leo.</p>
            </div>
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>Blog Title</h5>
              <p style={{color:"black", fontSize:"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper ac ante in convallis. In sit amet elementum leo.</p>
            </div>
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
          <BlogListItem className="BlogListItem">
            <div class="card" style={{ justifyContent: 'center', padding: '25px'}} >
              <img id="blogcardimg" src={docimg} style={{height:"50%", marginBottom:"15px"}}/>
            <div>
              <h5 style={{color:"black"}}>Blog Title</h5>
              <p style={{color:"black", fontSize:"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper ac ante in convallis. In sit amet elementum leo.</p>
            </div>
            <Button id="blogbtn" className = "primaryButton" > Go to the Blog </Button>
            </div>
          </BlogListItem>
        </Carousel>
      </div>
      
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BlogList />, rootElement);