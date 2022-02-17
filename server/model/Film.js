const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    categories: {
        type: String,
        required: true,
    },
    filmName : {
        type: String,
        required: true,
    },
    actorName : {
        type: String,
        required: false,
    },
    description : {
        type: String,
        required: false,
    },
    poster:{
        type: String,
        required: true,
    },
    episode:{
        url: {
            type: String,
            required: true,
        },
        child:{
            type: Object,
            required: false
        }
    },
    country: {
        type: String,
        required: false,
    },
    createdAt : {
        type: Date,
        default: Date.now(),
        required: false,
    }
});

module.exports = mongoose.model('films', FilmSchema)