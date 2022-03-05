const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    category: {
        type: String,
        default: "phimle",
        required: true,
    },
    filmName: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: false,
    },
    actorName: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    poster: {
        type: String,
        required: false,
    },

    url: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: false,
    },
    episode: {
        type: [Object],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

module.exports = mongoose.model('films', FilmSchema)