const router = require('express').Router();
const request = require('request');
const mongoose = require('mongoose');
const categorySchema = require('../schemas/category');
const commentSchema = require('../schemas/comment');
const markSchema = require('../schemas/marks');
mongoose.connect('mongodb://SerG:strelok1996@ds117830.mlab.com:17830/1plus1tv');

const News = mongoose.model('news', categorySchema);
const Fun = mongoose.model('fun', categorySchema);
const Children = mongoose.model('children', categorySchema);
const Show = mongoose.model('show', categorySchema);
const Family = mongoose.model('family', categorySchema);

const Comment = mongoose.model('comment', commentSchema);

router.get('/projects', (req, res) => {


    const kitty = new Comment({
        videoid: "1",
        comments: [
            {
                userId: "1",
                userName: "rdfdfg",
                comment: "sdcdscdslkv kdf"
            }
        ]
    });
    kitty.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('meow');
        }
    });
});

router.get('/categories/:id', (req, res) => {
    const catId = req.params.id;
    if (catId == '1') {
        News.find({}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });
    } else if (catId == '2') {
        Fun.find({}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '3') {
        Family.find({}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '4') {
        Children.find({}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '5') {
        Show.find({}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });
    }
});

router.get('/categories/:id/:idSubCategory', (req, res) => {
    const catId = req.params.id;
    const id = req.params.idSubCategory;

    if (catId == '1') {
        News.findOne({id: id}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news.videolist);
        });
    } else if (catId == '2') {
        Fun.find({id: id}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '3') {
        Family.find({id: id}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '4') {
        Children.find({id: id}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '5') {
        Show.find({id: id}, (err, news) => {
            if (err) {
                res.json(err)
            }

            res.json(news);
        });
    }
});

router.get('/video/:id/comments', (req, res) => {
    Comment.findOne({videoid: req.params.id}, (err, comments) => {
        if (err) {
            res.json([])
        }

        res.json(comments.comments);
    })
});

router.post('/video/:id/comments', (req, res) => {
    Comment.find({videoid: req.params.id}, (err, docs) => {
        if (docs.length) {
            Comment.update({videoid: req.params.id}, {
                "$push": {
                    comments: {
                        userId: req.body.userId,
                        userName: req.body.userName,
                        comment: req.body.comment
                    }
                }
            }, {upsert: true, setDefaultsOnInsert: true}, (err, data) => {
                res.json({success: "ok"});
            });
        } else {
            const comment = new Comment({
                videoid: req.params.id,
                comments: {
                    userId: req.body.userId,
                    userName: req.body.userName,
                    comment: req.body.comment
                }
            });

            comment.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({success: "ok create"});
                }
            });
        }
    });
});

router.post('/video/:id/mark', (req, res) => {

});

module.exports = router;