import React, {useState} from "react"
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
import Choice from './Choice'
import OtherPersonDetails from './OtherPersonDetails'
import DoctorLogin from './DoctorLogin'
import FormEditors from "../components/blog/addBlog"
import bgimg from './img/image1.png';

export const DataContext = React.createContext();


function App() {
  const [consultationData, setConsultationData] = useState('')
  return (
        <Router>
          <AuthProvider>
            <DataContext.Provider value={[consultationData, setConsultationData]}>
          <div className="Navb"><Navbar /></div>
          
          <Container className="d-flex align-items-center justify-content-center" >
          
            <Switch >
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/verification-sent" component={VerificationSent} />
              <PrivateRoute path='/dashboard' component={Dashboard}/>
              <PrivateRoute path='/ConsultationForm' component={ConsultancyForm} />
              <PrivateRoute path='/Choice' component={Choice} />
              <PrivateRoute path='/OtherPersonDetails' component={OtherPersonDetails} />
              <Route path='/add-blog' component={FormEditors} />

              <Route exact path="/" component={Home} />
              <Route exact path="/faq" component={Faq} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/DoctorLogin" component={DoctorLogin} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/home#faqhead" component={Home} />
            </Switch>
          </Container>
          </DataContext.Provider>
          </AuthProvider>
        </Router>
      
    
    
  )
}

export default App
