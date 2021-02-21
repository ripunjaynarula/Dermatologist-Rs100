import express from 'express'
import consultations from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) => {
    const consultation: any = await consultations.findOne({$and: [ {uid: req.body.uid}, {active: true} ]});
    if (consultation){
        return res.send({status: true, startDate: consultation.startDate, title: consultation.title, age: consultation.age, weight: consultation.weight, height: consultation.height, docMail: consultation.doctorEmail});
    }
    return res.send({status: false})
});

export default router;