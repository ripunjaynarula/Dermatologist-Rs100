import express from 'express'
const router = express.Router();
import patients from '../../models/patients';

router.post('/', async (req, res) => {
console.log(req.body)
 
        var patientUid = req.body.patientUid


        try {
    var d :any = await patients.findOne({uid:patientUid});
    console.log(d, "---")
if(d)
{

if(d.uid != req.body.uid)
{
                return res.send({status: "access_denied", isError : true})
}


            return res.send({status: "okay", isError : false, data : d})

}else{

 return res.send({status: "no_data", isError : true})

}


        } catch (e) {
            console.log(e);
            return res.send({status: "technical_error", isError : true})
        }


 


 
 
});

export default router;