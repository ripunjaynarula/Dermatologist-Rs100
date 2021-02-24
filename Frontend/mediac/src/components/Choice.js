import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import ProfileSelection from './ProfileSelection'

export default function Choice(){

    
 
  const userchoice = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const history = useHistory()



  const handleSubmit = () => {
    console.log('form submitted');
  }
    return (
        <>
          <ProfileSelection />          
        </>
  )

}