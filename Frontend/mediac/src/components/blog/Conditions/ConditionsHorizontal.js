 import React, {useRef,useEffect, useState, useContext} from "react";
 
 
 import BlogList from '../../BlogList';
 
 import DOMPurify from 'dompurify';

  
   import {conditions} from "./ConditionsList"
 
export default function Home() {
  

 
  
 
    return (
    <>
                    <BlogList mail="mail" blogs = {conditions} />

 

    </>
  )
}
  
