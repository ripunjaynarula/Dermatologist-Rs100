import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Texts } from "../css/Texts";

export default function NewConsultation(props) {
  const prev = useRef();
  const docType = useRef();
  const info = useRef();
  const city = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = () => {
    if (props.id === 0) {
      setError("Please select a profile.");
    } else {
      setError("");
      // send request to backend!
    }
  };
  return (
    <>
      <br></br>

      <div id="formbody">
        <h4 className=" mb-4">Consult Us</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="docType">
                <Form.Label style={Texts.FormLabel}>Type of Doctor</Form.Label>
                <Form.Control type="text" ref={docType} required />
              </Form.Group>
              <Form.Group id="city">
                <Form.Label style={Texts.FormLabel}>City</Form.Label>
                <Form.Control type="text" ref={city} required />
              </Form.Group>

              <Form.Group id="name">
                <Form.Label style={Texts.FormLabel}>
                  Any previously diagosed conditions?
                </Form.Label>
                <select name="prev" ref={prev} id="dropdown-basic">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </Form.Group>
              <Form.Group id="info">
                <Form.Label style={Texts.FormLabel}>
                  Additional Information (symptoms, allergies, current
                  medication)
                </Form.Label>
                <Form.Control type="text" ref={info} required />
              </Form.Group>

              <p
                disabled={loading}
                className="submitbtn"
                onClick={handleSubmit}
              >
                Proceed to Payment
              </p>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
