import chat from '../models/chat';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    var chats:any = await chat.find({ $or: [ {patientEmail: req.body.email}, {doctorEmail: req.body.email} ] }, {messages:0}).sort({"updated_at": -1});
     console.log("+============00")
  console.log(chats)

    res.send({chats: chats});
});

export default router;