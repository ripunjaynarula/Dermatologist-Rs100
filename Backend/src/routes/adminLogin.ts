import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    if(req.body.email === process.env.ADMIN_EMAIL && req.body.pass === process.env.ADMIN_PASS){
        return res.send({status: true});
    }
    return res.send({status:false});
});

export default router;