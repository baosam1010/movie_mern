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
        required: false,
    },

    country: {
        type: String,
        required: false,
    },
    episode: [
        {
            episodeName:{
                type: String,
                required: false,
            },
            episodeUrl:{
                type: String,
                required: false,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            }
        }
    ],
    views:{
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});
FilmSchema.index({category:"text", filmName:"text", actorName:"text"});

module.exports = mongoose.model('films', FilmSchema)