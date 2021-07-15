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

const router = express.Router();


router.post('/', async (req:any, res: any) => {
    console.log("aaaaaaaaaa===================")

    var patient = await patients.findOne({email: req.body.email});
    if(!patient){
        return res.send({success: false, message: "Invalid Attempt."})
    }
 
    console.log("bbbbbbbbb===================")

    let id = '';
    while (true){
        id = uid(10);
        const d = await consultations.findOne({uid: id});
        if (!d){
            break
        }
    }    console.log("cccccccc===================")


    let consultation: any = new consultations({
        patientEmail: req.body.email,
        startDate: Date.now(),
        description: req.body.question,
        age: req.body.age,
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        medication: req.body.medication,
        allergies: req.body.allergies,
        previousCondition: req.body.previousConditions,
        uid: id,
        phone: req.body.phone, 
        gender : req.body.gender,
        time: Date.now(),
isWithoutPayment : true,
scheduled : false,
state : req.body.state,
orderId : "not-set"
    });
    console.log("ddddddddd===================")

    try{
         consultation = await consultation.save();
         console.log(consultation, "------------------")
        //send notification
        var notifs = await subscriptions.find({});
        notifs.map(async (client: any) => {
            var payload = JSON.stringify({ title:"New Consultation" , id: consultation.uid, description: consultation.description, email: client.email });
          sendNotification(client.subscripiton, payload, client._id)
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



 


        return res.send({success: true, id: consultation.uid});
    } catch (e) {
        console.log(e)
        res.send({success: false, message: 'Internal Error.'});
        return;
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