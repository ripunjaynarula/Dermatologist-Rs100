import mongoose from 'mongoose';

const consultations = mongoose.model('consultations', new mongoose.Schema({
    patientEmail: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: Number,
    },
    gender : {
        type : String, 
        default : "Not Set"
    },
    startDate: {
        type: Date,
        required: true,
    },
    doctorEmail: {
        type: String,
        trim: true
    },
    doctorName: {
        type: String,
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true,
    },
    age: {
        type: Number,
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    uid: {
        type: String,
        required: true,
        trim: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    previousCondition: {
        type: String,
    },
    allergies: {
        type: String
    },
    medication: {
        type: String
    },
    phone: {
        type: String
    },
     orderId: {
        type: String
    },
    endTime :{
        type : Number
    },
    scheduled:{
        type : Boolean,
        default:false
    },
     patientUid:{
        type : String,
     },
     status : {
         type : String
     },
     isWithoutPayment : {
         type : Boolean,
         default : false
     },
     state : {
         type : String,
 
     }, byDoctorStatus:{
         type : String,
         default : "no"
     }

}));

export default consultations;