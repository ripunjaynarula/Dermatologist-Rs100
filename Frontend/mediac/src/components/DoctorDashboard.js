import { Container, Card, CardBody, Row, Col,Button, Form } from "react-bootstrap";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import Header from "./Header";
import ViewPrescription from "./utility/viewPrescriptionDetails";

import docimg from "./img/doc.jpeg";
import "./styles.css";
  import {reactLocalStorage} from 'reactjs-localstorage';

import DataTable  from 'react-data-table-component';
import getAge from './utility/getAge'
import Prescription from './Prescription/AddPrescription'

var selectedRow = {}
export default function DoctorDashboard() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
    const [body, setBoody] = useState([]);
    const [users, setUsers] = useState([]);
    const [showPrescription, setShowPrescription] = useState(false)
  const [showDetails, setShowDetails] = useState(false);
  const [onShowDetailsSend, setOnShowDetailsSend] = useState(()=>{});
  const [consultationDetails, setConsultationDetails] = useState(false);

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState({})

const[text , setText] = useState("")
const pcolumns = [{
    name: 'Name',
    selector: 'name',    sortable: true,

   },
  {
    name: 'Phone number',
    selector: 'phone',
     allowOverflow: true,
    sortable: true,

  }, 
    {
    name: 'Email',
    selector: 'email',
      grow: 1,
    sortable: true,

  }, 
   {
    name: 'Age',
    selector: 'dob',
          grow: 0.5,

     sortable: true,

  }, 
     {
    name: 'Status',          
    grow: 0.8,
    sortable: true,
    selector: 'isRegistered',

             cell:(row) =>   <div className = { row.isRegistered   ? "chip green" : "chip pink"}> {row.isRegistered ? "Registered" : "Unregistered"} </div>

 
  }, 
  {
    cell:(row) =>       <button onClick = {()=>{
      
      setSelected(row)
      setShowPrescription(true)
          }} id={row.uid}>Send Prescription</button>
,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },]




const columns = [{
    name: 'Name',
    selector: 'name',
    sortable: true,
    grow: 1,
  },
  {
    name: 'Status',
    selector: 'status',
         cell:(row) =>   <div className = {row.scheduled ? "chip yellow" : row.accepted ? "chip green" : "chip pink"}>
            {row.scheduled ? "Scheduled" : row.accepted ? row.orderId === "not-set" ?"Await Payment": "Active" : "Pending"} </div>

  }, 
  {
    name: 'Place',
    selector: 'state',
     sortable: true,

  },



   {
    name: 'Time',
    selector: 'startDate',
    sortable: true,
    grow:1,
  },
  {
    name: 'Phone number',
    selector: 'phone',
     allowOverflow: true,
    sortable: true,

  }, 
    {
    name: 'Email',
    selector: 'patientEmail',
      grow: 1,
    sortable: true,

  }, 
  {
    cell:(row) =>       <div>
<button onClick = {()=>{

console.log(row,"llll")
      if(row.scheduled)
      {

        setConsultationDetails(row)
        setShowDetails(true)
        selectedRow = row
        return
      
      }
      if(row.accepted)
      {

        if(row.orderId === "not-set")
        {

window.open(process.env.REACT_APP_API_URL + 'acceptConsultation?cid=' + row.consultationId + '&email=' + currentUser.email + "&status=cancel&isPaid=notpaid&cancel=force")
return
        }
        history.push("/chat/d")
      }else{


console.log(row.consultationId)

window.open(process.env.REACT_APP_API_URL + 'acceptConsultation?cid=' + row.consultationId + '&email=' + currentUser.email + "&status=on&isPaid=notpaid")


      }
      
          }} id={row.uid}>{row.scheduled ? "View" : row.accepted ?  "End" : "Accept"}</button>




{!row.scheduled && !row.accepted &&
<button onClick = { async ()=>{


 
console.log(row.consultationId)
window.open(process.env.REACT_APP_API_URL + 'acceptConsultation?cid=' + row.consultationId + '&email=' + currentUser.email + "&status=cancel&isPaid=notpaid")


    
      
          }} id={row.uid}>{"Cancel"}</button>




}


{row.scheduled && <button onClick = {async ()=>{
   
          var r = window.confirm(`You sure you want to end conversation with ${row.name} ??`);
  if (r === true) {
  if(row.scheduled)
      {
        try{
  const token = await currentUser.getIdToken(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({ id: row.consultationId, type : 'end-scheduled' }),
    };
      let res = await fetch(
          process.env.REACT_APP_API_URL + 'toggleArchive',
          requestOptions
        );
        res = await res.text();
        res = JSON.parse(res);
        if(res.success)
        {
          checkLogin()
        }
  
      }catch(e){

      }
      }
  

   }  
      
          }} id={row.uid}>End</button>}

    </div>
,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },]


   useEffect( () => {
     onlyOnce();
         checkLogin();

  }, [] )

