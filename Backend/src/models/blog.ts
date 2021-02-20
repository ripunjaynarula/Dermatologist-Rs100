import mongoose from 'mongoose'

const blogs = mongoose.model('blogs', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    doctorId: {
        type: String,
        required: true,
        trim: true
    },
    metaDescription: {
        type: String,
        required: true,
        trim: true,
     },
    postData: {
        type: String,
        required: true,
     },
    isPublished: {
        type: Boolean,
        default: false
    },
   views: {
       type: Number,
        length: 6,
        default:0
    },
  
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: Number,
        length: 6,
        required: true,
        default:0
    },
    degree: {
        type: String,
    },
 
    keywords: {
        type: Array,
        required: true,
        default: ['']
    }
}));

export default blogs;