import chat from '../models/chat';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    var chats = await chat.findOne({ chatId: req.body.chatId });
    res.send({chats: chats});
});

export default router;