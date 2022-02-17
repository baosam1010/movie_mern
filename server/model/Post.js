const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    description: {
        type: String,
        required: true,

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    film: {
        type: Schema.Types.ObjectId,
        ref: 'films'
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('posts', PostSchema);