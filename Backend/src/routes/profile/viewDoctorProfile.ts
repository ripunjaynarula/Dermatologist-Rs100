import express from 'express'
const router = express.Router();
import doctors from '../../models/doctors';
import fbUpdate from '../../actions/updateDetailsFIrebaseAuth';

router.post('/', async (req, res) => {


    
        var username = req.body.username


        try {
    const d: any = await doctors.findOne({username});
    console.log(d)
if(d)
{

            return res.send({status: "okay", isError : false, data : d})

   

}else{

 return res.send({status: "no_data", isError : true})

}


        } catch (e) {
            console.log(e);
            return res.send({status: "technical_error", isError : true})
        }


 


 
 
});

export default router;