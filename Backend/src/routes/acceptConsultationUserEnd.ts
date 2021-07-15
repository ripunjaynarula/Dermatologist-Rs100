import express from 'express'
import consultations from '../models/consultation';
import patients from '../models/patients';
import webpush from 'web-push';
import payments from '../models/payments';
import { uid } from 'rand-token';
 import verifyRazorpayPayment from '../actions/verifyRazorpayPayment';
import subscriptions from '../models/subscription';
import razorpay  from '../actions/initRazorpay' 
import doctors from '../models/doctors';
import sendConsultationMail from '../actions/consultationMail';
import chat from '../models/chat';

const router = express.Router();


router.post('/', async (req:any, res: any) => {
    var patient = await patients.findOne({email: req.body.email});
    if(!patient){
        return res.send({success: false, message: "Invalid Attempt."})
    }
console.log(req.body)

    let { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    var isVerified = await verifyRazorpayPayment(razorpayOrderId, razorpayPaymentId,razorpaySignature)

    if(!isVerified)
    {
        return res.send({success:false, message:"Invalid Attempt"})
    }
    var o = await razorpay.payments.fetch(razorpayPaymentId);
    var amount = parseInt(o["amount"]) / 100;
    let payment : any = new payments({
        userId : req.body.uid,
        paymentId: razorpayPaymentId, 
        orderId: razorpayOrderId,
        signature: razorpaySignature,
        amount : amount,
        pType:"razorpay",
    })
console.log("Payemnt DOne")

try{
 
            var doc: any = await doctors.findOne({email: req.body.doctor_email});
            console.log(doc, "DODDODODO")
if(doc){
        let consultation: any = await consultations.findOne({uid: req.body.cid});
        if(consultation){
            if(!consultation.accepted && !consultation.active){
                return res.send({error : true, message:"Consultation Ended"})
            } 
       
            consultation.accepted = true;
            consultation.active = true;
            consultation.doctorEmail = doc.email;
            consultation.doctorName = doc.name;
            consultation.orderId = razorpayOrderId

        }
    try{
        await payment.save();
        console.log("PAYMENT SAVED")
        consultation = await consultation.save();
console.log("CPNSILTATION SAVED")










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
                console.log("CHAT SAVED")
                }
















        //send notification
        var notifs = await subscriptions.find({});
        notifs.map(async (client: any) => {
            var payload = JSON.stringify({ title:"New Consultation" , id: consultation.uid, description: consultation.description, email: client.email });
      //    sendNotification(client.subscripiton, payload, client._id)
        });
        console.log("d2")
        var docs : any = await doctors.find({})
        console.log(docs)
        for(var i=0; i<docs.length; i++)
        {
            var mail = "";

            for(var j =0; j<docs[i].notificationEmail.length ; j++)
            {
                if(!mail)
                {
                    mail = docs[i].notificationEmail[j] 
                }else
                    mail = mail + "," + docs[i].notificationEmail[j]
            }
            console.log(mail)
            sendConsultationMail(docs[i].notificationEmail,process.env.API_URL + 'acceptConsultation?cid=' + consultation.uid + '&email=' + docs[i].email,req.body.name,req.body.question , `${(new Date()).toDateString()} at ${(new Date()).toTimeString().split(" ")[0]}` )

        }



 console.log("NOTIFICATIONS DONE")


        return res.send({success: true, id: consultation.uid});
    } catch (e) {
        res.send({success: false, message: 'Internal Error.'});
        return;
    }
}
 
}catch(e){
    console.log(e)
}
  

});


async function sendNotification(subscripiton :any,  payload:any, id:any){
      try {
                await webpush.sendNotification(subscripiton, payload)
                 console.log(payload)
                console.log("notification sent")
            }catch (e){
                console.log("FAILED-," , id)
                console.log(e);
                        var r = await subscriptions.deleteOne({ _id: id })         

                console.log("--------", r)
            }
}
function dateAndTime(unixtime : any) {
var d = (new Date(unixtime)).toLocaleString().split(":")

      return  d[0] + ":"+d[1]
    };
export default router;