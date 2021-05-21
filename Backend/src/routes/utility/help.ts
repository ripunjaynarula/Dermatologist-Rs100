import express from 'express'
 
import { uid } from 'rand-token';
 
import sendMail from '../../actions/sendMail';
import patient from '../../models/patients';

const router = express.Router();

router.post('/', async (req:any, res: any) => {
    
    

    try{
var p : any = await patient.findOne({uid : req.body.uid});
if(!p)        res.send({isError: true, message: 'Internal Error.'});



      var isSent =   await sendMail(process.env.MAIL_EMAIL, "Help request from " + p.name, `<p>  ${ req.body.query !== "Other" ? "Query - " + req.body.query : ""} </p> <p> Description - ${req.body.desc} <br>Patient name- ${p.name} <br> Patient id - ${req.body.uid} <br> Patient email - ${p.email} <br>  Patient Contact - ${p.phone} </p>`, `"helpdesk ${process.env.MAIL_ID}"` )

        return res.send({isError: !isSent, });
    } catch (e) {
        res.send({isError: true, message: 'Internal Error.'});
        return;
    }

});

 
export default router;