import express from 'express'
import patients from '../models/patients'
import jwt from 'jsonwebtoken';
import sendVerificationMails from '../actions/verificationMail';
 
const router = express.Router()

 

router.post('/', async (req, res) => {


//TODO : Check firebase token, validate it. Then check if email exists and then check it it is verified. 



});

export default router;
