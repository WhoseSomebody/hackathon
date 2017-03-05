const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const momentsSchema = new Schema({
    videoid: String ,
    moments: [
        {
            title: String,
            time: Number,
        }
    ]
});

module.exports = momentsSchema;