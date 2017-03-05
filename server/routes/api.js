const router = require('express').Router();
const request = require('request');
const mongoose = require('mongoose');
const categorySchema = require('../schemas/category');
const commentSchema = require('../schemas/comment');
const markSchema = require('../schemas/marks');
const viewsSchema = require('../schemas/views');
const momentSchema = require('../schemas/moments');

const News = mongoose.model('news', categorySchema);
const Fun = mongoose.model('fun', categorySchema);
const Children = mongoose.model('children', categorySchema);
const Show = mongoose.model('show', categorySchema);
const Family = mongoose.model('family', categorySchema);

const Comment = mongoose.model('comment', commentSchema);
const Mark = mongoose.model('mark', markSchema);
const Views = mongoose.model('views', viewsSchema);
const Moment = mongoose.model('moment', momentSchema);

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
            res.json([]);
            return 0;
        }
        const comm = comments ? comments.comments : [];
        res.json(comm);
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
    Mark.findOne({videoid: req.params.id}, (err, mark) => {
        if(mark) {
            if(req.body.like)
                mark.likes++;
            else {
                mark.dislikes++;
            }
            mark.save();
        } else {
            mark = new Mark({
                videoid: req.params.id,
                likes: 0,
                dislikes: 0
            });
            if(req.body.like)
                mark.likes++;
            else {
                mark.dislikes++;
            }
            mark.save();
        }
        res.json(mark);
    })
});

router.get('/video/:id/mark', (req, res) => {
    Mark.findOne({videoid: req.params.id}, (err, mark) => {
        res.json(mark ? mark : []);
    })
});

router.post('/video/:id/views', (req, res) => {

    Views.findOne({videoid: req.params.id}, (err, views) => {
        if(views) {
            if(req.body.sex == "male") {
                views.male++;
            } else if(req.body.sex == "female") {
                views.female++;
            } else {
                views.guest++;
            }

            views.views++;
            views.save(err => {
                if(err) {

                } else {
                    res.json(views);
                }
            });
        } else {
            views = new Views({
                videoid: req.params.id,
                male: 0,
                female: 0,
                guest: 0,
                views: 0
            });

            if(req.body.sex == "male") {
                views.male++;
            } else if(req.body.sex == "female") {
                views.female++;
            } else {
                views.guest++;
            }
            views.views++;
            views.save(err => {
                if(err) {

                } else {
                    res.json(views);
                }
            });
        }
    })
});

router.get('/video/:id/views', (req, res) => {
    Views.findOne({videoid: req.params.id}, (err, views) => {
        res.json(views ? views : []);
    })
});

router.post('/video/:id/moments', (req, res) => {

    Moment.findOne({videoid: req.params.id}, (err, docs) => {
        if (docs) {
            Moment.update({videoid: req.params.id}, {
                "$push": {
                    moments: {
                        title: req.body.title,
                        time: req.body.time,
                    }
                }
            }, {upsert: true, setDefaultsOnInsert: true}, (err, data) => {
                res.json({success: "ok"});
            });
        } else {
            const moment = new Moment({
                videoid: req.params.id,
                moments: {
                    title: req.body.title,
                    time: req.body.time,
                }
            });

            moment.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({success: "ok create"});
                }
            });
        }
    });

});

router.get('/video/:id/moments', (req, res) => {
    Moment.findOne({videoid: req.params.id}, (err, moment) => {
        res.json(moment ? moment : []);
    })
});

module.exports = router;