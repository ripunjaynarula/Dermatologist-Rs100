import express from 'express';
import chat from '../models/chat';
import consultations from '../models/consultation';

const router = express.Router();

router.post('/', async (req, res) => {



        try{
         if(req.body.type==="delete")
            var chs: any = await chat.deleteOne({chatId: req.body.id});
        else{



             let chats: any = await consultations.updateOne({uid: req.body.id}, {$set: {active :false, endTime : Date.now()}});
    
  
        }
   


    return res.send({success: true});
    }catch(e){

    return res.send({success: false});
    }
});

export default router;