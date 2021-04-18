import express from 'express';
import patients from '../../models/patients';
import doctors from '../../models/doctors';
import blog from '../../models/blog';

const router = express.Router();

router.post('/', async (req, res) => {



    var user: any ; 

    
    if(req.body.role == "doctor")
    {
        user= await doctors.findOne({uid: req.body.uid});
    }else{

        user= await patients.findOne({uid: req.body.uid});
    }
    console.log(user)

    if (user){
 
       
        try {
   
console.log(user.blogLikes)
if(!user.blogLikes)

{
    user.blogLikes = []
}
    console.log(user.blogLikes)

             if(!user.blogLikes.includes(req.body.blogId))
            {
                console.log("lodalassun")
 user.blogLikes.push(req.body.blogId);
        var i=   await  user.save()
        console.log(i)
   var update = await blog.updateOne(
        { _id: req.body.blogId },
         { $inc: { likes: 1 } }
   )
            }
                    
             return res.send({status: 'saved_successfuly', });

        } catch (e) {
            console.log(e)
            return res.send({status: 'technical_error'});
        }
    }

    return res.send({status: 'patient_not_found'});
});

export default router;