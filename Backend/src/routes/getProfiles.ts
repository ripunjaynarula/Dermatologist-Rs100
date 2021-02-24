import express from 'express'
import patients from '../models/patients'

const router = express.Router();

router.get('/', async (req, res) => {
    const patient: any = await patients.findOne({uid: req.body.uid});
    if (patient) {
        let profiles = patient.profiles;
        return res.send({status: 'success', profiles: profiles});
    }
    res.send({status: 'no_account_found'});
});

export default router;