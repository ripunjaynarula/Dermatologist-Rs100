import chat from '../models/chat';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    var chats:any = await chat.find({ $or: [ {patientEmail: req.body.email}, {doctorEmail: req.body.email} ] }).sort({"updated_at": -1});
    
    res.send({chats: chats});
});

export default router;