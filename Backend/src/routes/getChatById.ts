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
        var left = 5
        var time = c.endTime;
        if(time)
        {
           var t : Number = time
           da = new Date(time)
          var  d =  Math.floor((Math.abs(Date.now() - time)) / (1000 * 60 * 60 * 24))
            console.log(d, "--")
          if(d>5 && isEnded)
          {
             isBlocked = true
          }
          left = left - d
        }
     return res.send({chats: chats, role : req.body.role, data : c, isEnded, isBlocked, daysLeft : left});
 }catch(e){
    return res.send({error  : true});

 }
});

export default router;
 