import express from 'express';
import doctors from '../models/doctors';
import jwt from 'jsonwebtoken';
import { uid } from 'rand-token';
import hashPassword from '../actions/hash'
import fbUpdate from '../actions/updateDetailsFIrebaseAuth';


const router = express.Router();

router.post('/', async (req, res) =>{
    if(req.body.token){
        const sec: any = process.env.JWT_SECRET;
        let token:any = jwt.verify(req.body.token, sec);
        if(token['email'] === process.env.ADMIN_EMAIL){
            if(req.body.username.includes(" "))
            {
                return res.send({status: false, message: 'Username cannot contain spaces', firebaseError : false});
            }
            if(req.body.username.includes("/") || req.body.username.includes ("\\") ||  req.body.username.includes(".")  || req.body.username.includes("@"))
            {
                                return res.send({status: false, message: 'Username cannot contain / or \\ or . or @', firebaseError : false});

            }
            let doc:any = await doctors.findOne({username: req.body.username});
            if(doc){
                return res.send({status: false, message: 'Username already exists', firebaseError : false});
            }
          let doc2:any = await doctors.findOne({phone: req.body.phone});
            if(doc2){
                return res.send({status: false, message: 'Phone number already exists', firebaseError : false});
            }


            var d = await fbUpdate.createDoctor(req.body.name, req.body.password, req.body.email, req.body.imageUrl);

            if(d.error)
            {
                return res.send ({
                    message : d.data,
                    status : false,
                    firebaseError : true
                })
            }
            const hash = await hashPassword(req.body.password);

fbUpdate.changeAccess("doctor", d.data.uid)
            doc = new doctors({
                name: req.body.name,
                password: hash,
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
                uid: d.data.uid
            });

            try {
                doc = await doc.save();
            } catch(e) {
                console.log(e)
                fbUpdate.deleteUser(d.data.uid)
                return res.send({status:false ,                     firebaseError : false ,message : "Account not created"});
            }
            return res.send({status: true, message: 'signup_complete'});
        }
        return res.send({status: false, message: 'Invalid token'});
    }
});

export default router;
