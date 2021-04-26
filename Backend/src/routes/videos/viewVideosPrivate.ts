import express from 'express'
import blog from '../../models/videos'
 const router = express.Router();

router.post('/', async (req, res) => {

 
 
   try {



        var blogs : any;
      
            blogs =  await blog.find({doctorId: req.body.uid} );
 


        return res.send({status: 'valid', isError : false, videos:blogs})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;