import doctors from '../models/doctors';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const doc: any = await doctors.findOne({email: req.body.email});
    if (doc){
        res.send({status: true, name: doc.name, education: doc.education, degree: doc.degree, experience: doc.pastExperience, specialisation: doc.specialisation, city: doc.city});
        return;
    }
    return res.send({status:false});
});

export default router;