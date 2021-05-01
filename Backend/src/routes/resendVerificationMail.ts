import express from 'express'
import patients from '../models/patients'
import jwt from 'jsonwebtoken';
import sendVerificationMails from '../actions/verificationMail';
import fbUpdate from '../actions/updateDetailsFIrebaseAuth';

import checkAuth from '../middlewares/auth';
const router = express.Router()

 
router.post('/',checkAuth, async (req, res) => {

    let patient :any = patients.findOne({uid : req.body.uid})

    try {

    
        if(patient.verified)
        {
            return res.send({status : "already_verified"})
        }
 

         let jwtSecret: any = process.env.JWT_SECRET;
       let verificationToken: string = jwt.sign({_id : req.body.uid}, jwtSecret);

if(req.body.resend)
        sendVerificationMails(patient.email, verificationToken);
else{
                return res.send({status : "not_verified"})

}
        return res.send({status: 'verification_sent'});

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error'});
    }


});

export default router;
