import express from 'express'
import consultations from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) => {
  try{
         var consultation: any = await consultations.find({patientEmail: req.body.email}).sort({"startDate": -1});
    if (consultation.length != 0){
        return res.send({status: true, consultation});
    }
    //sending dummy data for testing
    return res.send({status: false});
  }catch(e)
  {
          return res.send({status: false, msg:"error"});

  }
});

export default router;