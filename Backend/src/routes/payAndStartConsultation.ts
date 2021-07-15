import express from 'express';
import consultations from '../models/consultation';
import doctors from '../models/doctors';
import chat from '../models/chat';
import { uid } from 'rand-token';
import patients from '../models/patients';

const router = express.Router()

router.get('/', async (req, res) => {
    console.log(req.query, "_________________")
    const doc: any = await doctors.findOne({email: req.query.email});
    if(doc){
        let consultation: any = await consultations.findOne({uid: req.query.cid});
        if(consultation){
            if(!consultation.accepted && !consultation.active){return res.send({error : true, message:"Consultation Ended"})} 
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

            var obj1 = {
                type : "doctor",
                text : `Age- ${consultation.age}, Gender- ${consultation.gender}`
            }

             var obj2 = {
                type : "doctor",
                text : `Height- ${consultation.height}, Weight- ${consultation.weight}`
            }
             var obj3 = {
                type : "doctor",
                text : `Query- ${consultation.description} `
            }

             var obj4 = {
                type : "doctor",
                text : `Current Medications- ${consultation.medication}, Allergies- ${consultation.allergies}, History- ${consultation.previousCondition} `
            }
           
            const p: any = await patients.findOne({email: consultation.patientEmail});
              var n = doc.uid.localeCompare(p.uid);
              id = doc.uid + "-"+p.uid

 
              let ch :any= await chat.findOne({chatId: id});
                if(ch){
                    ch.lastChatStartDate = new Date();
                    ch.consultationId = consultation.uid;
                    ch.updated_at = Date.now()
                    ch.messages.push({
                        timestamp : Date.now(),
                        text: 'Hi '+ consultation.name +', your consultaion has started',
                        type: "patient"
                    }, obj1, obj2, obj3, obj4)
                    await ch.save()
                }else{
                    let newChat = new chat({
                    chatId: id,
                    doctorUsername: doc.username,
                    patientUsername: p.name,
                    doctorEmail: consultation.doctorEmail,
                    patientEmail: consultation.patientEmail,
                    consultationId: consultation.uid,
                                            updated_at : Date.now(),

                    messages : [{
                        timestamp : Date.now(),
                        text: 'Hi '+ consultation.name +', your consultaion has started',
                        type: "patient"
                    }, obj1, obj2, obj3, obj4]
            });
            newChat = await newChat.save();
                
                }

          
        }catch(e){
            console.log("Error occured!", e);
        }
    }
    




    
 let u = process.env.WEB_URL || ""
                return res.redirect(u + "chat/d");
 });

export default router;