const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    id: String ,
    title: String,
    subtitle: String,
    image: String
});

module.exports = categorySchema;