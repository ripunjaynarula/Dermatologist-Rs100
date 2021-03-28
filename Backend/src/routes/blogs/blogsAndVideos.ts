import express from 'express'
import blog from '../../models/blog'
import authStatus from '../../actions/checkLoginStatus'
import doc from '../../models/doctors'
import Videos from '../../models/videos'

const router = express.Router();

router.post('/', async (req, res) => {

    //to add pagination
 
    var limit = req.body.limit
    //show data randomly
 
   try {
var arr = []


        var blogs;
 

         blogs =  await blog.aggregate([{$sample: {size: 25}}, { $match: { isPublished: true } }]) ;
        for (var i =0; i< blogs.length; i++)
        {
            arr.push(blogs[i].doctorId)
            blogs[i].image = process.env.cdnUrl + blogs[i].image
        }
        console.log(arr)
        var d = await doc.find({ })




           var videos =  await Videos.aggregate([{$sample: {size: 2}}]) ;
        
        return res.send({status: 'valid', isError : false, blogs, doctors : d, videos : videos})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;