import mongoose from 'mongoose';

const consultations = mongoose.model('prescriptions', new mongoose.Schema({
    patientUid: {
        type: String,
        required: true,
        trim: true
    },
    patientName: {
        type: String,
        required: true,
        trim: true,
    },
    doctorUid: {
         type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        default: false,
    },
     history: {
         type: String,
        //required: true,
        trim: true
    }, diagnosis: {
         type: String,
        //required: true,
        trim: true
    }, suggestion: {
         type: String,
        //required: true,
        trim: true
    },
    medicines :{
        type : Array
    }, 
    
    referenceId: {
         type: String,
        //required: true,
        trim: true
    },
   
   
}));

export default consultations;