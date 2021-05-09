import express from 'express';
import webpush from 'web-push';
import bcrypt from 'bcrypt';
import doctors from '../models/doctors';
import subscripitons from '../models/subscription';
const router = express.Router();


router.post("/", async (req, res) => {
    //Get pushSubscription object
    const doc: any = await doctors.findOne({email: req.body.email});
    if(!doc){
        return res.send({'success': false, 'message':'invalid_creds'});
    }
 
   
   if(req.body.type === "mail")
   {


        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.addemail)))
  {
        return res.send({'success': false, 'message':'invalid_creds'});
  }
       var l = doc.notificationEmail;
       if (l === null) l = [] 
       if(!l.includes(req.body.addemail))
       {
             try{
  doc.notificationEmail.push(req.body.addemail)
  await doc.save()
            return res.send({'success': true})

            }catch(r)
            {
return ({success: false, message:"Internal Server Error"})
            }
           
       }
   }else{
        const subscription = req.body.sub;
    //Pass object into sendNotification
    let sub: any = await subscripitons.findOne({id: subscription.keys.auth});
    if(!sub){
        sub = new subscripitons({
            subscripiton: subscription,
            id: subscription.keys.auth,
            email: req.body.email,
        });

        try{
            sub = await sub.save();
            console.log(sub.id);
            return res.send({'success': true})

        } catch(e){
            return res.send({'success': false})
        }

    }
   }




    res.send({'success':true});
});

export default router;