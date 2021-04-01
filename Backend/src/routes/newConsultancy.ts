import express from 'express'
import consultations from '../models/consultation';
import patients from '../models/patients';
import { uid } from 'rand-token';

const router = express.Router();

router.post('/', async (req:any, res: any) => {
    const patient = await patients.findOne({email: req.body.email});
    if(!patient){
        return res.send({success: false, message: "Invalid Attempt."})
    }

    let id = uid(10);
    let consultation = 
    res.send({success: true});
});

export default router;