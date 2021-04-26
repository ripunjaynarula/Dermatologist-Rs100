import express from 'express'
const router = express.Router();
import doctors from '../../models/doctors';
import fbUpdate from '../../actions/updateDetailsFIrebaseAuth';

router.post('/', async (req, res) => {


        var imageUrl = req.body.profileImage;
 
        try {


    
    if(req.body.type === "cover")
    {
        var doctor: any = await doctors.updateOne({uid: req.body.uid},  { $set: { coverImage: imageUrl } });

    }else{
        var doctor: any = await doctors.updateOne({uid: req.body.uid},  { $set: { profileImage: imageUrl } });
    fbUpdate.changeProfilePicture(req,process.env.cdnUrl +  imageUrl)

    }
            return res.send({status: "updated", isError : false})


        } catch (e) {
            console.log(e);
            return res.send({status: e, isError : true})
        }


 


 
 
});

export default router;