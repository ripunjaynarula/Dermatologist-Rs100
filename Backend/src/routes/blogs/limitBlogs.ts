import express from 'express'
import blog from '../../models/blog'
import authStatus from '../../actions/checkLoginStatus'
const router = express.Router();

router.post('/', async (req, res) => {

    //to add pagination
 
    var limit = req.body.limit
    //show data randomly
 
   try {

var arr = []


        var blogs : any;
 

         blogs =  await blog.find({isPublished: true}  ) ;
         for (var i =0; i< blogs.length; i++)
        {
           // arr.push(blogs[i].doctorId)
            if(blogs[i].image)
            blogs[i].image = process.env.cdnUrl + blogs[i].image 

        }
  
        return res.send({status: 'valid', isError : false,blogs: blogs})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;