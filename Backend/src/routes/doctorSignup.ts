import express from 'express';
import doctors from '../models/doctors';
import jwt from 'jsonwebtoken';
import { uid } from 'rand-token';


const router = express.Router();

router.post('/', async (req, res) =>{
    if(req.body.token){
        const sec: any = process.env.JWT_SECRET;
        let token:any = jwt.verify(req.body.token, sec);
        if(token['email'] === process.env.ADMIN_EMAIL){
            let doc:any = doctors.findOne({email: req.body.email});

            if(doc){
                return res.send({status: false, message: 'Account already exists'});
            }

            let id: any = uid(10);

            while (true){
                const d = await doctors.findOne({uid: id});
                if (!d){
                    break;
                }
                id = uid(10);
            }


            doc = new doctors({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                dob: req.body.dob,
                fb: req.body.fb,
                linkedin: req.body.linkedin,
                degree: req.body.degree,
                education: req.body.edu,
                graduationyear: req.body.graduation,
                username: req.body.username,
                awards: req.body.awards,
                pastExperince: req.body.pastExp,
                specialization: req.body.specialization,
                uid: id
            });

            try {
                doc = await doc.save();
            } catch(e) {
                return res.send({status:false});
            }
            return res.send({status: true, message: 'Signup Complete'});
        }
        return res.send({status: false, message: 'Invalid token'});
    }
});

export default router;
