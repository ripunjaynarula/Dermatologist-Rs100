import express from 'express';
import patients from '../models/patients';

const router = express.Router();

router.post('/', async (req, res, next) => {

     var patient: any = await patients.findOne({email: req.body.email})
    if (patient) {
        var verificationStatus = patient.verified;
            if(verificationStatus){

                return next;
            }else{
            return res.send({status: verificationStatus});

        }
      
    }
    res.send({status: false});
});

export default router;

