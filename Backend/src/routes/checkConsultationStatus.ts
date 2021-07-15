import express from 'express';
import consultations from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) =>{
  try{

        var consultation: any = await consultations.findOne({uid: req.body.id});

     console.log(consultation, "000000")
 if(consultation){
      if(req.body.isPaid === "notpaid")
      {
          if(consultation.byDoctorStatus === 'on')
             return res.send({status: 'on', doctorEmail  : consultation.doctorEmail, consultationId : consultation.uid});
          else if(consultation.byDoctorStatus === 'cancel')
             return res.send({status: 'cancel', doctorEmail  : consultation.doctorEmail, consultationId : consultation.uid});
      }else if(consultation.accepted && consultation.active){
            return res.send({status: true, doctorEmail  : consultation.doctorEmail});
        }
    }
    return res.send({status: false});
  }catch(e){
      console.log(e,"=--==--==--==--=--=")
      return res.send({status : false, msg : "error"})
  }
});

export default router;
