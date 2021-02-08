import express from 'express'
import patients from '../models/patients'
import jwt from 'jsonwebtoken';
import sendVerificationMails from '../actions/verificationMail';

const router = express.Router()

router.get('/', (req, res) => {
    res.send('signup route')
})

router.post('/', async (req, res) => {

    let patient;

    const newPatient = new patients({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        verified: false
    });

    try {
       patient = await newPatient.save();
       let jwtSecret: any = process.env.JWT_SECRET;
       let verificationToken: string = jwt.sign({_id : patient._id}, jwtSecret);
       await sendVerificationMails(req.body.email, verificationToken);
    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error'});
    }

    res.send({status: 'verification_mail_sent'});

});

export default router;
