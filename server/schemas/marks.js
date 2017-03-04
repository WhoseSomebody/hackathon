const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema({
    videoid: String ,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
});

module.exports = markSchema ;