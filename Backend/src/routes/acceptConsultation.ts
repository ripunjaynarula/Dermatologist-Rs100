import express from 'express';
import consultations from '../models/consultation';
import doctors from '../models/doctors';
import chat from '../models/chat';
import { uid } from 'rand-token';

const router = express.Router()

router.post('/', async (req, res) => {
    const doc: any = await doctors.findOne({email: req.body.email});
    if(doc){
        let consultation: any = await consultations.findOne({uid: req.body.cid});
        if(consultation){
            if(consultation.accepted){
                return res.end();
            }
            consultation.accepted = true;
            consultation.doctorEmail = doc.email;
        }
        try{
            consultation = await consultation.save();
            let id='';
            while(true){
                id = uid(12);
                let ch = await chat.findOne({chatId: id});
                if(!ch){
                    break
                }
            }
            let newChat = new chat({
                chatId: id,
                doctorEmail: consultation.doctorEmail,
                patientEmail: consultation.patientEmail,
            });
            newChat = await newChat.save();
        }catch(e){
            console.log("Error occured!");
        }
    }
    

    return res.end();
});

export default router;