import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const user_model = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }],
})
