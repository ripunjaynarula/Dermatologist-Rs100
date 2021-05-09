import { Request, Response } from 'express';
import express from 'express';
import consultations from '../models/consultation';
import chats from '../models/chat';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY,
    key_secret: process.env.RAZORPAY_TEST_SECRET,
});

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const consultation: any = await consultations.findOne({uid: req.body.consultatioId});
    console.log(consultation.accepted)
    if (consultation.accepted){
        return res.send({success: false, message: 'time limit exceeded'});
    }

    try {
        const response = await razorpay.payments.refund(req.body.paymentId);
        if(response["status"] === "processed"){
        //    await chats.findOneAndDelete({consultationId: consultation.uid});
            await consultations.findOneAndDelete({uid: req.body.consultationId});
            return res.send({status: true, message: "Payment will be refunded soon."})
        }
    }catch (e) {
        console.log(e)
        return res.send({status: false, message: "Internal Error"})
    }
});

export default router;