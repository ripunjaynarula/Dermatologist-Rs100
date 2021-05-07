import express from 'express'
import consultations from '../models/consultation';
import patients from '../models/patients';
import webpush from 'web-push';
import subscriptions from '../models/subscription';
import { uid } from 'rand-token';
import subscription from '../models/subscription';

const router = express.Router();


router.post('/', async (req:any, res: any) => {
    const patient = await patients.findOne({email: req.body.email});
    if(!patient){
        return res.send({success: false, message: "Invalid Attempt."})
    }
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
        time: Date.now(),
    });

    try{
        consultation = await consultation.save();
        //send notification
        const notifs = await subscriptions.find({});
        notifs.map(async (client: any) => {
            const payload = JSON.stringify({ title:"New Mediac Consultation" , id: consultation.uid, description: consultation.description, email: client.email });
            try {
                await webpush.sendNotification(client.subscripiton, payload)
                console.log(client.subscription, "SUBS")
                console.log(payload)
                console.log("notification sent")
            }catch (e){
                console.log(e);
            }
        });
        return res.send({success: true, id: consultation.uid});
    } catch (e) {
        res.send({success: false, message: 'Internal Error.'});
        return;
    }

});

export default router;