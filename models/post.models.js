import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const post_model = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    unlikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: new mongoose.Types.ObjectId()
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
})
