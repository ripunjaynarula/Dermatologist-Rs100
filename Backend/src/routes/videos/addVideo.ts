import express from 'express'
import generateUploadSignedUrl from '../../actions/awsUpload';
import videos from '../../models/videos'
import { nanoid } from 'nanoid'

const router = express.Router();

router.post('/', async (req, res) => {

if(req.body.role === "patient")
  {

      return res.send({isError : true, status : "wrong_access"})
  }
 


    try {


if(!matchYoutubeUrl(req.body.ytUrl))
{
    return res.send({isError : true, status : "invalid_link"})
}

var videoId = matchYoutubeUrl(req.body.ytUrl);

            var video = new videos({
        title: req.body.title,
        doctorId: req.body.uid,
        metaDescription: req.body.metaDescription,
        postData: req.body.postData,
         keywords : req.body.keywords,
        videoLink : "https://www.youtube.com/embed/" + videoId,
        thumbnail : "https://img.youtube.com/vi/" + videoId+"/hqdefault.jpg",
        link: req.body.link
 
 
    });


    var d = await videos.findOne({link : req.body.link})
    console.log(d)
    if(d != null)
    {
                return res.send({
          
                isError : true,
                status : "link_used"
              

            })
    }
 
             var p = await video.save();
                return res.send({
          
                isError : false,
                status : "saved"
              

            })
   




    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});



 function matchYoutubeUrl(url : any) {
 var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = url.match(regExp);
if (match && match[2].length == 11) {
  return match[2];
} else {
  //error
  return false
}
}

export default router;

 
