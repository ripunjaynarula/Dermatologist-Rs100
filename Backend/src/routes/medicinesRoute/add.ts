import express from 'express';
import med from '../../models/medicines';
import prescription from '../../models/prescriptions';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
   console.log(req.body)
   
   for(var i =0; i < req.body.names.length; i++)
   {
        var m: any = await med.findOne({name : req.body.names[i]});
   
    
        var result = await med.createIndexes([{ name: "text" }]);

        if (!m){
             var me = new med({
                    name : req.body.names[i]
                  })  
             var re=   await  me.save()       
            }
   }


    var pr = new prescription ({
        patientName : req.body.patientName,
        history : req.body.history,
        diagnosis : req.body.diagnosis,
        suggestion  : req.body.suggestion,
        medicines : req.body.medicines

    }
   )

   var savePres = await pr.save()

              return res.send({status: 'saved_successfuly'});

        } catch (e) {
            console.log(e)
            return res.send({status: 'technical_error'});
        }
   

 });

export default router;