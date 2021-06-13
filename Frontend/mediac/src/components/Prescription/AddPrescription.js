import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card,Row, Col, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
 
 import Modal from 'react-bootstrap/Modal'
import {Texts} from "../../css/Texts";
import ChipInput from "material-ui-chip-input";
import back from "../img/back.svg"
import AsyncSelect from "react-select/async"
 import fetch from 'cross-fetch';
 import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
 export default function BlogCard(prop) {

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)
  const { currentUser,  } = useAuth()

 
    const refQuantity = useRef()
const refDosage = useRef()
   const refDays = useRef()
  const refFrequency = useRef()
  const refDuration = useRef()
  const refInstructions = useRef()
 const genderRef = useRef()
const [isAfternoon, setAfternoon] = useState(false)
const [isNight, setNight] = useState(false)

const [isMorning, setMorning] = useState(false)
   const [isMedOpen, setIsMedOpen] = useState(false)
  const [chips , setChips] = useState([])
    const [medicine , setMedicine] = useState({})
const [medError, setMedError]  = useState("")
const [meals, setMeals] = useState(0)
const [medicineName, setMedicineName] = useState("")
 const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
   const searchLoading = false ;
    const [diagnosisi, setDiagnosis] = useState("")
   const [suggestioni, setSuggestion] = useState("")
   const [labTesti, setLabTest] = useState("")
const [phone, setPhone] = useState('')
   const [isChanged, setIsChanged] = useState(false)

const [age, setAge] = useState('')
const [gender, setGender] = useState('')
   const [patientName, setPatientName] = useState("")
   const [histori, setHistori] = useState("")
   useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

   useEffect(() => {
                  if(!isChanged)
                  {

                    setIsChanged(true)
                    setPatientName(prop.name)
                    setPhone(prop.phone)
                    setGender(prop.gender)
                    setAge(prop.age)
                    console.log(prop)
                  
                  }
  }, [ prop]);



  function openMed(){
    setIsMedOpen(true)
  }
 
  function hideMed(){
     setIsMedOpen(false)
  }

async function finalSubmit(isEnd){
  var message = ""

  
 
   var name ; 
  var _age;
  var _gender;
  var _phone;
   if(!patientName) name = prop.name
  else name = patientName
  
   var history = histori
  var diagnosis = diagnosisi
  var  suggestion = suggestioni
  var labTest = labTesti
  if(prop.type === "unregistered")
  {
      if(!phone) _phone = prop.phone 
      else _phone = phone
     var phoneno = /^\d{10}$/;
    if(!_phone){
      message = "Phone number not set\n"
    }else if((!_phone.match(phoneno)))
    {
            message = "Invalid Phone number\n"

    }
    if(!age) _age = prop.age
    else _age = age
    console.log(prop.gender)
    console.log(gender)
    if(!gender) _gender = prop.gender
    else _gender = gender
  }
  if(!name)     message =message+  'Patient name not set\n'
  if(!diagnosis) message = message +  "Patient diagnosis not set\n"
  if(!suggestion) message = message + "Suggestion to patient not set"
  
  setError(message)
  if(message)
  {
    return;
  }


    try {
      setError("")
      setLoading(true)
 console.log(JSON.stringify(prop), "-----")
 var _data = {
         patientName: name, history, diagnosis, suggestion, labTest, medicines : medicine, names : Object.keys(medicine), patientEmail: prop.email, type : "digital", age : _age, gender : _gender, phone : _phone, registered : prop.type, puid : prop.uid, isAddNew : prop.isAddNew , isConsultation : isEnd, consultationId : prop.consultationId

        }
        console.log(JSON.stringify(_data), "SENDING")
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token :  await currentUser.getIdToken() },
        body: JSON.stringify(_data)
      }; 
      let res = await fetch(process.env.REACT_APP_API_URL+'add-prescription', requestOptions)
      res = await res.text()
      res = JSON.parse(res)
      console.log(res);
      setLoading(false)
      if (res['status'] === 'saved_successfuly') { 
        prop.callback(res.url);
        hideMed()

if(isEnd){
  prop.refresh()
}
          prop.onHide();
                  prop = {}
        setHistori('')
        setPatientName('')
        setLabTest('')
        setSuggestion('')
        setDiagnosis('')
        setAge('')
        setGender('')
        setMedicine({})
        setMedicineName('')
        return;
      }else{

        alert("Prescription Not sent")

      }
      

      setLoading(false)
      
      } catch(e) {
    
    console.log(e)
        alert("Prescription Not sent")

        setLoading(false)
    }
} 

 
 const resetMedForm = () =>{

setMedicineName("")
  refDosage.current.value = ""
   setMorning(false) 
   setAfternoon(false)
   setNight(false)
   setMeals(0)
   refQuantity.current.value = ""
  refFrequency.current.value = ""
   refDuration.current.value = ""
    refDays.current.value = ""
  refInstructions.current.value = ""
 }
  // Add Chips
