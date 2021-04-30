import mongoose from 'mongoose'

const doctors = mongoose.model('doctors', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
        clinicName: {
        type: String,

        default  :"ABCD clinic"
    },
    medicalNumber:{

        type: String,
        
        default  :"ABCD clinic"
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
    },    twitter: {
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
        default: ""
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
        type : String,
                default :''
 
    },
        videoLikes : {
        type : Array
    },
    blogLikes:{
        type : Array
    },
      coverImage: {
        type : String,
        default :''
    },
     about: {
        type : String
    },
}));

export default doctors;