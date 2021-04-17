import express from 'express'
import blog from '../../models/blog'
import authStatus from '../../actions/checkLoginStatus'
const router = express.Router();

router.post('/', async (req, res) => {

 
 
   try {



        var blogs : any;
      
            blogs =  await blog.find({doctorId: req.body.uid} );
            
        for(var i =0;i<blogs.length; i++)
{
            blogs[i].image = process.env.cdnUrl + blogs[i].image
}


        return res.send({status: 'valid', isError : false, blogs})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;