const handleAddChip = (chip) => {
  var dosage = refDosage.current.value
   var quantity = refQuantity.current.value
  var freq = refFrequency.current.value
  var durat = refDuration.current.value
  var nodays = refDays.current.value
  var instructions = refInstructions.current.value 
console.log(nodays)
  var errorMessage = ""
  setMedError("")
  if(!chip) errorMessage = "Medicine name not set\n"
  if(!dosage) errorMessage = errorMessage + "Medicine dosage not set\n"
  if(!durat) errorMessage = errorMessage  + "Duration not set\n"
  if(!nodays) errorMessage = errorMessage  + "Number of days medicine is to be taken not set\n"
   if(!(isMorning || isAfternoon || isNight || freq))
  {
    errorMessage = errorMessage  + "Frequency of medicine not set"
  }

  if(errorMessage)
  {
    setMedError(errorMessage)
    return
  }
  if(!medicine[chip])
  {
    medicine[chip] = {
      name : chip,
      dosage : dosage + " " + quantity,
      isMorning,
      isAfternoon,
      isNight, 
      frequency : freq,
      duration : durat   ,
      days : nodays,
      instructions,
      meal : meals 

    }
    setMedicine(medicine)
  }else{
     setMedError("This medicine is already added to the prescription")
    return
  }
    


    setChips( Object.keys(medicine));
        hideMed()
        resetMedForm()

    
  }
 

 


const loadOptions = async (name) => {

    try{

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token :  await currentUser.getIdToken() },
        body: JSON.stringify({
          name : name
        })
      }; 
      let res = await fetch(process.env.REACT_APP_API_URL+'search-med', requestOptions)
         res = await res.text()
      res = JSON.parse(res)
      console.log(res)
 
      if(!res['isError'])
      {
        var r = []
        
        for(var i=0;i<res.meds.length; i++)
        {
          r.push({
            label : res.meds[i].name,
            value : res.meds[i].name
          })
        }
        setOptions(r)
        return r
      }else{
 
          setOptions([])
      }

    }catch(e)
    { 

      setOptions([])
     }

 
 };

