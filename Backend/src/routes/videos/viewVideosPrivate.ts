import express from 'express'
import Videos from '../../models/videos'
import authStatus from '../../actions/checkLoginStatus'
const router = express.Router();

router.post('/', async (req, res) => {

    //to add pagination
 
    var limit = req.body.limit
    //show data randomly
 
   try {
 
           var videos =  await Videos.aggregate([{$sample: {size: 5}},  ]) ;

           return res.send({status: 'valid', isError : false, videos})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;