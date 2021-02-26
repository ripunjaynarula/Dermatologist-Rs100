import express from 'express'
import doctors from '../models/doctors'
import { uid } from 'rand-token'
import hashPassword from '../actions/hash'
import patients from '../models/patients'
const router = express.Router()

router.post('/', async (req, res) => {
    let doc: any =await doctors.findOne({$and: [{email: req.body.email}, {password: req.body.pass}]});
    if (doc) {
        if (doc.uid === ''){
            while (true){
                let id = uid(10);
                const d = await doctors.findOne({uid: id});
                if (!d){
                    doc.uid = id
                    doc =await doc.save();
                    break;
                }
            }
        }
        const session_token: string = await hashPassword(req.body.email+doc.uid)
        req.session.token = session_token;
        return res.send({status: 'logged_in'})
    }
    return res.send({status: 'user_not_found'})
});

export default router;