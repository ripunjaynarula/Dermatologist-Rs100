import express from 'express';
import consultations from '../models/consultation';
import doctors from '../models/doctors';
import chat from '../models/chat';
import { uid } from 'rand-token';
import patients from '../models/patients';

const router = express.Router()

router.get('/', async (req, res) => {
    const doc: any = await doctors.findOne({email: req.query.email});
    if(doc){
        let consultation: any = await consultations.findOne({uid: req.query.cid});
        if(consultation){
            if(consultation.accepted){
                let u = process.env.WEB_URL || ""
                return res.redirect(u + "chat/d");
            }
            consultation.accepted = true;
            consultation.active = true;
            consultation.doctorEmail = doc.email;
            consultation.doctorName = doc.name;
        }
        try{
            consultation = await consultation.save();
            let id='';

            

           
            const p: any = await patients.findOne({email: consultation.patientEmail});
              var n = doc.uid.localeCompare(p.uid);
              id = doc.uid + "-"+p.uid

              let ch :any= await chat.findOne({chatId: id});
                if(ch){
                    ch.lastChatStartDate = new Date();
                    ch.messages.push({
                        timestamp : Date.now(),
                        text: 'Hi '+ consultation.name +', your consultaion has started',
                        type: "label"
                    })
                    await ch.save()
                }else{
                    let newChat = new chat({
                    chatId: id,
                    doctorUsername: doc.username,
                    patientUsername: p.name,
                    doctorEmail: consultation.doctorEmail,
                    patientEmail: consultation.patientEmail,
                    consultationId: consultation.uid,
                    messages : [{
                        timestamp : Date.now(),
                        text: 'Hi '+ consultation.name +', your consultaion has started',
                        type: "label"
                    }]
            });
            newChat = await newChat.save();
                
                }

          
        }catch(e){
            console.log("Error occured!");
        }
    }
    
 let u = process.env.WEB_URL || ""
                return res.redirect(u + "chat/d");
 });

export default router;