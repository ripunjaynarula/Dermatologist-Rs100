import express from 'express';
import webpush from 'web-push';
import subscripitons from '../models/subscription';
const router = express.Router();


router.post("/", async (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
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