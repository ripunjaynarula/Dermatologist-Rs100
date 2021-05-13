import express from 'express';
import consultations from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) =>{
  try{
        var consultation: any = await consultations.findOne({uid: req.body.id});
    if(consultation){
        if(consultation.accepted && consultation.active){
            return res.send({status: true});
        }
    }
    return res.send({status: false});
  }catch(e){
      return res.send({status : false, msg : "error"})
  }
});

export default router;