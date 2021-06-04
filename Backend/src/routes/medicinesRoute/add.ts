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
import Unreistered from '../../models/unregistered';
import {ObjectID} from 'mongodb';
import consultations from '../../models/consultation'
import sendWhatsapp from '../../actions/whatsappMessage'
 const signature = "https://d3pxd5vsj7zayf.cloudfront.net/images/sign.png"
router.post('/', async (req, res) => {
    try {
    
         let doctor: any = await Doctors.findOne({uid : req.body.uid});

    if(req.body.type === "image"){
        let patient: any = await Patients.findOne({email : req.body.patientEmail});
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



 

var medicines = []

for (var key in req.body.medicines) {
    medicines.push(req.body.medicines[key])
}   
 

   var id = Math.round(new Date().getTime()/1000)

  
          var awsPath = "blog/" + id + ".png"  

 

        var localPath = './temp/' + id + ".png";

          console.log(req.body.patientEmail)



    if(req.body.registered === "unregistered")
    {

        var isSaved = await genrateImg(capitalizeFirstLetter(doctor.name), capitalizeFirstLetter(doctor.clinicName), new Date().toLocaleString().split(',')[0], capitalizeFirstLetter(req.body.patientName), medicines, capitalizeFirstLetter(req.body.history),
            capitalizeFirstLetter(req.body.diagnosis), capitalizeFirstLetter(req.body.suggestion), signature, capitalizeFirstLetter(req.body.gender), req.body.age, capitalizeFirstLetter(doctor.degree), doctor.medicalNumber,
            localPath, id.toString() ,  capitalizeFirstLetter(req.body.labTest)
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
        patientUid : req.body.phone,
        url : awsPath

    }
   )

    if(req.body.isAddNew)
    {
        var addP = new Unreistered({
            name : req.body.patientName, age : req.body.age , email : req.body.pemail, phone : req.body.phone , gender : req.body.gender
        })
        await addP.save()
    }else{

 

                  console.log(req.body,"---------------------")    
        var updateP = await Unreistered.updateOne({_id : new  ObjectID(req.body.puid)}, {$set: {name : req.body.patientName, age : req.body.age, gender : req.body.gender, email : req.body.email, phone : req.body.phone, }})
    }


   var savePres = await pr.save()

 
        
        
          return     res.send({status: 'saved_successfuly', url : awsPath});




    }






        let patient: any = await Patients.findOne({email : req.body.patientEmail});
console.log(patient)


       
 var age  : any  = ""
        if(patient.dob)
        {
            age = getAge(patient.dob)
        }

          var isSaved = await genrateImg(
            capitalizeFirstLetter(doctor.name), capitalizeFirstLetter(doctor.clinicName), new Date().toLocaleString().split(',')[0], capitalizeFirstLetter(req.body.patientName), medicines, capitalizeFirstLetter(req.body.history),
            capitalizeFirstLetter(req.body.diagnosis), capitalizeFirstLetter(req.body.suggestion), signature , capitalizeFirstLetter(patient.gender), age, capitalizeFirstLetter(doctor.degree), doctor.medicalNumber,
            localPath, id.toString() ,  capitalizeFirstLetter(req.body.labTest)) 

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

    console.log(awsPath, "AWS PATH")
    doAll("","")

    if(req.body.isConsultation)
    {
        await consultations.updateOne({uid: req.body.consultationId}, {$set: {active :false, accepted : true,  endTime : Date.now(),scheduled :false,status: "Scheduled consultation, prescription sent"}});

    }
   var savePres = await pr.save()

   res.send({status: 'saved_successfuly', url : awsPath});




return 
        } catch (e) {
            console.log(e)
            return res.send({status: 'technical_error', error:true});
        }
   

 });

function doAll(phone : any, message : any){

    sendWhatsAppMessage("918077781807", "message")

}

function sendSMS(){

}
function sendWhatsAppMessage(phone : any, message : any){


    sendWhatsapp(phone, message)


}
 function sendMail(){

 }



export default router;