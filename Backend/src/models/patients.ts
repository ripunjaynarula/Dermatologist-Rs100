import mongoose from 'mongoose'

const patients = mongoose.model('patients', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
        type: Number,
         unique: true,
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
    }
}));

export default patients;