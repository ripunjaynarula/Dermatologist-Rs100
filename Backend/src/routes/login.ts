import express from 'express'
import patients from '../models/patients'
import jwt from 'jsonwebtoken';
import sendVerificationMails from '../actions/verificationMail';
import fbUpdate from '../actions/updateDetailsFIrebaseAuth';

import checkAuth from '../middlewares/auth';
import doctors from '../models/doctors';
const router = express.Router()

router.get('/', (req, res) => {
    res.send('signup route')
})

router.post('/',checkAuth, async (req, res) => {

    let patient;
    console.log(req.body)
   var d :any = await patients.findOne({uid:req.body.uid});
    if(d !=null)
   {
       if(d.verified)
       {
                    return res.send({status: 'verification_mail_sent', isError : false,   scope: 'patient'})

       }
         return res.send({isError : false, status : "logged_in", scope: 'patient'})
   }
   
   d = await doctors.findOne({uid: req.body.uid})

   if(d !=null){
    return res.send({isError : false, status : "logged_in", scope: 'doctor'});
   }

 
    try {
           var newPatient = new patients({
        name: req.body.name ? req.body.name : "",
        email: req.body.email,
         uid: req.body.uid,
        verified: false,
        role : req.body.role ? req.body.role : "patient" 
       });

        patient = await newPatient.save();
        let jwtSecret: any = process.env.JWT_SECRET;
        let verificationToken: string = jwt.sign({_id : req.body.uid}, jwtSecret);
        sendVerificationMails(req.body.email, verificationToken);
        return res.send({status: 'verification_mail_sent', isError : false, scope: 'patient'});
    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
});

export default router;
