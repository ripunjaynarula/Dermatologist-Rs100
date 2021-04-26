import express from 'express';
import med from '../../models/medicines';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
   
            var m  : any=     med.find({$text: {$search: req.body.name, $language : "en"}}).limit(10)
            return res.send({isError: false, meds : m});

        } catch (e) {
   
            console.log(e)
            return res.send({isError: true});
   
        }
   

 });

export default router;