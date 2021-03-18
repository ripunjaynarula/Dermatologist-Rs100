import doctors from '../models/doctors';
import express from 'express';
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/', async (req, res) => {
    const doc: any = await doctors.findOne({email: req.body.email});
    if (doc){
        const check = await bcrypt.compare((req.body.email+doc.uid), doc.token);
        if (check) {
            res.send({status: true, name: doc.name, education: doc.education, degree: doc.degree, experience: doc.pastExperience, specialisation: doc.specialisation});
            return;
        }
    }
    
    return res.send({status:false});
});

export default router;