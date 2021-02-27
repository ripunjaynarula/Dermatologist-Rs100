import express from 'express'
import patients from '../models/patients'
import jwt from 'jsonwebtoken';
import sendVerificationMails from '../actions/verificationMail';
import fbUpdate from '../actions/updateDetailsFIrebaseAuth';

import checkAuth from '../middlewares/auth';
const router = express.Router()

router.get('/', (req, res) => {
    res.send('signup route')
})

router.post('/',checkAuth, async (req, res) => {

    let patient;

    const newPatient = new patients({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        uid: req.body.uid,
        verified: false
    });

    try {

       patient = await newPatient.save();
        if(req.body.phone)
                  fbUpdate.changeNamePhoneAccessFirebaseAuth(req, req.body.name, req.body.phone, "patient");
        else{
        
                    fbUpdate.changeNameAccessFirebaseAuth(req, req.body.name, "patient");

        }       
        let jwtSecret: any = process.env.JWT_SECRET;
       let verificationToken: string = jwt.sign({_id : patient._id}, jwtSecret);

        sendVerificationMails(req.body.email, verificationToken);

        return res.send({status: 'verification_mail_sent'});

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error'});
    }


});

export default router;
