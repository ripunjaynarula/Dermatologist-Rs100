import chat from '../models/chat';
import express from 'express';
import doctors from '../models/doctors';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
          var chats:any = await chat.find({ $or: [ {patientEmail: req.body.email}, {doctorEmail: req.body.email} ] }, {messages:0}).sort({"updated_at": -1});
     console.log("+============00")
  console.log(chats)


  if(req.body.role === "patient")
{       var docs : any = await doctors.find({},{uid :1, name : 1, profileImage : 1})  

        for(var i =0;i<docs.length;i++)
        {
          docs[i].profileImage = process.env.cdnUrl + docs[i].profileImage 
        }
   return      res.send({chats: chats, role : req.body.role, docs : docs, error:false});

}
     res.send({chats: chats, role : req.body.role, error: false});
    }
    catch(e)
    {
      res.send({error:true})
    }
});

export default router;