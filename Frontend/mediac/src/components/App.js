import React, {useState} from "react"
import Signup from "./Signup"
import Navbar from "./Navbar"
import Home from './Home'
import DocNav from "./DocNav"
import Faq from './Faq'
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import DoctorDashboard from "./DoctorDashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./Profile/UpdateProfile"
import UpdateDoctorProfile from "./Profile/updateDoctorProfile"
import ChangePassword from "./Profile/changePassword"
import VerificationSent from './VerificationSent'
import ConsultancyForm from './ConsultationForm'
import Choice from './Choice'
import OtherPersonDetails from './OtherPersonDetails'
import DoctorLogin from './DoctorLogin'
import AddVideo from "../components/videos/addVideos"
import ViewVideos from "../components/videos/viewVideos"
import Header from './Header'
import FormEditors from "../components/blog/addBlog"
import bgimg from './img/image1.png';
import DocProfile from "./DocProfile"
export const DataContext = React.createContext();
export const DocMailContext = React.createContext();


function App() {
  const [consultationData, setConsultationData] = useState('');
  const [docMail, setDocMail] = useState("");
  return (
        <Router>
          <AuthProvider>
            <DataContext.Provider value={[consultationData, setConsultationData]}>
          <div className="Navb"><Navbar /></div>
          
          <div className="everything" >
          
            <Switch >
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/change-password" component={ChangePassword} />
              <PrivateRoute path="/verification-sent" component={VerificationSent} />
              <PrivateRoute path='/dashboard' component={Dashboard}/>
              <PrivateRoute path='/ConsultationForm' component={ConsultancyForm} />
              <PrivateRoute path='/Choice' component={Choice} />
              <PrivateRoute path='/OtherPersonDetails' component={OtherPersonDetails} />
              <PrivateRoute path='/add-blog' component={FormEditors} />
                            <PrivateRoute path='/add-video' component={AddVideo} />
                            <PrivateRoute path='/update-doctor' component={UpdateDoctorProfile} />
                            <PrivateRoute path='/DocProfile' component={DocProfile} />

              <DocMailContext.Provider value={[docMail, setDocMail]}>
                {/*All doctor private routes go in here*/}
                <Route path="/DoctorLogin" component={DoctorLogin} />
                <Route path='/doctordashboard' component={DoctorDashboard}/>
              </DocMailContext.Provider>
              
              <Route exact path="/" component={Home} />
              <Route exact path="/faq" component={Faq} />
              <Route path="/signup" component={Signup} />
                            <Route path="/videos" component={ViewVideos} />

              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/home#faqhead" component={Home} />
            </Switch>
          </div>
          </DataContext.Provider>
          </AuthProvider>
        </Router>
      
    
    
  )
}

export default App