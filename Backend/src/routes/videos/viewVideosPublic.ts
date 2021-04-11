import express from 'express'
import Videos from '../../models/videos'
 const router = express.Router();

router.post('/', async (req, res) => {
 
    
   try {

    var arr = []
  

           var videos =  await Videos.aggregate([{$sample: {size: 18}}]) ;
  
        return res.send({status: 'valid', isError : false, videos : videos})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;