import express from 'express'
import blog from '../../models/blog'
import authStatus from '../../actions/checkLoginStatus'
const router = express.Router();

router.post('/', async (req, res) => {

    //to add pagination
    var start = req.body.start
    var limit = req.body.limit
 
   try {



        var blogs;
        if(await authStatus.checkAuthStatus(req))
        { 
            
            blogs  = await blog.find({$and: [ {doctorId: req.body.uid}, {isPublished: true} ]});
        
        }else{

            blogs =  await blog.find({doctorId: req.body.uid} );
            
        }




        return res.send({status: 'valid', isError : false, blogs})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;