import chat from '../models/chat';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const chats = await chat.find({ $or: [ {patientEmail: req.body.email}, {doctorEmail: req.body.email} ] });
    res.send({chats: chats});
});

export default router;