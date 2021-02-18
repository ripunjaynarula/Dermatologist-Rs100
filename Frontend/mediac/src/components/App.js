import React from "react"
import Signup from "./Signup"
import Navbar from "./Navbar"
import Home from './Home'
import Faq from './Faq'
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import VerificationSent from './VerificationSent'
import ConsultancyForm from './ConsultationForm'

function App() {
  return (
        <Router>
          <AuthProvider>
          <div className="Navb"><Navbar /></div>
          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Switch >
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/verification-sent" component={VerificationSent} />
              <PrivateRoute path='/dashboard' component={Dashboard}/>
              <PrivateRoute path='/ConsultationForm' component={ConsultancyForm} />
              <Route exact path="/" component={Home} />
              <Route exact path="/faq" component={Faq} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/home#faqhead" component={Home} />
            </Switch>
          </div>
          </Container>
          </AuthProvider>
        </Router>
      
    
    
  )
}

export default App
