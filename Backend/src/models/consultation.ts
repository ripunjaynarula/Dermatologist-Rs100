import mongoose from 'mongoose';

const consultations = mongoose.model('consultations', new mongoose.Schema({
    patientEmail: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    doctorEmail: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: false,
    },
    age: {
        type: Number,
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    uid: {
        type: String,
        required: true,
        trim: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    }
}));

export default consultations;