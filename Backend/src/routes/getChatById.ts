import chat from '../models/chat';
import express from 'express';
import consultation from '../models/consultation';

const router = express.Router();

router.post('/', async (req, res) => {
 try{
        
    var chats :any= await chat.findOne({ chatId: req.body.chatId });
        var c :any = await consultation.findOne({ uid: chats.consultationId }, {orderId : 0});
        var isEnded = !c.active;
        var isBlocked = false;
        var da :any;
        var d = 5
        var time = c.endTime;
        if(time)
        {
           var t : Number = time
           da = new Date(time)
            d =  Date.now() - da
          if(d>5 && isEnded)
          {
             isBlocked = true
          }
          d = d - Math.floor(d)
        }
        console.log(d, isEnded)
     return res.send({chats: chats, role : req.body.role, data : c, isEnded, isBlocked, daysLeft : d});
 }catch(e){
    return res.send({error  : true});

 }
});

export default router;
 