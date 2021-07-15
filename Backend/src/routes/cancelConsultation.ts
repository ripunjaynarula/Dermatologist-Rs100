import { Request, Response } from 'express';
import express from 'express';
import consultations from '../models/consultation';
import chats from '../models/chat';
import pays from '../models/payments';

import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY,
    key_secret: process.env.RAZORPAY_TEST_SECRET,
});

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    
    try {

        var consultation: any = await consultations.findOne({uid: req.body.consultationId});
    console.log(consultation)
    if (consultation.accepted){
        return res.send({success: false, message: 'time limit exceeded'});
    }
   var payment : any =await pays.findOne({orderId: consultation.orderId})
 


try{
            var response = await razorpay.payments.refund(payment.paymentId);
            
               if(response["status"] === "processed"){
        //    await chats.findOneAndDelete({consultationId: consultation.uid});

              await consultations.updateOne({uid: req.body.consultationId}, {$set: {active :false, accepted : false, status: "ended by user, refund generated"}});
    console.log("ABC")
             return res.send({status: true, message: "Payment will be refunded soon."})
        }

}catch(er : any){
     if(er.statusCode === 400){
            console.log("SAS")
            if(er.error.description === "The payment has been fully refunded already")

            console.log(await consultations.findOne({uid : req.body.consultationId}), req.body.consultationId)
                         var w= await consultations.updateOne({uid: req.body.consultationId}, {$set: {active :false, accepted : false}});
console.log(w)
                         return res.send({status: true, message: er.error.description})

        }
}



          
     
    }catch (e) {
        console.log("AAA")
        console.log(e)
        return res.send({status: false, message: "Internal Error"})
    }
});

export default router;