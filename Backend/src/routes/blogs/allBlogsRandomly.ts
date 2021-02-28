import express from 'express'
import blog from '../../models/blog'
import authStatus from '../../actions/checkLoginStatus'
const router = express.Router();

router.post('/', async (req, res) => {

    //to add pagination
 
    var limit = req.body.limit
    //show data randomly
 
   try {



        var blogs;
  

         blogs =  await blog.find({isPublished: true},  );
        
  
        return res.send({status: 'valid', isError : false, blogs})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;