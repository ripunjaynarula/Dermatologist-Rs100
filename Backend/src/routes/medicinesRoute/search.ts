import express from 'express';
import med from '../../models/medicines';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
   
   console.log(req.body.name)
 
                //    var result = await med.createIndexes([{ name: "text" }]);
var m  : any=    await med.find() 
            
            // var m  : any=    await med.find({$text: {$search: "\"" + req.body.name +"\"",}}) 
            console.log(m)
             return res.send({isError: false, meds : m});

        } catch (e) {
   
            console.log(e)
            return res.send({isError: true});
   
        }
   

 });

export default router;