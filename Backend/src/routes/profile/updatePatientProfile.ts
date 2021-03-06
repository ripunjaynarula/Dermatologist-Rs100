import express from 'express'
const router = express.Router();
import patients from '../../models/patients';
import fbUpdate from '../../actions/updateDetailsFIrebaseAuth';

router.post('/', async (req, res) => {


        var name = req.body.name;
        var dob = req.body.dob;
        var gender = req.body.gender
        try {


    var patient: any = await patients.updateOne({uid: req.body.uid},  { $set: { name, dob, gender,  } });
fbUpdate.changeNameFirebaseAuth(req, name )

            return res.send({status: "updated", isError : false})


        } catch (e) {
            console.log(e);
            return res.send({status: e, isError : true})
        }


 


 
 
});

export default router;