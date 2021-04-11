import chat from '../models/chat';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const chats = await chat.find({ chatId: req.body.chatId });
    res.send({chats: chats});
});

export default router;