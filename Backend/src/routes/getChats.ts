import chat from '../models/chat';
import express from 'express';
import doctors from '../models/doctors';

const router = express.Router();

router.post('/', async (req, res) => {
    try{

      var timestamp : any = (new Date).setDate((new  Date).getDate() - 5)
console.log(timestamp)
           var chats:any ;
           if(req.body.role === "doctor")
          {
              if(req.body.type === "archive")
                       {  
                          chats= await chat.find({ $and : [{$or: [ {patientEmail: req.body.email}, {doctorEmail: req.body.email} ] },{updated_at:{$lt:timestamp}},{active:false} ] }, {messages:0}).sort({"updated_at": -1});
                       }
                       else{
                                    chats= await chat.find({ $and : [{$or: [ {patientEmail: req.body.email}, {doctorEmail: req.body.email} ] },{$or : [{updated_at:{$gt:timestamp}}, {active:true} ]} ] }, {messages:0}).sort({"updated_at": -1});

                       }

          }         
           else
           chats= await chat.find({$or: [ {patientEmail: req.body.email}, {doctorEmail: req.body.email} ] } , {messages:0}).sort({"updated_at": -1});
          

  if(req.body.role === "patient")
{       var docs : any = await doctors.find({},{uid :1, name : 1, profileImage : 1, email : 1})  

        for(var i =0;i<docs.length;i++)
        {
          docs[i].profileImage = process.env.cdnUrl + docs[i].profileImage 
        }
   return      res.send({chats: chats, role : req.body.role, docs : docs, error:false});

}
console.log(chats)
   return  res.send({chats: chats, role : req.body.role, error: false,});
    }
    catch(e)
    {
      res.send({error:true})
    }
});

export default router;