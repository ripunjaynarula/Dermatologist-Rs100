import express from 'express'
import blog from '../../models/blog'

const router = express.Router();

router.post('/', async (req, res) => {


console.log(req.body)
 


    const blogPost = new blog({
        title: req.body.title,
        doctorId: req.body.uid,
        metaDescription: req.body.metaDescription,
        postData: req.body.postData,
        isPublished : req.body.isPublish,
        keywords : req.body.keywords

    });
   try {
       var p = await blogPost.save();
       return res.send({status: 'saved', isError : false})

    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;