import mongoose from 'mongoose'

const chat = mongoose.model('chats',new mongoose.Schema({
    chatId:{
        type: String,
        required: true,
        trim: true,
        unique: true
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
}));

export default chat;