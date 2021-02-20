import mongoose from 'mongoose'

const patients = mongoose.model('patients', new mongoose.Schema({
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
}));

export default patients;