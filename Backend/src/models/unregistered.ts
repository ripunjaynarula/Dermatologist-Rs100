import mongoose from 'mongoose'

const patients = mongoose.model('unregistered-patients', new mongoose.Schema({
    name: {
        type: String,
         trim: true,
        default : ''
    },
 
    email: {
        type: String,
          trim: true
    },
    age: {
        type: Number,
                 trim: true

     },
    phone: {
        type: String,
         unique: false,
         default :"",
                 required: true,
                          trim: true


    },
    gender: {
        type: String,
        enum: ['male', 'female','others', 'rather not say',""],
        default: ""
    }, 
 
 
}));

export default patients;