import express from 'express'
import blog from '../../models/blog'

const router = express.Router();

router.post('/', async (req, res) => {


console.log(req.body)
    const consultation: any = await blog.findOne({$and: [ {patientEmail: req.body.email}, {active: true} ]});
    if (consultation){
        return res.send({status: true, startDate: consultation.startDate, title: consultation.title, age: consultation.age, weight: consultation.weight, height: consultation.height, docMail: consultation.doctorEmail});
    }
    return res.send({status: false})
});

export default router;