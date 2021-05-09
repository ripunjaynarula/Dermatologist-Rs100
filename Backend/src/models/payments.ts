import mongoose from 'mongoose'

const payments = mongoose.model('payments', new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        trim: true
    },
  
  
    orderId: {
        type: String,
        required: true,
        unique: true
    },
 
    signature: {
        type: String,
     },
    userId: {
        type: String,
      },
    amount: {
        type: String,
     },
     pType: {
        type : String
     }
}));

export default payments;