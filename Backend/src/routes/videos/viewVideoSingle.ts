import express from 'express'
import Videos from '../../models/videos'
import authStatus from '../../actions/checkLoginStatus'
import patients from '../../models/patients'
import doctors from '../../models/doctors'

const router = express.Router();

router.post('/', async (req, res) => {

               
    
   
   try {

if(req.body.videoLink.includes("%20"))
{
    req.body.videoLink = req.body.videoLink.replace("%20", " ")
}

        var blogs : any;
                  
 
        blogs =  await Videos.findOne({link: req.body.videoLink} );
         if(!blogs)
        {
        return res.send({ status: "nothing_found", isError : false })

        }

        var update = await Videos.updateOne(
       {link: req.body.videoLink},
         { $inc: { views: 1 } }
   )
    
var isLiked = false
if(await authStatus.checkAuthStatus(req))
{
            var user : any ; 
            if(req.body.role ==="doctor")
            {

            user =  await doctors.findOne({uid: req.body.uid} );

            }else
            user =  await patients.findOne({uid: req.body.uid} );
             if(user!=null)
            {
                 if(user.videoLikes)
                 {
                     if(user.videoLikes.includes(blogs._id)){
                     isLiked = true;
                 }
                 }
            }

 }


         return res.send({ status: "valid", isError : false, video: blogs, liked : isLiked})

    } catch(e) {
        console.error(e);
        return res.send({ status: 'technical_error',isError : true});
    }
 
});

export default router;