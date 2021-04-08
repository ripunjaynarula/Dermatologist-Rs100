import React, {useRef,useEffect, useState, useContext} from "react";
import { Form, Button, Alert } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
import bgimg from './img/image1.png';
import ellipse from './img/ellipse2.png';
import  "./styles.css";
import firebase from 'firebase'
import { auth } from '../firebase'
import { useAuth } from "../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import LoginPopup from "./LoginPopup"
import { DataContext } from './App';
import Navbar from "./Navbar"
import bgImg from './img/b1.jpg'
export default function Home() {

  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth();
  const dataRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

  const [consultationData, setConsultationData] = useContext(DataContext);

const [navBackground, setNavBackground] = useState(false)
    const navRef = useRef()
    navRef.current = navBackground
    useEffect(() => {
       const handleScroll = () => {
        const show = window.scrollY > 50
        if (navRef.current !== show) {
          setNavBackground(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])
  useEffect( () => {
    dataRef.current.value = '';
    if (currentUser) {
      setFlag(true);
      history.push('/dashboard');
      return
    }
    setFlag(false);
  }, [currentUser, history,setFlag])

  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      var user =  await login(emailRef.current.value, passwordRef.current.value)
      console.log(await user.user.getIdToken())
      setLoading(false)
      history.push("/dashboard")
     } catch(e) {
      if (e['code'] === 'auth/user-not-found' || e['code'] === "auth/wrong-password") {
        setError("Incorrect email or password")
      }
      else {
        setError("Internal error.");
      }
      setLoading(false)
    }
  }

  const handleChange = () => {
    setConsultationData(dataRef.current.value)
  }
  

    return (
    <>
      <div className =  "home">
       <div className="Navb" ><Navbar type = "trans" /></div>
     </div>
    <div id="wrapper" className="w-100 p-3" style={{ minHeight: "84vh" ,         backgroundImage: "url(" + bgImg + ")",
 backgroundSize: "cover",
    display: "flex",
    padding: "23px",
    margin: "-3.5rem 0rem",  backgroundRepeat: 'no-repeat'}}>
    <div id="container"  >
          <div id="hometxt" >
            <h2 id="bigtxt"><br></br>Best Care & <br/>Better Doctors.</h2>
          <p id="smalltxt">Ask us a question </p>
          </div>
          <Form onSubmit={handleSubmit}>

          <Form.Group id="ocity">
                  <input type="text" id="dbques" style = {{borderRadius : "8px"}} placeholder="Tell us your symptom or health problem" ref={dataRef} onChange={handleChange}/>
          </Form.Group>
          </Form>
          <Button onClick={handleShow} id="bookbtn">
            <img id="ellipsebtn" src={ellipse}/> Start Consultation</Button>
      
      
        <Modal show={show} onHide={handleClose} id="nlogin">
       
       <LoginPopup onClick={handleClose}/>
 
      </Modal>
        </div>
        </div>
        
    </>
  )
}
  
