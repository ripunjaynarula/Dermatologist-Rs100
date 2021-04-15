import express from 'express';
import chat from '../models/chat';

const router = express.Router();

router.post('/', async (req, res) => {
    let chats: any = await chat.findOne({chatId: req.body.id});
    if(chats){
        chats.archieved = !chats.archieved;
        try {
            chats = await chats.save();
            return res.send({success: true});
        }catch (e) {
            return res.send({success: false});
        }
    }
    return res.send({success: false});
});

export default router;