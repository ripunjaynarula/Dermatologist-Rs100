import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/',async (req, res) => {
    if(req.body.email === process.env.ADMIN_EMAIL && req.body.pass === process.env.ADMIN_PASS){
        const secret:any = process.env.JWT_SECRET; 
        const token = jwt.sign({email: req.body.email}, secret, {expiresIn: '1d'});
        return res.send({status: true, secret: token});
    }
    return res.send({status:false});
});

export default router;