import mongoose from 'mongoose'

const subscription = mongoose.model('subscriptions', new mongoose.Schema({
    subscripiton: {
        type: Object,
        required: true,
    },
    id: {
        type: String,
        required: true,
    }
}));

export default subscription;