import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import Navbar from '../Navbar'
import  '../styles.css'
//Import Images
import error from "../img/error-img.png"

const Pages404 = () => {
  return (
    <React.Fragment>
            <div className="Navb" ><Navbar  /></div>

      <div className="d-flex align-items-center justify-content-center" style = {{paddingTop: "100px",}}>
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 style = {{color : "#494f57", fontStyle: "work sans"}}>
                  403
                </h1>
                <h4 style = {{color : "#494f57", fontStyle: "work sans"}} >Access Denied</h4>
                <div className="mt-5 text-center">
                  <Link
                    className="btn btn-primary"
                    to="/"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={error} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Pages404
