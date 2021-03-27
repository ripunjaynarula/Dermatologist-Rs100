import express from 'express'
import Videos from '../../models/videos'
import authStatus from '../../actions/checkLoginStatus'
const router = express.Router();

router.post('/', async (req, res) => {

  
 
   try {


        var blogs;
                  

        blogs =  await Videos.findOne({_id: req.body.blogId} );

        if(!blogs)
        {
        return res.send({ status: "nothing_found", isError : false })

        }
    


        return res.send({ status: "valid", isError : false, blog: blogs})

    } catch(e) {
        console.error(e);
        return res.send({ status: 'technical_error',isError : true});
    }
 
});

export default router;