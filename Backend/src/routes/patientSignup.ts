import express from 'express'
import patients from '../models/patients'
import mongoose from 'mongoose'
// import jwt from 'jsonwebtoken';
import hashPassword from '../actions/hash';
import sendVerificationMails from '../actions/verificationMail';

const router = express.Router()

router.get('/', (req, res) => {
    res.send('signup route')
})

router.post('/', async (req, res) => {

    if (!(typeof req.body.email === 'string' && typeof req.body.password === 'string')) {
        return res.send({error: 'invalid_input'});
    }

    let patient = await patients.findOne({email: req.body.email});

    if (patient) {
        return res.send({error: 'account_exists'});
    }

    const hashedpass: string = await hashPassword(req.body.password)

    const newPatient = new patients({
        name: req.body.name,
        email: req.body.email,
        password: hashedpass,
        phone: req.body.phone,
        verified: false
    });

    try {
        patient = await newPatient.save()
    } catch(e) {
        console.error(e);
        return res.send({error: 'technical_error'});
    }

    sendVerificationMails(req.body.email, 'sample_token')

    res.send({status: 'success'});

});

export default router;
