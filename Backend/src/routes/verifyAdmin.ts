import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    if (req.body.token){
        let token = req.body.token;
        const secret: any = process.env.JWT_SECRET
        token = await jwt.verify(token, secret);
        if (token['email'] === process.env.ADMIN_EMAIL){
            return res.send({status: true});
        }
    }

    return res.send({status:false});
})

export default router;