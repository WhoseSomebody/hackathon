const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema({
    username: String ,
    password: String
});

module.exports = markSchema ;