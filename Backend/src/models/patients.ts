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
         default :"",
                 required: false,

    },
    gender: {
        type: String,
        enum: ['male', 'female','others', 'rather not say',""],
        default: ""
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
    videoLikes : {
        type : Array
    },
    blogLikes:{

        type : Array
    }
}));

export default patients;