import express from 'express'
import consultations from '../models/consultation'

const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req.body.email);
    const consultation: any = await consultations.findOne({$and: [ {patientEmail: req.body.email}, {active: true} ]});
    if (consultation){
        return res.send({status: true, startDate: consultation.startDate, title: consultation.title, age: consultation.age, weight: consultation.weight, height: consultation.height});
    }
    return res.send({status: false})
});

export default router;