import express from 'express'
import generateUploadSignedUrl from '../../actions/awsUpload';
import blog from '../../models/blog'
import { nanoid } from 'nanoid'

const router = express.Router();

router.post('/', async (req, res) => {


  
 
    var blogPost = new blog({
        title: req.body.title,
        doctorId: req.body.uid,
        metaDescription: req.body.metaDescription,
        postData: req.body.postData,
        isPublished :false,
        keywords : req.body.keywords,
        image : null

    });

    console.log(req.body)
   try {

        if(req.body.fileName && !req.body.fileUploaded)
        {
            var p = await blogPost.save();

            console.log("inside 1")
            var s = req.body.fileName;
            if(s.split(".").length < 2)
            {
                return res.send({status: "invalid_filename", isError : true})
            }
            var extention = s.split(".")[s.split(".").length-1];

            var fileName = nanoid(12) +"." + extention;

            var pl   = {
            region: process.env.mumbai_bucket_region,
            bucket: process.env.bucket_name,
            path: "blog/" + fileName
             }
            var x = await generateUploadSignedUrl(pl);
            return res.send({
                url: x,
                fileName: "blog/" + fileName,
                isError : false,
                cdnurl: process.env.cdnUrl + "blog/" + fileName,
                status : "saved_draft",
                blogId : p._id

            })
        }
        if(!req.body.fileName){
                console.log('inside 2')
            var p = await blogPost.save();
            return res.send({status: 'saved_draft', isError : false})


        }
        if(req.body.fileUploaded)
        {
                   var blo: any = await blog.updateOne({_id: req.body.blogId},  { $set: {isPublished :req.body.isPublished, image : req.body.image} });
       return res.send({status: 'saved', isError : false})

        }





    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});

export default router;

 
