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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    verified: {
        type: Boolean,
        default: false
    },
}));

export default patients;