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
      <h1 style={{ textAlign: "center" }}></h1>
      <div className="BlogList">
        <Carousel breakPoints={breakPoints}>
          <BlogListItem>
          <div class="card" style={{display:"block", width:"33.34%"}} >
          <img id="blogcardimg" src={docimg} style={{height:"100%",width:"100%"}}/>
  <div>
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
              
          </BlogListItem>
          {/* <BlogListItem>
              <Card id="cardbox">
              </Card>
          </BlogListItem><BlogListItem>
              <Card id="cardbox">
              </Card>
          </BlogListItem><BlogListItem>
              <Card id="cardbox">
              </Card>
          </BlogListItem><BlogListItem>
              <Card id="cardbox">
              </Card>
          </BlogListItem><BlogListItem>
              <Card id="cardbox">
              </Card>
          </BlogListItem> */}
        </Carousel>
      </div>
      
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BlogList />, rootElement);