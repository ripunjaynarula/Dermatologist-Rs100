import React, { useRef, useState, useEffect, useContext } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import ProfileSelection from './ProfileSelection'
import OtherPersonDetails from './OtherPersonDetails';
import NewConsultation from './ConsultationForm';
import { DataContext } from './App'

export default function Choice(){

  const [currentProfile, setCurrentProfile] = useState(0); 
  const [currentProfileName, setCurrentProfileName] = useState('');
 
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const history = useHistory()
  const [consultationData, setConsultationData] = useContext(DataContext);

  const handleProfileSelection = (id, name) => {
    setCurrentProfile(id);
    setCurrentProfileName(name)
  }

  useEffect( () => {
    console.log(consultationData)
  }, [consultationData]);

  const resetSelection = () => {
    setCurrentProfile(0);
  }

  return (
        <>
          <ProfileSelection handleSubmit={handleProfileSelection} />    
          {currentProfile == 0?<></>:<><p>Current id set to {currentProfileName}</p><br/><button className="newconbtn" id="resetbtn" onClick={resetSelection}>Reset Selection</button>    <br/></>}
          <br />
          <NewConsultation id={currentProfile}/>
        </>
  )
}