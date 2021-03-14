import express from 'express';
import patients from '../models/patients';

const router = express.Router();

router.post('/', async (req, res) => {
    var patient: any = await patients.findOne({uid: req.body.uid});
   
    
   
    if (patient){
 
        let l = patient.profiles.length
        var info = {
            name: req.body.name,
            age: req.body.age,
            relation: req.body.relation,
            id: (l+1),
            gender: req.body.gender,
        };
        try {
                     patient.profiles.push(info);
        var i=   await  patient.save()
             return res.send({status: 'saved_successfuly', id: info['id'], name: info['name'], age: info['age'], gender: info['gender'], relation:['relation']});

        } catch (e) {
            console.log(e)
            return res.send({status: 'technical_error'});
        }
    }

    return res.send({status: 'patient_not_found'});
});

export default router;