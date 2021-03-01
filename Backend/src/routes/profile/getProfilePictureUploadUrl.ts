import express from 'express'
 import generateUploadSignedUrl from '../../actions/awsUpload';
const router = express.Router();

router.post('/', async (req, res) => {


  
 
        try {


            var fileName = req.body.uid + ".png";

        } catch (e) {
            console.log(e);
            return res.send({status: e, isError : true})
        }



        var p = {
            region: process.env.mumbai_bucket_region,
            bucket: process.env.bucket_name,
            path: "profilePic/" + fileName
        }


        var x = await generateUploadSignedUrl(p);




        return res.send({
            url: x,
            fileName: "profilePic/" + fileName,
            isError : false,
            cdnurl: process.env.cdnUrl + "profilePic/" + fileName,

        })

 
});

export default router;