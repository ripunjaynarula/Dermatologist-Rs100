import express from 'express'
const router = express.Router();
import doctors from '../../models/doctors';
import fbUpdate from '../../actions/updateDetailsFIrebaseAuth';

router.post('/', async (req, res) => {


 

        try {


var d : any;

if(req.body.username)
 {
 
 var username = req.body.username;
   d = await doctors.findOne({username});
    console.log(d)

 }else{
 var uid = req.body.uid;
   d = await doctors.findOne({uid});
    console.log(d)

 }
if(d)
{

    if(req.body.uid === d.uid)


            return res.send({status: "private_access", isError : false, data : d})
else
               return res.send({status: "public_access", isError : false, data : d})


}else{

 return res.send({status: "no_data", isError : true})

}


        } catch (e) {
            console.log(e);
            return res.send({status: "technical_error", isError : true})
        }


 


 
 
});

export default router;