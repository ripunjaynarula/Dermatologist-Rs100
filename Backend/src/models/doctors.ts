import mongoose from 'mongoose'

const doctors = mongoose.model('doctors', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username : {
        type : String,
        required : false,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    token:{
        type: String,
        time: true,
    },
    uid: {
        type: String,
        default: '',
        unique: true
    },
    phone: {
        type: String,
        unique: false
    },
    gender: {
        type: String,
    },
    fb: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    dob: {
        type: Date,
    },
    graduationYear: {
        type: Number,
        length: 4,
    },
    degree: {
        type: String,
    },
    education: {
        type: String
    },
    pastExperience: {
        type: String,
    },
    awards: {
        type: String
    },
    specialisation: {
        type: String
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    languages: {
        type: Array,
        default: ['english']
    },
    profileImage: {
        type : String
    }
}));

export default doctors;