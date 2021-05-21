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
        var consultation: any = await consultations.findOne({uid: req.body.consultatioId});
    console.log(consultation.accepted)
    if (consultation.accepted){
        return res.send({success: false, message: 'time limit exceeded'});
    }

   var payment : any =await pays.findOne({orderId: consultation.orderId})
        var response = await razorpay.payments.refund(payment.paymentId);
        if(response["status"] === "processed"){
        //    await chats.findOneAndDelete({consultationId: consultation.uid});

              await consultations.updateOne({uid: req.body.consultationId}, {$set: {active :false, accepted : false, status: "ended by user, refund generated"}});
    
             return res.send({status: true, message: "Payment will be refunded soon."})
        }
    }catch (e) {
        console.log(e)
        return res.send({status: false, message: "Internal Error"})
    }
});

export default router;