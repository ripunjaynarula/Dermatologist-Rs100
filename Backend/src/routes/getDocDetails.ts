import doctors from '../models/doctors';
import blogs from '../models/blog'
import express from 'express';
import checkAuth from '../middlewares/auth';

const router = express.Router();

router.post('/', async (req, res) => {
 
    var doc: any = await doctors.findOne({username: req.body.username});
    if (doc){
        var blog: any = await blogs.find({doctorId: doc.uid});
        res.send({status: true, name: doc.name, education: doc.education, degree: doc.degree, experience: doc.pastExperience, specialisation: doc.specialisation, docBlogs:blog});
        return;
    }
    return res.send({status:false});
});

export default router;