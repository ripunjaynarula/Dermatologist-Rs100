import express from 'express';
import med from '../../models/medicines';
import prescription from '../../models/prescriptions';
 import  genrateImg from './generatePdf'
const router = express.Router();
import Doctors from '../../models/doctors';
import Patients from '../../models/patients';
 import upload from './upload'
 import getAge from '../../actions/getAge'
 import capitalizeFirstLetter from '../../actions/capitalizeFirstLetter'
router.post('/', async (req, res) => {
    try {
    

    if(req.body.type === "image"){
         var doctor: any = await Doctors.findOne({uid : req.body.uid});
        var patient: any = await Patients.findOne({email : req.body.patientEmail});
        var pr = new prescription ({
            patientName : req.body.patientName,
            history : req.body.history,
            referenceId : "",
            diagnosis : req.body.diagnosis,
            suggestion  : req.body.suggestion,
            medicines : req.body.medicines,
            doctorUid : req.body.uid,
            patientUid : patient.uid,
            url : req.body.url

    }
   )
    var savePres = await pr.save()
    console.log("SAVED")
           return     res.send({status: 'saved_successfuly', error : false});


    }
 
 
   for(var i =0; i < req.body.names.length; i++)
   {
        var m: any = await med.findOne({name : req.body.names[i]});

        if (m===null){
            try{
                
                 var me = new med({
                    name : req.body.names[i].trim()
                  })  
             var re=   await  me.save()  
            }     catch(e){
                console.log(e)
            }
            }
   }


 

   var id = Math.round(new Date().getTime()/1000)

  
          var awsPath = "blog/" + id + ".png"  

 

        var localPath = './temp/' + id + ".png";

         var doctor: any = await Doctors.findOne({uid : req.body.uid});
         console.log(req.body.patientEmail)
        var patient: any = await Patients.findOne({email : req.body.patientEmail});
console.log(patient)

var medicines = []

for (var key in req.body.medicines) {
    medicines.push(req.body.medicines[key])
}   
       
 var age  : any  = ""
        if(patient.dob)
        {
            age = getAge(patient.dob)
        }

          var isSaved = await genrateImg(
            capitalizeFirstLetter(doctor.name), capitalizeFirstLetter(doctor.clinicName), new Date().toLocaleString().split(',')[0], capitalizeFirstLetter(req.body.patientName), medicines, capitalizeFirstLetter(req.body.history),
            capitalizeFirstLetter(req.body.diagnosis), capitalizeFirstLetter(req.body.suggestion), "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg", capitalizeFirstLetter(patient.gender), age, capitalizeFirstLetter(doctor.degree), doctor.medicalNumber,
            localPath, id.toString() 
        ) 

         if(isSaved)
        {
 
            upload(localPath, awsPath)
         }



    var pr = new prescription ({
        patientName : req.body.patientName,
        history : req.body.history,
        referenceId : id,
        diagnosis : req.body.diagnosis,
        suggestion  : req.body.suggestion,
        medicines : req.body.medicines,
        doctorUid : req.body.uid,
        patientUid : patient.uid,
        url : awsPath

    }
   )

   var savePres = await pr.save()

               res.send({status: 'saved_successfuly', url : awsPath});



return
        } catch (e) {
            console.log(e)
            return res.send({status: 'technical_error', error:true});
        }
   

 });

export default router;