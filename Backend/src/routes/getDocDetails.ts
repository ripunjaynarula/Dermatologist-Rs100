import doctors from '../models/doctors';
import blogs from '../models/blog'
import express from 'express';
import checkAuth from '../middlewares/auth';
import consultaions from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) => {
 
    try{
        var doc: any = await doctors.findOne({email: req.body.email});
        if (doc){
        var  consultaion : any= await consultaions.find({ $or: [ {active: true}, {scheduled: true} ]  },{}).sort({"startDate": -1});
        console.log(consultaion)
        return res.send({status: true, data: consultaion})
        }
        return res.send({status:false});


    }catch(e)

    {return res.send({status:false});}
});

export default router;