import React, { useState, useCallback } from "react";
import Gallery from "./gallery";

import TimeLine from "./timeline";

import { Container, } from "reactstrap"

import "./timeline"
 import ConditionHor from "../blog/Conditions/ConditionsHorizontal"
import Blogs from "./loadBlogsHorizontal"
import Videos from "./loadVodeosHorizontal"
 import Footer from "../footer"
  import useWindowDimensions from "../../functions/windowDimensions"

 import Treatment from "../blog/Treatments/treatmentListHorizontal"
export default function BlogCard(prop) {
       const { height, width } = useWindowDimensions();





    return ( <>


 
    {/* <div style = {{  backgroundColor: "#ededf2", marginTop: "56px"}}>

     <div class="section-title" style = {{paddingTop : "60px"}}>
                    <h4 id = "sec"  > How does it work?</h4>
                    
                </div>
            <TimeLine></TimeLine>  





    </div> */}
 <div class="section-title" style = {{paddingTop : "100px"}}>
                    <h4 id = "sec"  > Common Skin Conditions</h4>
                    
                </div>


              <div className = "centre-big"  >
<ConditionHor></ConditionHor>


</div>









              <div className = "centre-bigger"  > 



    <section id="me" class="about">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-xl-5 col-lg-6 image-box d-flex justify-content-center align-items-stretch position-relative">
                        <img src = "https://www.drsandeshgupta.com/images/profile01.jpg" style = {{   backgroundSize: "cover",minHeight: "500px"}}></img>
                     </div>
                     <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
                        <h3>Dr. Sandesh Gupta M.B.B.S, DVD, MCSI (Cosmetology)</h3>
                        <p>Dr. Sandesh Gupta is an established Cosmetologist and Dermatologist in Delhi. He has done M.B.B.S from LLRM (Government medical college, Meerut ) and completed his Post Graduation (D.V.D.) in Dermatology from KMC, Manipal. He further got a master degree in aesthetic medicine and laser therapy from Singapore.</p>

                       <ul>
                           <li>
                              <h4 class = "point">Founder and the owner of the skin and laser centre (one of the most advanced skin clinic in Delhi)</h4>

                            </li>
                           <li>
                                <h4  class = "point">Wide experience of 15 years in managing both dermatological and cosmetological problems</h4>

                           </li>
                           <li>

                               <h4  class = "point">With keen intrest in dermatology, goal is to provide high standard treatments which can be availed by anyone</h4>

                           </li>
                       </ul>
<div>            <a href="#"  class="view-more" style = {{marginTop:"-20px"  }}>Read More</a>
</div>
                     

                    </div>
                </div>

            </div>
        </section>


















    <section id="clinic" class="about" style = {{marginTop: width< 992 ? "-170px" : "-40px"}}>
            <div class="container-fluid">

                <div class="row">

                                 <div class="col-xl-7 col-lg-7 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" style = {{marginTop : "-20px"}}>
                        <h3>SKIN N LASER CENTRE IN DELHI</h3>
                        <p>Welcome to our Skin & Laser Centre, a specialized cosmetology & Laser centre committed to provide a standard quality of services at very affordable price. Skin & Laser Centre is one of the most well equipped cosmetology and Laser centre in Delhi. Established in 2003, our Centre has been providing highest quality of Dermatology services and laser treatments in Delhi.</p>

                    
<div>
                <a href="about"  class="view-more" style = {{paddingLeft: "0px", paddingRight:"0px", marginTop:"-20px", }}>Read More</a>

</div>
                     

                    </div>
        
                    <div class="col-xl-5 col-lg-5 image-box-small d-flex justify-content-center align-items-stretch position-relative">
                        <img src = "https://www.drsandeshgupta.com/images/doctor01.jpg" style = {{   backgroundSize: "cover",height: "250px"}}></img>
                     </div>
          
          
          
                </div>

            </div>
        </section>


</div>







      <div className = "centre-big" style = {{marginTop : "-14px"}}>
      </div>







        <div style = {{backgroundColor: "#ededf2",}}>

 <div class="section-title" style = {{paddingTop : "40px", }}>
                    <h4 id = "sec"  > Treatments</h4>
                    
                </div>
 
                  <div className = "centre-big"  >
<Treatment></Treatment>
<br></br>
<br></br>
</div>
     </div>

          <Blogs></Blogs>
  <Videos></Videos>



   





 <br></br>
 <br></br>
 <br></br>
<Footer></Footer>
 
        </>
    )
}