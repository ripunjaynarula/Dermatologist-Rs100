import React, { useRef, useState } from "react";
import { Form, Button, Container, Card, Alert, } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
   export default function Help(props) {
 

 const optionRef = useRef()
  const infoRef = useRef()
 const [loading, setLoading]  = useState(false)
    const { currentUser } = useAuth();
 const [success, setSuccess]  = useState(false)
 const [error, setError]  = useState(false)

async  function handleSubmit(e){
  e.preventDefault()
setError("")
setSuccess("")
  setLoading(true)
  try{
     const token = await  currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ 
          query : optionRef.current.value,
          desc : infoRef.current.value
          }),
      };

      let res = await fetch(
        `${process.env.REACT_APP_API_URL}help`,
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      if(!res.isError){
        document.getElementById("myForm").reset();

        setSuccess("Request Submitted")
      }else{
        setError("Some error occured")
      }
  }catch(e)
  {
        setError("Some error occured")

  }

setLoading(false)
  }
 
 
 
 
  return (
    <>
      <div className="pane">
                    <h2>Need Help?</h2>
                                    <br />
                                  {!props.isMobile &&   <br />}

                    <div className = "pane-inner">


                     <div class="card" id="detailcard" style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}>
                      <div class="card-body"  style = {{paddingLeft:"40px", paddingRight:"40px", paddingTop:"60px",paddingBottom:"60px", }}>
                              <Form id = "myForm" onSubmit={handleSubmit}>


     <Form.Group id="name">
                    <Form.Label >Select a query</Form.Label>
                    <select name="prev" ref={optionRef} id="dropdown-basic" required>
                      <option style={{ display: "none" }}> </option>

                  
                       <option value="How to consult virtually">How to consult virtually</option>
                       <option value="Delay in consultation">Delay in consultation</option>
                       <option value="Bandwidth and payment Issues">Bandwidth and payment Issues</option>
                    
                       <option value="Other">Other</option>

                    </select>
                  </Form.Group>

<div style = {{height:"10px"}}></div>
              <Form.Group id="email">
                <Form.Label >Query Description</Form.Label>
                <Form.Control type="text" ref = {infoRef}  required />
              </Form.Group>
<div style = {{height:"20px"}}></div>
 {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

              <div style = {{minWidth:"150px", float:"right" }}> 
              <Button  disabled={loading}  className="w-100" type="submit">
                Submit
              </Button>
              </div>

              {/* <p className="submitbtn" type="submit">Login</p> */}
            </Form>



                      </div>
                    </div>


                    </div>
                </div>
     </>
  );
}
