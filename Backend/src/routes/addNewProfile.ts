import express from 'express';
import patients from '../models/patients';

const router = express.Router();

router.post('/', async (req, res) => {
    const patient: any = await patients.findOne({uid: req.body.uid});
    if (patient){
        let l = patient.profiles.length
        const info = {
            name: req.body.name,
            dob: req.body.dob,
            id: (l+1),
            gender: req.body.gender,
        };
        patient.profiles.push(info);
        try {
            patient.save()
            return res.send({status: 'saved_successfuly', id: info['id'], name: info['name']});
        } catch (e) {
            return res.send({status: 'technical_error'});
        }
    }

    return res.send({status: 'patient_not_found'});
});

export default router;