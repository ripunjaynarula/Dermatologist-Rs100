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
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
}));

export default doctors;