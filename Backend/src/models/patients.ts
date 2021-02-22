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
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    verified: {
        type: Boolean,
        default: false
    },
    profiles: {
        type: Array,
    },
}));

export default patients;