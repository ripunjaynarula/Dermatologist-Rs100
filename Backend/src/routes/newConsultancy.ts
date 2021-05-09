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
    const patient = await patients.findOne({email: req.body.email});
    if(!patient){
        return res.send({success: false, message: "Invalid Attempt."})
    }


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


    let id = '';
    while (true){
        id = uid(10);
        const d = await consultations.findOne({uid: id});
        if (!d){
            break
        }
    }

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
        previousCondition: req.body.previousCondition,
        uid: id,
        phone: req.body.phone,
        orderId : razorpayOrderId,
        time: Date.now(),
    });

    try{
        await payment.save();
        consultation = await consultation.save();
        //send notification
        var notifs = await subscriptions.find({});
        notifs.map(async (client: any) => {
            var payload = JSON.stringify({ title:"New Consultation" , id: consultation.uid, description: consultation.description, email: client.email });
            try {
                await webpush.sendNotification(client.subscripiton, payload)
                console.log(client.subscription, "SUBS")
                console.log(payload)
                console.log("notification sent")
            }catch (e){
                console.log(e);
            }
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
            sendConsultationMail(docs[i].notificationEmail,process.env.API_URL + 'acceptConsultation?cid=' + consultation.uid + '&email=' + docs[i].email,req.body.name,req.body.question )

        }






        return res.send({success: true, id: consultation.uid});
    } catch (e) {
        res.send({success: false, message: 'Internal Error.'});
        return;
    }

});

export default router;