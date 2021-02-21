import express from 'express'
import blog from '../../models/blog'

const router = express.Router();

router.post('/', async (req, res) => {


console.log(req.body)
 

    

   
   try {

        //todo  : Delete blog post with specific id and user id


        return res.send({status: 'deleted', isError : false})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;