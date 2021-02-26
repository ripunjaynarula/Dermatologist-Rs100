import mongoose from 'mongoose'

const doctors = mongoose.model('doctors', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    graduationYear: {
        type: Number,
        length: 4,
        required: true,
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
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    languages: {
        type: Array,
        required: true,
        default: ['English']
    },
}));

export default doctors;