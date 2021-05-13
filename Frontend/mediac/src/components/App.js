import React, { useState } from "react";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Home from "./Home";
import Faq from "./Faq";
import DocProfile from "./Profile/DocProfile";
import BlogList from "./BlogList";
import BlogListItem from "./BlogListItem";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import DoctorDashboard from "./DoctorDashboard";
import Login from "./Login";
import MedicalRecords from "./MedicalRecords";
import PaymentHistory from "./PaymentHistory";
import Details from "./Details/Details";
 import Test from "./Test";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./Profile/UpdateProfile";
import UpdateDoctorProfile from "./Profile/updateDoctorProfile";
import AdminLogin from "./AdminLogin";
import AddDoc from "./AddDoc";
import ChangePassword from "./Profile/changePassword";
import Chat from "./Chat/patientChat";
import ChatDoctor from "./Chat/Chat";
import ConditionsMainPage from "./blog/Conditions/ConditionsMainPage";
import VerificationSent from "./VerificationSent";
import ConsultancyForm from "./ConsultationForm";
import Choice from "./Choice";
import OtherPersonDetails from "./OtherPersonDetails";
import AddVideo from "../components/videos/addVideos";
import ViewVideos from "../components/videos/viewVideos";
import myVideos from "../components/videos/my-videos";
import Video from "../components/blog/singleVideoPage";
import page404 from "../components/utility/page_404";
import Header from "./Header";
import FormEditors from "../components/blog/addBlog";
import bgimg from "./img/image1.png";
import pimplesAcnePage from "./blog/Conditions/pimplesAcne";
import viewBlogs from "./blog/blog";
import singleBlog from "./blog/blogSingle";
import myBlogs from "./blog/my-blogs";
import myProfile from "./Profile/my-Profile";
import about from "./AboutPage/about";
import treatmentMain from "./blog/Treatments/treatmentPageMain";
import treatment from "./blog/Treatments/treatment";
import testimonials from "./AboutPage/Testimonials/testimonialsPage";
import notification from "./registerPush/client";
import publicProfile from "./Profile/DocProfile";

export const DataContext = React.createContext();
export const DocMailContext = React.createContext();
export const TokenContext = React.createContext();
export const CurrentChatContext = React.createContext();
export const ChatDataContext = React.createContext();
export const SocketContext = React.createContext();

