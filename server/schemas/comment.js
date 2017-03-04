const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    videoid: String ,
    comments: [
        {
            userId: String,
            userName: String,
            comment: String
        }
    ]
});

module.exports = commentSchema ;