// Delete Chips
const handleDeleteChip = (chip, index) => {
   delete medicine[chip];

    setChips( Object.keys(medicine));
  }
  
      return (
    <>
 
        <Modal style = {{ padding : "0px"}} show={prop.show} onHide={() => {
          hideMed()
          prop.onHide();
        }} >
        <Modal.Header  closeButton style = {{  borderBottom: "none"
}}>
          <Modal.Title>    
            
          Add Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             {!isMedOpen ? 
             <>
              <Form >
            <Form.Group id="name" style={{paddingTop: 0 }}>
              <Form.Label style = {Texts.FormLabel}>Patient Name</Form.Label>
              <Form.Control type="text"  onChange = {(e)=>{
              setPatientName(e.target.value)
               }} value = { patientName ? patientName :  prop.name } required  />
            </Form.Group>

{prop.type === "unregistered" && <>

<Form.Group id="name" style={{paddingTop: 6 }}>
              <Form.Label style = {Texts.FormLabel}>Phone Number</Form.Label>
              <Form.Control type="tel"  onChange = {(e)=>{
              setPhone(e.target.value)
 
              }} value = { phone ? phone :  prop.phone } required  />
            </Form.Group>
           <Row>
<Col sm> <Form.Group id="age" style={{paddingTop: 6 }}>
              <Form.Label style = {Texts.FormLabel}>Age</Form.Label>
              <Form.Control type="number"  onChange = {(e)=>{
              setAge(e.target.value)
              }} value = { age ? age :  prop.age } required  />
            </Form.Group></Col>
            <Col>
            
                    <Form.Group id="age" style={{paddingTop: 6 }}>
              <Form.Label style = {Texts.FormLabel}>Gender</Form.Label>

            <select name="prev"    onChange = {(e)=>{
          setGender(e.target.value)
              console.log(e.target.value)
               }}   id="dropdown-basic">
                      <option style={{ display: "none" }}> </option>

                      {(gender ? gender :  prop.gender) === "rather not say" ? (
                        <option value="rather not say" selected>
                          Rather not say
                        </option>
                      ) : (
                        <option value="rather not say">Rather not say</option>
                      )}
                      {(gender ? gender :  prop.gender)  === "male" ? (
                        <option value="male" selected>
                          Male
                        </option>
                      ) : (
                        <option value="male">Male</option>
                      )}

                      {(gender ? gender :  prop.gender ) === "female" ? (
                        <option value="female" selected>
                          Female
                        </option>
                      ) : (
                        <option value="female">Female</option>
                      )}
                    </select>
      
            </Form.Group>          </Col>
             
           </Row>

</>}
            <Form.Group id="history"  style={{paddingBottom: 15, paddingTop: 6,}}>
              <Form.Label  style = {Texts.FormLabel}>Patient History</Form.Label>
              <Form.Control type="text" onChange = {(e)=>{
                setHistori(e.target.value)
              }} value = {histori} required />
            </Form.Group>

          
            <Form.Group id="findings"  style={{paddingBottom: 16}}>
              <Form.Label  style = {Texts.FormLabel}>Diagnosis</Form.Label>
              <Form.Control type="text" onChange = {(e)=>{
                setDiagnosis(e.target.value)
              }} value = {diagnosisi} required />
            </Form.Group>
         <Form.Group id="lab"  style={{paddingBottom: 16}}>
              <Form.Label  style = {Texts.FormLabel}>Lab Findings</Form.Label>
              <Form.Control type="text" onChange = {(e)=>{
                setLabTest(e.target.value)
              }} value = {labTesti} required />
            </Form.Group>
    
            <Form.Group id="investigation"  style={{paddingBottom: 22}}>
              <Form.Label  style = {Texts.FormLabel}>Suggestion</Form.Label>
              <Form.Control type="text"  onChange = {(e)=>{
setSuggestion(e.target.value)
              }} value = {suggestioni} required />
            </Form.Group>

          
             <ChipInput
    label="Medicines"
    readOnly = {chips.length >0 ?false : true} 
    value={chips}
    onAdd={(chip) => handleAddChip(chip)}
    onDelete={(chip, index) => handleDeleteChip(chip, index)}
/>
<br></br>
<br></br>
 {error && <Alert variant="danger" style= {{marginTop : "7px", marginBottom : "13px", whiteSpace: "pre-line"}}>{error}</Alert>}

          <Button variant="primary" onClick={openMed}>
            Add Medicine
          </Button>
          
          </Form>



             
             </>
             :


             <>
                 <Form >
            <Form.Group id="medname" style={{paddingTop: 10}}>
              <Form.Label style = {Texts.FormLabel}>Medicine Name</Form.Label>
           
              
 <Autocomplete
      id="asynchronous-demo"
      style={{  }}
      freeSolo
 
      options={options.map((option) => {
       return  option.label
      })}
       onChange={(event, newValue) => {
          setMedicineName(newValue);
      }}
      onInputChange = {(obj, value, reason)=>{
                  setMedicineName(value);

       if(options.length===0)
         loadOptions(value)
      }}
       renderInput={(params) => (
        <TextField
          {...params}
          label=""
          variant="outlined"
          InputProps={{
            ...params.InputProps,type: 'search',
            endAdornment: null
          }}
        />
      )}
    />
              {/* <Form.Control type="text" ref={medNameRef}  required /> */}
            </Form.Group>
        
 <Row>

<Col sm>   
 <Form.Group id="dob">
              <Form.Label style = {Texts.FormLabel}>Dosage</Form.Label>
              <Form.Control
                type="text"
                ref={refDosage}
 
               />
            </Form.Group></Col>

<Col sm>    <Form.Group id="gender">
              <Form.Label style = {Texts.FormLabel}> &nbsp;</Form.Label>
                  <select name="Gender" ref={refQuantity} id="dropdown-basic">
                                         <option style={{display:"none"}}>  </option>
  <option value="mg" selected >mg</option> 
   <option value="ml"   >ml</option> 
    <option value="gm"   >gm</option> 
     <option value="tablet"  >Tablet(s)</option> 
  
                        
                </select>
            </Form.Group></Col>

 </Row>

         Frequency
         <br>
         </br>
          
          <div key="checkbox" className="mb-3">
      <Form.Check inline label="Morning" checked = {isMorning} type="checkbox" id={`inline-${"checkbox"}-1`}             onChange={()=>{setMorning(!isMorning) }} />
      <Form.Check inline label="Afternoon" checked = {isAfternoon} type={"checkbox"} id={`inline-${"checkbox"}-2` }     onChange={()=>{setAfternoon(!isAfternoon) }} />
      <Form.Check inline label="Night" type={"checkbox"} checked = {isNight} id={`inline-${"checkbox"}-3`}     onChange={()=>{ setNight(!isNight)}}      />
    </div>  
<Row>
 <p style = {{paddingTop : "35px", paddingLeft : "20px", }}>or</p>
  
   <Form.Group id="medname" style = {{paddingLeft : "20px"}} >
              <Form.Label style = {Texts.FormLabel}>Frequency</Form.Label>
              <Form.Control type="text" ref={refFrequency} placeholder = "eg: Every 2 hours" />
            </Form.Group>
  </Row>            
           
           


            <Row>

<Col sm>   
 <Form.Group id="Duration">
              <Form.Label style = {Texts.FormLabel}>Duration</Form.Label>
              <Form.Control
                type="text"
                ref={refDuration}
 
               />
            </Form.Group></Col>

<Col sm>    <Form.Group id="gender">
              <Form.Label style = {Texts.FormLabel}> &nbsp;</Form.Label>
                  <select name="Gender" ref={refDays} id="dropdown-basic">
                                         <option style={{display:"none"}}>  </option>
  <option value="Days" selected >Days</option> 
   <option value="Weeks"   >Weeks</option> 
    <option value="Months"   >Months</option> 
      
                        
                </select>
            </Form.Group></Col>

 </Row>
           <div key={`inline-${"radio"}`} className="mb-3">
      <Form.Check inline label="Before Meal &nbsp;" checked = {meals === 1 ? true : false} type={"radio"} id={`inline-${"radio"}-1`} onChange = {()=>{setMeals(1)}}/>
      <Form.Check inline label="After Meal &nbsp;" type={"radio"} checked = {meals === 2 ? true : false} id={`inline-${"radio"}-2`}  onChange = {()=>{setMeals(2)}} />

      <Form.Check inline label="Doesn't matter" type={"radio"} id={`inline-${"radio"}-2`}   checked = {meals === 0 ? true : false}  onChange = {()=>{setMeals(0)}}/>

     </div>
          <Form.Group id="Instructions">
              <Form.Label style = {Texts.FormLabel}>Instructions</Form.Label>
              <Form.Control
                type="text"
                ref={refInstructions}
 
               />
            </Form.Group>
          
          </Form>

          
          
          <Row>
<Col>
      {medError && <Alert variant="danger" style= {{marginTop : "7px", marginBottom : "13px", whiteSpace: "pre-line"}}>{medError}</Alert>}

            <Button disabled={loading}   className="secondaryButton" onClick = {() => {
          hideMed()
         }} >
              Back
            </Button>
            &nbsp; &nbsp;
          <Button disabled={loading}   className="primaryButton" onClick = {() => {
          handleAddChip(medicineName)
         }} >
              Add Medicine
            </Button>

</Col>
 
 
          </Row>
          
          



             </>
             
             }


        </Modal.Body>
   {isMedOpen ? <br></br> 
   
   :     <Modal.Footer>
        
         {prop.isConsultation && <Button variant="primary" onClick = {()=>{
            finalSubmit(true)
          }} disabled = {isMedOpen || loading}  >
            { "Submit and End Consultation"}
          </Button>}

          <Button variant="primary" onClick = {()=>{
            finalSubmit(false)
          }} disabled = {isMedOpen || loading}  >
Submit          </Button>

         
        </Modal.Footer>
   
   }
      </Modal>
 
    </>
  )
}
  
