import mongoose from 'mongoose'

const chat = mongoose.model('chats',new mongoose.Schema({
    chatId:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    doctorUsername:{
        required: true,
        type: String
    },
    patientUsername:{
        type: String,
        required: true
    },
    doctorEmail:{
        type:String,
        required: true
    },
    patientEmail:{
        type:String,
        required: true
    },
    messages:{
        type: Array
    },
    archieved: {
        type: Boolean,
        default: false
    },
    consultationId: {
        type: String
    }, 
    lastChatStartDate: {
        type: Date,
        required: true,
        default: Date.now
    }
      , updated_at    : {  
        type: Number,
          
         },
          lastMessage: {
        type: String
    }, 
}));

export default chat;