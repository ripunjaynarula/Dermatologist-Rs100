import doctors from '../models/doctors';
import blogs from '../models/blog'
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const doc: any = await doctors.findOne({email: req.body.email});
    if (doc){
        const blog: any = await blogs.find({doctorId: doc.uid});
        res.send({status: true, name: doc.name, education: doc.education, degree: doc.degree, experience: doc.pastExperience, specialisation: doc.specialisation, docBlogs:blog});
        return;
    }
    return res.send({status:false});
});

export default router;