const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewsSchema = new Schema({
    videoid: String,
    male: {type: Number, default: 0},
    female: {type: Number, default: 0},
    guest: {type: Number, default: 0},
    views: {type: Number, default: 0}
});

module.exports = viewsSchema ;