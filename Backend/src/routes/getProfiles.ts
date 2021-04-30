import express from 'express'
import patients from '../models/patients'
import getAge from '../actions/getAge'
const router = express.Router();

router.get('/', async (req, res) => {
try{

    if(req.body.role !== "patient")
    {
        return res.send({url : "/login", redirected : true})
    }
 

        var patient: any = await patients.findOne({uid: req.body.uid} );
    if (patient) {
        let profiles = patient.profiles;

        var age  : any  = ""
        if(patient.dob)
        {
            age = getAge(patient.dob)
        }
        return res.send({status: 'success', profiles: profiles, age : age, gender : patient.gender });
    }
 return   res.send({status: 'no_account_found'});
}catch(e)
{
    
    console.log(e)
     return   res.send({status: 'no_account_found'});

}
});

export default router;