import mongoose from 'mongoose';

const staff = mongoose.model('staff', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: Number,
        length: 10,
        required: true,
    },
    employeeType: {
        type: String,
        enum: ['admin', 'customer_care'],
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true
    }
}));

export default staff;