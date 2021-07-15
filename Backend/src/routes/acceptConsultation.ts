import express, { query } from 'express';
import consultations from '../models/consultation';
import doctors from '../models/doctors';
import chat from '../models/chat';
import { uid } from 'rand-token';
import patients from '../models/patients';

const router = express.Router()

router.get('/', async (req, res) => {
//accepted, active
//true      true       patient chating with doctor
//true      false      Consultation Ended successfully after chat and all
//false     true       
//false     false      Consultation closed  Either by user or by doctor just set that in status variable in db
    console.log(req.query, "____________ -------------  ------------- _____________")
 

    if(req.query.isPaid === "notpaid"){


            const doc: any = await doctors.findOne({email: req.query.email});
       if(req.query.status==='on' || req.query.status === 'cancel')

  if(doc){
        let consultation: any = await consultations.findOne({uid: req.query.cid});
        if(consultation){
            if(!consultation.accepted && !consultation.active){
                return res.send({error : true, message:"Consultation already Ended"})
            } 
            
            
           if(req.query.cancel !== "force")
           {
                if(consultation.byDoctorStatus === "on")
            {
                return res.send({error: true, message : "Consultation already started"})
            }  if(consultation.byDoctorStatus === "cancel")
            {
                return res.send({error: true, message : "Consultation already cancelled"})
            }
            if(consultation.accepted){
                let u = process.env.WEB_URL || ""
                return res.redirect(u + "chat/d");
            }
           }
            consultation.accepted = true;
            consultation.active = true;
            consultation.doctorEmail = doc.email;
            consultation.doctorName = doc.name;
            consultation.byDoctorStatus = req.query.status
            if(req.query.status === 'cancel')
            {
                  consultation.accepted = false;
                  consultation.active = false;
                  consultation.status = "Consultation cancelled by doctor, not paid"
            }
        }
        try{

            consultation = await consultation.save();
            let id='';
 
 
                          return res.send({error : true, message: req.query.status === "on" ? "Consultation Started" : "Consultation Cancelled"})


  
          
        }catch(e){
            console.log("Error occured!", e);
        }
    }

    else{
        console.log(req.query,"000000000")
    }




    } else{
            const doc: any = await doctors.findOne({email: req.query.email});
    if(doc){
        let consultation: any = await consultations.findOne({uid: req.query.cid});
        if(consultation){
            if(!consultation.accepted && !consultation.active){
                return res.send({error : true, message:"Consultation Ended"})
            } 
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
                        text: 'Hi '+ consultation.name +', your consultaion is started',
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
                        text: 'Hi '+ consultation.name +', your consultaion is started',
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
    }




 });

export default router;