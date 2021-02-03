import express from 'express';
import jwt from 'jsonwebtoken';
import patients from '../models/patients'

const verify = express.Router()

verify.get('/', (req, res) => {

    let token: any = req.query.token;
    let jwtSecret: any = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, async (err: any, decoded: any) => {
        if (err) {
            console.error(err);
            return res.send({error: 'Could not verify!'});
        }

        const patient: any = await patients.findOne({_id: decoded._id});
        if (patient) {
            patient.verified = true;
            try {
                patient.save()
            } catch (e) {
                console.log(`Error in saving: ${e}`)
                return
            }
        }

        res.send({status:'verified'})
    });

});

export default verify;