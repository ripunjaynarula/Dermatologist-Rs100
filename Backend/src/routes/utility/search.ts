import express from 'express'
 
import { uid } from 'rand-token';
 
import sendMail from '../../actions/sendMail';
import patient from '../../models/patients';

import Unregistered from '../../models/unregistered';
const router = express.Router();

router.post('/', async (req:any, res: any) => {
    if(req.body.role !== 'doctor') return         res.send({isError: true, message: 'Internal Error.'});

    if(!req.body.text)    return res.send({isError: true, message: 'Internal Error.'});

    

    try{
    var p : any = await patient.find({$or: [ {phone: {$regex:req.body.text}}, {email:  {$regex:req.body.text}} ]}, {_id : 0,profiles:0, videoLikes:0, blogLikes:0, role : 0}).limit(10);
 
console.log(p)
     
    var u : any = await Unregistered.find({$or: [ {phone: {$regex: req.body.text}}, {email:  {$regex: req.body.text}} ]}).limit(10);
 
    return res.send({isError: false, data : p, unregistered: u });
    } catch (e) {
        console.log(e)
        res.send({isError: true, message: 'Internal Error.'});
        return;
    }

});

 
export default router;