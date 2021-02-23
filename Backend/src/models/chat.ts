import mongoose from 'mongoose'

const message = new mongoose.Schema({

    chatId : {

        type: String,
        required: true,
        trim: true
},

    fromId: {
        type: String,
        required: true,
        trim: true
    },
toId: {
        type: String,
        required: true,
        trim: true
    },
 message: {
        type: String,
        required: true,
        trim: true
    },
timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
messageType : {
    type : Number,
    required : true,
default : 0


},
readStatus :{
    type: Boolean,
    required : true,
    default : false

},
    filePath : {
    type : String,
    default : "",

}

  
});



const chatThread = mongoose.model('threads', new mongoose.Schema({
    chat_id: {
        type: String,
        required: true,
        trim: true
    },
   timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },

    details1: {
        id : String,
        name : String,
        profile : String
    },

    details2 : {
        id : String,
        name : String,
        profile : String
    },

    lastMessage : {
           type: String,
        required: true,
        trim: true
    },

    isRead : {
        type : Boolean,
        required : true,
        default : false
    }
 
     
}));

export default chatThread;