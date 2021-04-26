import mongoose from 'mongoose';

const consultations = mongoose.model('medicines', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
 
   
}));

export default consultations;
