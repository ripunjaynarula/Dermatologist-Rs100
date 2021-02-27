import express from 'express'
import consultations from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) => {
    const consultation: any = await consultations.find({$and: [ {uid: req.body.uid}, {active: true} ]});
    if (consultation.length != 0){
        return res.send({status: true, consultation});
    }
    return res.send({status: true, consultation : [{email : "sasas"}, {email : "ooo"}]})
});

export default router;