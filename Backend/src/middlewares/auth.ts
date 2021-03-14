import admin from './initFirebase'
 
 
import jwt from 'jsonwebtoken';
import sendVerificationMails from '../actions/verificationMail';
 
const checkAuth = async (req: any, res: any, next: any) => {


    if (req.headers.token) {
    admin.auth().verifyIdToken(req.headers.token)
    .then((data)=>{

      console.log("data",data)
 
     req.body.uid = data.user_id
     req.body.role = data.role
     if(data.role == "patient")
     {
       if(!data.emailVerified)
       {
        




       }
     }
     
     next();
    }).catch((e) => {
      console.log(e)
      return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403)
  }
}

export default checkAuth;
