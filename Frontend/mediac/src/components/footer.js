
import React, { } from "react";
 
 import facebook from './img/facebook_w.svg'
  
 import twitter from './img/twitter_w.svg'
 import linkedin from './img/linkedin_w.svg'
 import insta from './img/instagram.svg'
 import '../css/footer.css'
 
 export default function BlogCard(prop) {

  
 

 
  
      return (
    <>         
         <footer id="footer">

        <div class="footer-top">
            <div class="container">
                <div class="row">

                    <div class="col-lg-3 col-md-6 footer-contact">
                        <h3>Medilab</h3>
                        <p>
                             <strong>Phone:</strong> +1 5589 55488 55<br/>
                            <strong>Email:</strong> drsandeshg@rediffmail.com
<br/>
                        </p>

                  <div style = {{marginTop : "20px"  }}>

                             <div class="social-links   me-md-auto text-start text-md-start">
                <a href="https://www.facebook.com/SkinNLaserCentre" class="twitter"><img src = {facebook} width = "16px" ></img></a>
                <a href="#" class="facebook"><img src = {insta} width = "16px" ></img></a>
                <a href="#" class="instagram"><img src = {linkedin} width = "16px" ></img></a>
                 <a href="https://twitter.com/drsandeshgupta" class="linkedin"><img src = {twitter} width = "16px" ></img></a>
            </div>
                  </div>
                        
                    </div>

                    <div class="col-lg-2 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><i class="bx bx-chevron-right"></i> <a href="/">Home</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="/about">About us</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="/videos">Videos</a></li>
                                                        <li><i class="bx bx-chevron-right"></i> <a href="/blogs">Blogs</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 footer-links">
                        <h4>Common Conditions</h4>
                        <ul>
                            <li><i class="bx bx-chevron-right"></i> <a href="/hair-loss-treatment">Hairfall</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="/pimples-acne-treatment">Pimples and Acne</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="/fungal-infections-treatment">Fungal infection</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="/hyper-pigmentation-malesma-teratment">Pigmentation and Tanning</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="/eczema-treatment">Rashes</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="/tattoo-removal-consultation">Tatoo Removal</a></li>

                        </ul>
                    </div>
 
                    

                </div>
                <div class="copyright">
                    &copy; Copyright <strong><span>XYZ</span></strong>. All Rights Reserved
                </div>
               
            </div>
            
        </div>

    
      
    </footer>
    
    
    </>
  )
}
  
