const { Schema, model } = require('mongoose');

const userAnimeSchema = new Schema({
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    anime: {
        ref: 'Anime',
        type: Schema.Types.ObjectId
    },
    status: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('UserAnime', userAnimeSchema);