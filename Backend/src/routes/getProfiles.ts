import express from 'express'
import patients from '../models/patients'
import getAge from '../actions/getAge'
import consultations from '../models/consultation'
const router = express.Router();
import Settings from '../models/settings';

router.get('/', async (req, res) => {
try{


     if(req.body.role !== "patient")
    {
        return res.send({url : "/login", redirected : true})
    }
 var details = await Settings.find({})


        var patient: any = await patients.findOne({uid: req.body.uid} );
    if (patient) {
        let profiles = patient.profiles;

        var age  : any  = ""
        if(patient.dob)
        {
            age = getAge(patient.dob)
        }



              var consultation: any = await consultations.find({patientEmail: req.body.email});
  var consultationId = ''
   for(var i=0;i<consultation.length; i++)
   {
       if(consultation[i].scheduled === false)
       {
           if(consultation[i].active && !consultation[i].accepted)
            {
                consultationId = consultation[i].uid
                break
            }
       }
   }
 
         return res.send({status: 'success', data: details.length >0 ? details[0] : {} ,profiles: profiles, age : age, gender : patient.gender, phoneNumber : patient.phone , consultationId: consultationId });
    }
 return   res.send({status: 'no_account_found'});
}catch(e)
{
    
    console.log(e)
     return   res.send({status: 'no_account_found'});

}
});

export default router;