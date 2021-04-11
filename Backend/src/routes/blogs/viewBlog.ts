import express from 'express'
import blog from '../../models/blog'
import doctors from '../../models/doctors'
import patients from '../../models/patients'

import authStatus from '../../actions/checkLoginStatus'
const router = express.Router();

router.post('/', async (req, res) => {

  
 
   try {


        var blogs : any;
                  

        blogs =  await blog.findOne({url: req.body.url} );

        if(!blogs)
        {
        return res.send({ status: "nothing_found", isError : false })

        }
    var isLiked = false
if(await authStatus.checkAuthStatus(req))
{
            var user : any ; 
            if(req.body.role =="doctor")
            {

            user =  await doctors.findOne({uid: req.body.uid} );

            }else
            user =  await patients.findOne({uid: req.body.uid} );
            if(user!=null)
            {
                 if(user.blogLikes.includes(blogs._id)){
                     isLiked = true;
                 }
            }

             console.log(blogs._id)
}
            blogs.image = process.env.cdnUrl + blogs.image 

 var publishedBy : any ; 
          

            publishedBy =  await doctors.findOne({uid: blogs.doctorId} );

        return res.send({ 
            status: "valid", 
            isError : false, 
            blog: blogs,
            liked: isLiked,
            username : publishedBy.username,
            name : publishedBy.name,
            profileImage : process.env.cdnUrl + publishedBy.profileImage

        })

    } catch(e) {
        console.error(e);
        return res.send({ status: 'technical_error',isError : true});
    }
 
});

export default router;