function App() {
  const [consultationData, setConsultationData] = useState("");
  const [docMail, setDocMail] = useState("");
  const [token, setToken] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState();

  return (
    <Router>
      <AuthProvider>
        <DataContext.Provider value={[consultationData, setConsultationData]}>
          <SocketContext.Provider value={[socket, setSocket]}>
 
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute
                path="/change-password"
                component={ChangePassword}
              />
              <PrivateRoute
                path="/verification-sent"
                component={VerificationSent}
              />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute
                path="/ConsultationForm"
                component={ConsultancyForm}
              />
              <PrivateRoute path="/consult" component={Choice} />
              <PrivateRoute
                path="/OtherPersonDetails"
                component={OtherPersonDetails}
              />
              <PrivateRoute path="/add-blog" component={FormEditors} />
              <PrivateRoute path="/add-video" component={AddVideo} />
              <PrivateRoute path="/my-profile" component={myProfile} />
              <PrivateRoute path="/my-videos" component={myVideos} />
              <Route path="/testimonials" component={testimonials} />

              <PrivateRoute path="/consultations" component={Details} />
              <PrivateRoute path="/help" component={Details} />
              <PrivateRoute path="/payments" component={Details} />
              <PrivateRoute path="/records" component={Details} />
              <PrivateRoute path="/notification" component={notification} />

              <PrivateRoute
                path="/update-doctor"
                component={UpdateDoctorProfile}
              />
              <Route exact path="/" component={Home} />
              <Route exact path="/blogs" component={viewBlogs} />
              <Route path="/blog" component={singleBlog} />

              <Route exact path="/my-blogs" component={myBlogs} />
              {/* <Route path="/Test" component={Test} /> */}

              <Route path="/login" component={Login} />
              <Route   path="/faq" component={Faq} />
              <Route path="/signup" component={Signup} />
              <Route path="/videos" component={ViewVideos} />
              <Route path="/video" component={Video} />
              <Route path="/404" component={page404} />
              <Route path="/about" component={about} />
                            <Route path="/profile" component={publicProfile} />

publicProfile
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/home#faqhead" component={Home} />

              <Route path="/conditions" component={ConditionsMainPage} />

              <Route
                path="/pimples-acne-treatment"
                component={pimplesAcnePage}
              />
              <Route path="/psoriasis-treatment" component={pimplesAcnePage} />
              <Route path="/eczema-treatment" component={pimplesAcnePage} />
              <Route
                path="/warts-molluscumcontagiosum-treatment"
                component={pimplesAcnePage}
              />
              <Route path="/vitiligo-treatment" component={pimplesAcnePage} />
              <Route
                path="/hyper-pigmentation-malesma-teratment"
                component={pimplesAcnePage}
              />
              <Route
                path="/moles-or-nevi-skin-tags-treatment"
                component={pimplesAcnePage}
              />
              <Route
                path="/fungal-infections-treatment"
                component={pimplesAcnePage}
              />
              <Route
                path="/keloid-hypertrophic-scar"
                component={pimplesAcnePage}
              />
              <Route path="/hair-loss-treatment" component={pimplesAcnePage} />
              <Route
                path="/lichen-planus-treatment"
                component={pimplesAcnePage}
              />
              <Route path="/hirsutism-treatment" component={pimplesAcnePage} />
 
              <Route path="/treatments" component={treatmentMain} />
              <Route
                path="/acupulse-fractional-co2-laser-treatment"
                component={treatment}
              />
              <Route
                path="/laser-hair-removal-treatment-consultation"
                component={treatment}
              />
              <Route
                path="/q-switch-tag-laser-tattoo-removal"
                component={treatment}
              />
              <Route
                path="/conventional-co2-laser-treatment-consultation"
                component={treatment}
              />
              <Route
                path="/microdermabrasion-treatment"
                component={treatment}
              />
              <Route
                path="/lavatron-diathermy-therapy-treatment"
                component={treatment}
              />
              <Route
                path="/chemical-skin-peel-treatment-consultation"
                component={treatment}
              />
              <Route
                path="/dermaroller-and-mesotherapy-treatmen-consultaion"
                component={treatment}
              />
              <Route
                path="/botox-and-fillers-treatment-consultaion"
                component={treatment}
              />
              <Route
                path="/vitiligo-treatments-consulation"
                component={treatment}
              />
              <Route
                path="/hair-transplant-treatment-consultation"
                component={treatment}
              />
              <Route
                path="/viora-reaction-treatment-consultation"
                component={treatment}
              />
              <Route
                path="/cosmetic-surgery-treatment-consultaion"
                component={treatment}
              />
              <Route
                path="/melasma-pigmentation-treatment"
                component={treatment}
              />
              <Route
                path="/hair-treatment-consultation"
                component={treatment}
              />
              <Route
                path="/tattoo-removal-consultation"
                component={treatment}
              />
              <Route
                path="/glutathione-fairness-injections"
                component={treatment}
              />

              <Route path="/hydra-facial" component={treatment} />

              <Route path="/doctor" component={DocProfile} />
              <PrivateRoute
                path="/doctordashboard"
                component={DoctorDashboard}
              />

              <Route exact path="/my-blogs" component={myBlogs} />

              <CurrentChatContext.Provider
                value={[currentChat, setCurrentChat]}
              >
                <ChatDataContext.Provider value={[chats, setChats]}>
                  <PrivateRoute exact path="/chat" component={Chat} />
                  <PrivateRoute exact path="/chat/d" component={ChatDoctor} />
                </ChatDataContext.Provider>
              </CurrentChatContext.Provider>
              <TokenContext.Provider value={[token, setToken]}>
                <Route exact path="/adminlogin" component={AdminLogin} />
                <Route exact path="/AddDoc" component={AddDoc} />
              </TokenContext.Provider>
              
              <Route path='*' exact={true} component={page404} />

            </Switch>
          </SocketContext.Provider>
        </DataContext.Provider>
 


      </AuthProvider>
    </Router> 
  );
}

export default App;
