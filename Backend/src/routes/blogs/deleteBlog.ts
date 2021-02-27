import express from 'express'
import blog from '../../models/blog'
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {


console.log(req.body)
 

    

   
   try {
const MyModel = mongoose.model('ModelName');

         

        return res.send({status: 'deleted', isError : false})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;