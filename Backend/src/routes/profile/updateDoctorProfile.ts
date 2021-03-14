import express from 'express'
const router = express.Router();
import doctors from '../../models/doctors';
import fbUpdate from '../../actions/updateDetailsFIrebaseAuth';

router.post('/', async (req, res) => {


        var name = req.body.name;
        var dob = req.body.dob;
        var gender = req.body.gender
        var graduationYear = req.body.graduationYear
        var degree = req.body.degree
        var education = req.body.education
        var pastExperience = req.body.pastExperience
        var awards = req.body.awards
        var specialisation = req.body.specialisation
        var city = "Delhi"
        var state = "Delhi"
        var languages = ["english"]
        var username = req.body.username


        try {
    var d: any = await doctors.findOne({username});
    console.log(d)
if(d)
{
    if(d.uid != req.body.uid)

                return res.send({status: "Username already taken", isError : true})

}




    var doctor: any = await doctors.updateOne({uid: req.body.uid},  { $set: { name, dob, gender, education, pastExperience , awards, specialisation, city, state, graduationYear, degree, languages } });
fbUpdate.changeNameFirebaseAuth(req, name )
            return res.send({status: "updated", isError : false})


        } catch (e) {
            console.log(e);
            return res.send({status: "technical_error", isError : true})
        }


 


 
 
});

export default router;