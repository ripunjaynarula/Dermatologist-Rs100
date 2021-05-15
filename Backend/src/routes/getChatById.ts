import chat from '../models/chat';
import express from 'express';
import consultation from '../models/consultation';

const router = express.Router();

router.post('/', async (req, res) => {
 try{
        
    var chats :any= await chat.findOne({ chatId: req.body.chatId });
    console.log(chats, "CAJTS")
       var c = await consultation.findOne({ uid: chats.consultationId }, {orderId : 0});
console.log(c, "CCC")
    return res.send({chats: chats, role : req.body.role, data : c});
 }catch(e){
    return res.send({error  : true});

 }
});

export default router;
 