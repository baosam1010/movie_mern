const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const MessageSchema = new Schema({
//     username: {
//         type: 'string',
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,

//     },
//     createdAt: {
//         type: Date,
//         default: Date.now(),
//     }
// });

const PostSchema = new Schema({
    film: {
        type: Schema.Types.ObjectId,
        ref: 'films'
    },
    messages: [
        {
            username: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,

            },
            createdAt: {
                type: Date,
                default: Date.now(),
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('posts', PostSchema);