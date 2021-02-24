import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import ProfileSelection from './ProfileSelection'
import OtherPersonDetails from './OtherPersonDetails';
import NewConsultation from './ConsultationForm';

export default function Choice(){

  const [currentProfile, setCurrentProfile] = useState(0); 
 
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const history = useHistory()

  const handleProfileSelection = (id) => {
    setCurrentProfile(id);
  }

  const resetSelection = () => {
    setCurrentProfile(0);
  }

  return (
        <>
          <ProfileSelection handleSubmit={handleProfileSelection} />    
          {currentProfile == 0?<OtherPersonDetails setProfile={handleProfileSelection} />:<><p>Current id set to {currentProfile}</p><br/><button className="newconbtn" onClick={resetSelection}>Reset Selection</button></>}
          <br />
          <NewConsultation id={currentProfile}/>
        </>
  )
}