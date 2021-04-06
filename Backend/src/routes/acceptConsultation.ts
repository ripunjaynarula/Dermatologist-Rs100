import express from 'express';
import consultations from '../models/consultation';
import doctors from '../models/doctors';

const router = express.Router()

router.post('/', async (req, res) => {
    const doc: any = await doctors.findOne({email: req.body.email});
    if(doc){
        const consultation: any = await consultations.findOne({uid: req.body.cid});
        if(consultation){
            if(consultation.accepted){
                return res.end();
            }
            consultation.accepted = true;
            consultation.doctorEmail = doc.email;
        }
    }
    // create chat
    return res.end();
});

export default router;