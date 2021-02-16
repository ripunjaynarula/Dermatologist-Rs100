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
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: false,
    }
}))