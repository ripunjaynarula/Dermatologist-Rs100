import express from 'express'
import prescriptions from '../../models/prescriptions'

const router = express.Router();

router.post('/', async (req, res) => {

    try{
        var consultation: any = await prescriptions.find({patientUid: req.body.uid}).sort({"startDate": -1});
        for(var i =0;i<consultation.length ; i++)
        {
           consultation[i]['url'] = process.env.cdnUrl + consultation[i].url         
        }   
        return res.send({status: true, consultation});

    }catch(e){
        return res.send({status: false});

    }
    //sending dummy data for testing
});

export default router;