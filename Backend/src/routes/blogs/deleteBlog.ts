import express from 'express'
import blog from '../../models/blog'
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {


  

    

   
   try {
         var d :any = await blog.findOne({ _id: req.body.blogId })         

console.log(d)
console.log(req.body)
if(d.doctorId !== req.body.uid )
{
    return res.send({status : "403", isError : true})
}
        var r = await blog.deleteOne({ _id: req.body.blogId })         

        return res.send({status: 'deleted', isError : false})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;