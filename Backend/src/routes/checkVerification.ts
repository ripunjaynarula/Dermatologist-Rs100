import express from 'express';
import patients from '../models/patients';

const router = express.Router();

router.post('/', async (req, res) => {
    const patient: any = await patients.findOne({email: req.body.email})
    const verificationStatus = patient.verified;
    return res.send({status: verificationStatus});
});

export default router;

