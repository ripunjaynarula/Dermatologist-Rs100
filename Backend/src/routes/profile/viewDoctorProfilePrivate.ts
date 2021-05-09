import express from 'express'
const router = express.Router();
import doctors from '../../models/doctors';
import fbUpdate from '../../actions/updateDetailsFIrebaseAuth';
import blog from '../../models/blog'
import Video from '../../models/videos'

router.post('/', async (req, res) => {



 

        try {


var d : any;

var uid = req.body.uid;
   d = await doctors.findOne({uid: uid});

    if(d.profileImage)
   d.profileImage = process.env.cdnUrl + d.profileImage
    
    if(d.coverImage)
   d.coverImage = process.env.cdnUrl + d.coverImage

   d.password = ""
   

    var blogs : any;
       {

        blogs =  await blog.find({doctorId: req.body.uid} ).limit(12);
            
        for(var i =0;i<blogs.length; i++)
        {
           blogs[i].image = process.env.cdnUrl + blogs[i].image
        }

      }

         var videos : any;
       {

        videos =  await Video.find({doctorId: req.body.uid} ).limit(12);
            
   

      }

    
    return res.send({status: "ok", isError : false, data : d, blogs : blogs, videos:videos})


        } catch (e) {
            console.log(e);
            return res.send({status: "technical_error", isError : true})
        }


 


 
 
});

export default router;