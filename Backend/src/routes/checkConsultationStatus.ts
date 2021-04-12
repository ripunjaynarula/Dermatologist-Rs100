import express from 'express';
import consultations from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) =>{
    const consultation: any = await consultations.findOne({uid: req.body.id});
    if(consultation){
        if(consultation.accepted){
            return res.send({status: true});
        }
    }
    return res.send({status: false});
});

export default router;