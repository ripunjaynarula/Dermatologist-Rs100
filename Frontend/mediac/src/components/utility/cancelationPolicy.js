import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import Navbar from '../Navbar'
import  '../styles.css'
//Import Images
import Footer from '../footer'


const Pages404 = () => {
  return (
    <React.Fragment>
            <div className="Navb" ><Navbar  /></div>
  <br/>
  <br/>
  <br/>
  <br/>

    <div class = "container">



 <div class="main">
  <div >
<h2><strong>Cancelation Policy</strong></h2>
<p>Welcome to Dermatologist in 100 rs!</p>

<p>
Our goal is to provide quality health care to all our patients in a timely manner. No-shows, late arrivals, and cancellations inconvenience not only our providers, but our other patients as well. Please be aware of our policy regarding missed appointments.
Our Policy:
<br></br><br></br>

</p>
<h4>
    Appointment Cancellation
    
</h4>
Our response is instant to your appointment request but if you still wish to cancel your appointment before the doctor has responded then you can cancel your consultation after 5 minutes of the request from the same chat page itself.

<p>
<br/><br></br>

<h4>Dissatisfaction with Service</h4>
 If after the consultation you feel like that you are not satisied with the service then you can wirte to us from the help page in your dashboard. We will go through your request and if it is genuine then initiate a refund.     
    
    </p> </div>
</div>

    </div>
<Footer></Footer>


    </React.Fragment>
  )
}

export default Pages404
