import express from 'express';
import med from '../../models/medicines';
import prescription from '../../models/prescriptions';
 import generateUploadSignedUrl from '../../actions/awsUpload';
import  genrateImg from './generatePdf'
const router = express.Router();
import Doctors from '../../models/doctors';
import Patients from '../../models/patients';
 import upload from './upload'
 import getAge from '../../actions/getAge'
 import capitalizeFirstLetter from '../../actions/capitalizeFirstLetter'
router.post('/', async (req, res) => {
    try {
    
if(req.body.role === "patient")
  {

      return res.send({isError : true, status : "wrong_access"})
  }
 
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


 

   var id = Math.round(new Date().getTime()/1000)

  
          var awsPath = "blog/" + id + ".png"  

 

        var localPath = './temp/' + id + ".png";

req.body.patientUid = "OfPKGTR9FPhIdvrsb8cfaaURu7I2"
        var doctor: any = await Doctors.findOne({uid : req.body.uid});
        var patient: any = await Patients.findOne({uid : req.body.patientUid});


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
        patientUid : req.body.patientUid,
        url : awsPath

    }
   )

   var savePres = await pr.save()

               res.send({status: 'saved_successfuly'});



return
        } catch (e) {
            console.log(e)
            return res.send({status: 'technical_error'});
        }
   

 });

export default router;