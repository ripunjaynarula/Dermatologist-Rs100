import mongoose from 'mongoose'

const settings = mongoose.model('settings', new mongoose.Schema({
    time: {
        type: String,
        },
  
  
   
    isClinicOpen: {
        type: Boolean,
      },

     openDays: {
        type : Array
     }
}));

export default settings;