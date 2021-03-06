 
import {
   CardBody,
  Col,
  Card,
  Container,
} from "reactstrap"
import { convertToHTML } from 'draft-convert';

 import "../../css/buttons.css";
import app from '../../firebase'

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

  const [picture, setPicture] = useState(null);
  const [content, setContent] = useState("");
const [file, setFile] = useState("");
  const title = useRef()
  const {  currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { height, width } = useWindowDimensions();
 const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );


   const onChangePicture = e => {
    if (e.target.files && e.target.files[0]){
           setPicture(URL.createObjectURL(e.target.files[0]) );
      setFile(e.target.files[0])
    }
  
   else {
      setPicture(null)  
      setFile("")
  }
};
 
 
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
    if(title.current.value.trim().length===0){
       alert("Title is missing")
return    
}


    try {

 
      if(currentUser)
      {
          setError("")
          setLoading(true)

          const token = await app.auth().currentUser.getIdToken(true)
   
          var d={ postData: content, title : title.current.value, 
          fileName : file["name"] ? file["name"] : null,
          isPublished : i ===0 ? false : true, 
          fileUploaded : false,
          blogId : null,
          image : file["name"]
           
            };

 

          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body:JSON.stringify(d)
        };

          let res = await fetch('http://localhost:5000/add-blog', requestOptions);
   res = await res.text();
          res = JSON.parse(res)
 
          d.image = res.fileName
          d.blogId = res.blogId




          if(file)
          {


              await  uploadFile(res.url)


              d.fileUploaded = true
              requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'token': token },
              body:JSON.stringify(d)
              };
                        let res2 = await fetch('http://localhost:5000/add-blog', requestOptions);

              res2 = await res2.text();
              res= JSON.parse(res2)
    

          }

 
          if(!res.isError)
          {

            if(res.status === "saved_draft")
            {
              alert("Draft saved successfully")
            }
            if(res.status === "saved")
            {
             var da = await alert("Post Published")
             console.log(da)
            }

          }

















      }

     


      

      setLoading(false)
      } catch(e) {
        console.log(e)
      setError("Internal error.");

      setLoading(false)
    }



  }


async function uploadFile(putURL) {
 
   
 let r = await fetch(putURL, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "image/jpeg",
      "x-amz-acl": "public",
   
     },
  });

  console.log(r)
    
  };











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

    <Container className="d-flex align-items-center justify-content-center">
      <div id="blogdiv" style={{ minHeight: "100vh", borderRadius : "0", minWidth: width-15 , backgroundColor : "#ededf2"}}>
      <React.Fragment>
      <div >
        <Container fluid={true} style = {{padding : width> 1400 ?   "50px 180px":  width <1000  ? "40px 10px" : "50px 80px" }}>
          <Row>
            <Col>
              <h2><strong>Publish</strong></h2>
              <br></br>
              <Card>
                <CardBody>
              

                  <Form method="post">
 <Form.Group id="email" style={{paddingTop: 14}}>
              <Form.Label style = {{fontSize: "18px", color: Styles.fontLabelColor }}>Title</Form.Label>
              <Form.Control type="email" ref={title} required />
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
                  </Form>
<br></br>
   
{picture &&              <img width="200" height="200" src={picture} alt="No" />   }
{picture && <br></br>}
{picture && <br></br>}
            <input type="file" name="myImage" onChange={onChangePicture}/>


                </CardBody>
              </Card>
            </Col>
          </Row>


          <Row style= {{paddingTop :"22px", paddingLeft : "18px", flexDirection: 'row', justifyContent: 'flex-end', paddingRight : "16px",  }}>
           

<Button disabled={loading}  type="submit"  className = "secondaryButton" onClick= {() => handleSubmit(0)} >
              Save as draft
            </Button>

<div style = {{width : "10px", height : "10px"}}></div>
     
   <Button disabled={loading}  type="submit" className = "primaryButton" onClick= {() => handleSubmit(1)}>
              Publish
            </Button>
          </Row>




        </Container>
      </div>
    </React.Fragment>
</div>
</Container>
   )
}

export default FormEditors