async function onlyOnce()  {
  if(!currentUser) return;
  var role =  reactLocalStorage.get('role') 
 
  if(role === undefined) role  = "";
 
  
  if(role ==="patient"){
     await logout();
      
     return history.push("/login");
     }
  }
 
   async function checkLogin() {
     try{
 const token = await currentUser.getIdToken(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ email: currentUser.email }),
      };
      setLoading(true)
      setBoody([])
      let res = await fetch(
        process.env.REACT_APP_API_URL+'getDocDetails',
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      if (!res["status"]) {
        await logout();
        history.push("/login");
      } else {
         for(var i=0; i< res.data.length; i++)
        {
          res.data[i].time = dateAndTime(res.data[i].time)
          res.data[i].isRegistered = true
          res.data[i].email = res.data[i].patientEmail
          res.data[i].isConsultation = true
          res.data[i].consultationId = res.data[i].uid
          res.data[i].uid = res.data[i].patientUid
          res.data[i].isAddNew = false
          res.data[i].dob = res.data[i].age
          res.data[i].startDate = dateAndTime(new Date(res.data[i].startDate).getTime())
        }
        setBoody(res.data)

      }
      setLoading(false)
     }catch(e){

     }
    }



  async function search(e){
       try{
 const token = await currentUser.getIdToken(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ text: e }),
      };
      setSearching(true)
       let res = await fetch(
        process.env.REACT_APP_API_URL+'search',
        requestOptions
      );
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      if (res.isError) {
       // await logout();
      //  history.push("/login");
      } else {
        console.log(res)

        for(let i=0; i<res.unregistered.length; i++)
        {
                    res.unregistered[i].dob = res.unregistered[i].age

          res.unregistered[i].uid = res.unregistered[i]._id
          res.unregistered[i].isAddNew = false
          res.unregistered[i].isRegistered = false
        }
        for(var i=0; i< res.data.length; i++)
        {
          res.data[i].dob = getAge(res.data[i].dob)
          res.data[i].isAddNew = false

          res.data[i].isRegistered = true
        }
        res.data = res.data.concat(res.unregistered)
        setUsers(res.data)

      }
      setSearching(false)
     }catch(e){

     }
  }  
 
  return (
    <>
      <Header />
      <br />
            <br />      <br />      <br />
      <div
        id="doc"
        className="container">
     

<h3>Send Prescription</h3>

     <div className="new-consultations">

  <Form.Control type="text" placeholder = "Search patient by phone number" onChange = {(e)=>{
if(e.target.value)
search(e.target.value.trim().toLowerCase())
setText(e.target.value)
              }}   /> 

<div style = {{ width :"10px"}}></div>

      <Button  className="primaryButtonSmall" style = {{height:"40px"}}  disabled ={getDisabled(searching, users, text)} onClick={()=>{
             var phoneno = /^\d{10}$/;
             
     if((!text.trim().match(phoneno)))
     {
       alert("Invalid Phone Number")
       return
     }
         setSelected({phone: text.trim(), dob : "", gender:"", name :"", isAddNew : true})
         
      setShowPrescription(true)
      }}>Add Patient</Button>
      


      
</div>
     <br/>

  <DataTable  
 
                data={users}
        columns={pcolumns}
                  progressPending = { searching && users.length===0  ? true : false}
                />








<div style = {{height:"80px"}}></div>

     <div className="new-consultations"> 
      
      <h3>New Consultations</h3>

<div style = {{display:"flex"}}>
 
      <Button  className="outlineButtonSmall"  disabled ={loading} onClick={checkLogin}>Refresh</Button>

</div>

     </div>
     
     
     
     <br/>



  <DataTable  
 
                data={body}
        columns={columns}
                  progressPending = { loading && body.length===0  ? true : false}
                />


 




           </div>




      <br /> <br />
    
      <br />
      <br />

      <ViewPrescription
        show  = {showDetails}
        onHide = {()=>{
          setShowDetails(false)
        }}
        
        onSubmit = {onShowDetailsSend}
        data = {consultationDetails}
        onPrimary = {()=>{
          
                setSelected(consultationDetails)
              setShowPrescription(true)
  
        }}
        

      ></ViewPrescription>
         
                <Prescription
          show = {showPrescription}
          onHide = {()=>{setShowPrescription(false)}}
          name = {getDetails().name}
          chatId = {""}
          uid = {getDetails().uid}
          isAddNew = {getDetails().isAddNew ? true : false}
          type = {getDetails().isRegistered ? "registered" : "unregistered"}
          patientEmail = {getDetails().email}
          email = {getDetails().email}
          isConsultation = {getDetails().isConsultation}
          consultationId = {getDetails().consultationId}
          refresh = {() =>{
          checkLogin()
        }}
          callback = {(url)=>{
              var r = window.confirm("Prescription sent. View??");
  if (r === true) {

    window.open(process.env.REACT_APP_CDN_URL+url)


   } else {
   }
           }}
          phone = {selected.phone}
          gender = {selected.gender}
          age = {getDetails().dob}

          >

          </Prescription>
    </>
  );


  function getDetails(){

    console.log(selected, "SELECTED")
     return selected
  }
}


function dateAndTime(unixtime) {
var d = (new Date(unixtime)).toLocaleString().split(":")

      return  d[0] + ":"+d[1]
    };



    function getDisabled(search, list, text){
      if(search) return true
      if(!text) return true
      for(var i=0; i<list.length; i++)
      {
        if(text === list[i].phone || text === list[i].email)
          return true
      }
    }