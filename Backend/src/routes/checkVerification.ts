import express from 'express';
import patients from '../models/patients';

const router = express.Router();

router.post('/', async (req, res) => {
    const patient: any = await patients.findOne({email: req.body.email})
    if (patient) {
        patient['uid']=req.body.uid
        const verificationStatus = patient.verified;
        try {
            patient.save();
            return res.send({status: verificationStatus});
        }
        catch (e){
            return res.send({status: false});
        }
    }
    res.send({status: false});
});

export default router;

