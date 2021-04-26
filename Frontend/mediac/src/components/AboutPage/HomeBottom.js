import React, { useState, useCallback } from "react";
import Gallery from "./gallery";

import TimeLine from "./timeline";

import { Container, } from "reactstrap"

import "./timeline"
 import ConditionHor from "../blog/Conditions/ConditionsHorizontal"
import Blogs from "./loadBlogsHorizontal"
import Videos from "./loadVodeosHorizontal"
 import Footer from "../footer"

export default function BlogCard(prop) {





    return ( <>


 
    <div style = {{  backgroundColor: "#ededf2", marginTop: "56px"}}>

     <div class="section-title" style = {{paddingTop : "60px"}}>
                    <h4 id = "sec"  > How does it work?</h4>
                    
                </div>
      <TimeLine></TimeLine>





    </div>
 <div class="section-title" style = {{paddingTop : "60px"}}>
                    <h4 id = "sec"  > Common Skin Conditions</h4>
                    
                </div>

      <div className = "centre-big" style = {{marginTop : "-14px"}}>
<ConditionHor></ConditionHor>
      </div>





 
 <div class="section-title" style = {{paddingTop : "60px"}}>
                    <h4 id = "sec"  > Gallery</h4>
                    
                </div>
      <div className = "centre" style = {{marginTop : "-19px"}}>
        <Gallery></Gallery>
      </div>

  <Videos></Videos>

          <Blogs></Blogs>
 <br></br>
 <br></br>
 <br></br>
<Footer></Footer>
 
        </>
    )
}