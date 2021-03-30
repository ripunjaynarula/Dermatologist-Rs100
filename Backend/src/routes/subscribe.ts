import express from 'express';
import webpush from 'web-push';
import bcrypt from 'bcrypt';
import doctors from '../models/doctors';
import subscripitons from '../models/subscription';
const router = express.Router();


router.post("/", async (req, res) => {
    // Get pushSubscription object
    const doc: any = await doctors.findOne({email: req.body.email});
    if(!doc){
        return res.send({'success': false, 'message':'invalid_creds'});
    }

    const check = await bcrypt.compare(req.body.password, doc.password);
    if(!check){
        return res.send({'success': false, 'message':'invalid_creds'});
    }
    
    const subscription = req.body.sub;
    let sub: any = await subscripitons.findOne({id: subscription.keys.auth});
    if(!sub){
        sub = new subscripitons({
            subscripiton: subscription,
            id: subscription.keys.auth
        });

        try{
            sub = await sub.save();
            console.log(sub.id);
        } catch(e){
            return res.send({'success': false})
        }

    }
    res.send({'success':true});
});

export default router;