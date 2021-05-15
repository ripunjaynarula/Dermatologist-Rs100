import mongoose from 'mongoose';

const consultations = mongoose.model('meds', new mongoose.Schema({
    name: {
        type: String,
         unique: true,
     },

 
   
}));

export default consultations;
 