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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    uid: {
        type: String,
        default: '',
        unique: true
    },
    phone: {
        type: Number,
    },
    verified: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
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