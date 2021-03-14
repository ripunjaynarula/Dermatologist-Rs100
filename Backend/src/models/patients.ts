import mongoose from 'mongoose'

const patients = mongoose.model('patients', new mongoose.Schema({
    name: {
        type: String,
         trim: true,
        default : ''
    },
    uid: {
        type: String,
        trim: true,
        unique: true,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dob: {
        type: Date,
     },
    phone: {
        type: String,
         unique: false,
         default :""
    },
    gender: {
        type: String,
        enum: ['Male', 'Female','Others', 'Rather not say']
    },
    verified: {
        type: Boolean,
        default: false
    },
    profiles: {
        type: Array,
    },
    profileImage:{
        type : String
    },
     role: {
        type: String,
        enum: ['admin', 'customer_care', 'patient'],
        required: true,
        default : "patient"
    },
}));

export default patients;