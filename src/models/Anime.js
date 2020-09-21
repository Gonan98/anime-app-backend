const { Schema, model } = require('mongoose');

const animeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    synopsis: String,
    episodes: Number,
    image_url: String,
    type: String
});

module.exports = model('Anime', animeSchema);