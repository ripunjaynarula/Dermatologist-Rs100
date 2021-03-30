import express from 'express';
import patients from '../../models/patients';
import doctors from '../../models/doctors';
import video from '../../models/videos';

const router = express.Router();

router.post('/', async (req, res) => {



    var user: any ; 

    
    if(req.body.role == "doctor")
    {
        user= await doctors.findOne({uid: req.body.uid});
    }else{

        user= await patients.findOne({uid: req.body.uid});
    }

    if (user){
 
       
        try {
   

    
             if(!user.videoLikes.includes(req.body.videoId))
            {
 user.videoLikes.push(req.body.videoId);
        var i=   await  user.save()
   var update = await video.updateOne(
        { _id: req.body.videoId },
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