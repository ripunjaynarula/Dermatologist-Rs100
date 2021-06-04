import express from 'express'
 
import { uid } from 'rand-token';
 
import sendMail from '../../actions/sendMail';
import Settings from '../../models/settings';
import {ObjectID} from 'mongodb';

const router = express.Router();

router.post('/', async (req:any, res: any) => {
    
    
     try{
    var p : any = await Settings.find({});
    if(!req.body.fetch)
    {
        if(p.length==0) {           
            var pr = new Settings ({
            time : req.body.time,
            isClinicOpen:req.body.isClinicOpen,
            openDays:req.body.openDays

            })
            await pr.save()
    }else{
        p = p[0]
 
        var i = await Settings.updateMany({_id : new  ObjectID(p._id)}, {$set :{time: req.body.time, isClinicOpen: req.body.isClinicOpen, openDays : req.body.openDays}})
 }
return res.send({saved : true, isError : false})
    }



     
        return res.send({isError: false, data : p.length > 0 ? p[0] : "" });
    } catch (e) {
        res.send({isError: true, message: 'Internal Error.'});
        return;
    }

});

 
export default router;