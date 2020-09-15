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
    type: String,
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = model('Anime', animeSchema);