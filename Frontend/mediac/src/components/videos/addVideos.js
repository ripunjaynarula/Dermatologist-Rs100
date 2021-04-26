 
import {
   CardBody,
  Col,
  Card,
  Container,
} from "reactstrap"
import { convertToHTML } from 'draft-convert';

 import "../../css/buttons.css";
import app from '../../firebase'
import firebase from 'firebase'
import Navbar from '../Header'
import React, { useRef, useState, useEffect } from "react"
import {   Form, Button,   Row, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from '../../firebase'
// Form Editor
import { EditorState } from 'draft-js';
import {Styles} from "../../css/Styles"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import useWindowDimensions from "../../functions/windowDimensions"
//Import Breadcrumb
 function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
const FormEditors = () => {

   const [content, setContent] = useState("");
   const title = useRef()
      const ytLink = useRef()
   const keyword = useRef()
   const metaDesc = useRef()
   const link = useRef()

  const {  currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { height, width } = useWindowDimensions();
 const [editorState, setEditorState] = useState(

     
      ()=> EditorState.createEmpty(),
  );

     document.body.style.backgroundColor = "#ededf2";

 
 
 
 function matchYoutubeUrl(url) {
 var regExp= /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
if (match && match[2].length === 11) {
     console.log(match[2])

  return match[2];
} 
    return false;
}
  async function handleSubmit(i) {
    if(!content)
    {
              alert("Content is missing")
            return
    }
     if(content.toString().length < 1)
    {
                  alert("Content should be more than 100 letters")
return
    } 
     if(!title.current)
    {
             alert("Title is missing"  )
return  
    }
    if(title.current.value.trim().length===0){
       alert("Title is missing")
return    
}
   if(!link.current)
    {
             alert("Page link is missing"  )
return  
    }
    if(link.current.value.trim().length===0){
       alert("Page link is missing")
return    
}
   if(link.current.value.includes("/")){
       alert("Page link cannot contain '/'")
return    
}
   if(!ytLink.current)
    {
             alert("Youtube Link is missing")
return  
    }
    if(ytLink.current.value.trim().length===0){
       alert("Youtube link is missing")
return    
}

if(!matchYoutubeUrl(ytLink.current.value)){

       alert("Link is not valid. Use only youtube link")
return;

}

    try {

 
      if(currentUser)
      {
          setError("")
          setLoading(true)

          const token = await app.auth().currentUser.getIdToken(true)
   
          var d={ postData: content,
           title : title.current.value, 
          ytUrl : ytLink.current.value,
          keywords: keyword.current.value,
          metaDescription : metaDesc.current.value,
          link : link.current.value
         
             
            };

 

          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body:JSON.stringify(d)
        };

          let res = await fetch('http://localhost:5000/add-video', requestOptions);
   res = await res.text();
          res = JSON.parse(res)
 
          console.log(res)

 if(res.status === "link_used")
          {
              alert ("Link already used")

          }

      
          if(res.status === "invalid_link")
          {
              alert ("Invalid youtube link")

          }

            if(res.status === "technical_error")
            {
            await alert("Some error occured")
 
             }
            if(res.status === "saved")
            {
         await alert("Post Published")
history.push('/')        

    }

      

















      }

     


      

      setLoading(false)
      } catch(e) {
        console.log(e)
      setError("Internal error.");

      setLoading(false)
    }



  }

 









 const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {

    try{
   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
     setContent(currentContentAsHTML);
    }catch(e){
    

}


  }
  return (

    <>
    
    
<Navbar selected = "add-video" />
<br></br>
<br></br>

    <Container className="d-flex align-items-center justify-content-center">
      <div id="blogdiv" style={{ minHeight: "100vh", borderRadius : "0", minWidth: width-80 , backgroundColor : "#ededf2"}}>
      <React.Fragment>
      <div >
        <Container fluid={true} style = {{padding : width> 1400 ?   "50px 180px":  width <1000  ? "40px 10px" : "50px 80px" }}>
          <Row>
            <Col>
              <h2><strong>Add Video</strong></h2>
              <br></br>
              <Card>
                <CardBody>
              

                  <Form method="post">


                       <Form.Group id="vi" style={{paddingTop: 14}}>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Youtube Video Link</Form.Label>
              <Form.Control type="url" ref={ytLink} required />
            </Form.Group>


 <Form.Group id="title" style={{paddingTop: 1}}>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Title</Form.Label>
              <Form.Control type="text" ref={title} required />
            </Form.Group>

              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Content</Form.Label>
 
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
   editorState={editorState}
        onEditorStateChange={handleEditorChange}
                      editorStyle={{ minHeight :"200px", border: "1.2px solid #ced3da", borderRadius : "4px", paddingLeft: "13px" }} 
                     />



 <Form.Group id="keyword" style={{marginTop: 18}}>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Keywords</Form.Label>
              <Form.Control type="text" ref={keyword} placeholder = "Write keywords related to the video seperated with comma. Example - skin care, hairfall" />
            </Form.Group>




 <Form.Group id="desc" style={{paddingTop: 1}}>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Meta Description</Form.Label>
              <Form.Control type="text" ref={metaDesc} placeholder = "A short description that appears in google search result" />
            </Form.Group>
 


 <Form.Group id="desc" style={{paddingTop: 1}}>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Link</Form.Label>
              <Form.Control type="text" ref={link} placeholder = "link after /video/" />
            </Form.Group>
                  </Form>
<br></br>
   
 
         </CardBody>
              </Card>
            </Col>
          </Row>


          <Row style= {{paddingTop :"22px", paddingLeft : "18px", flexDirection: 'row', justifyContent: 'flex-end', paddingRight : "16px",  }}>
           

 

<div style = {{width : "10px", height : "10px"}}></div>
     
   <Button disabled={loading}  type="submit" className = "primaryButton" onClick= {() => handleSubmit(1)}>
              Add video
            </Button>
          </Row>




        </Container>
      </div>
    </React.Fragment>
</div>
</Container>
  
    </>
   )
}

export default FormEditors
