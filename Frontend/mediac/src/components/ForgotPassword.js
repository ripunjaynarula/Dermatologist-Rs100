import React, { useRef, useState } from "react";
import { Form, Button, Container, Card, Alert, } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { CardMain } from "../css/Card";
import { Texts } from "../css/Texts";
import Navbar from "./Navbar";
export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
 
    try {
      setMessage("");
      setError("");
      setLoading(true);
      var res = await resetPassword(emailRef.current.value);
      console.log(res);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>

         <div className="Navb"><Navbar /></div>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <Card style={({ CardMain }, { maxWidth: "400px" })}>
          <Card.Title></Card.Title>
          <Card.Body  style = {{ padding: "36px"}}> 
          <br></br>
             <h2 className="text-left " style = {Texts.Heading}>Reset Password</h2>


<br></br>            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label style={Texts.FormLabel}>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Reset Password
              </Button>

              {/* <p className="submitbtn" type="submit">Login</p> */}
            </Form>
          </Card.Body>

          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
          <br></br>
          <br />
        </Card>
      </Container>
    </>
  );
}
