const router = require('express').Router();
const request = require('request');
const mongoose = require('mongoose');
const categorySchema = require('../schemas/category');
mongoose.connect('mongodb://SerG:strelok1996@ds117830.mlab.com:17830/1plus1tv');

const News = mongoose.model('news', categorySchema);
const Fun = mongoose.model('fun', categorySchema);
const Children = mongoose.model('children', categorySchema);
const Show = mongoose.model('show', categorySchema);
const Family = mongoose.model('family', categorySchema);

router.get('/projects', (req, res) => {
    Family.find({}, (err, news) => {
        if(err) {
            res.json(err)
        }

        res.json(news);
    });
});

router.get('/categories/:id', (req, res) => {
    const catId = req.params.id;
    if(catId == '1') {
        News.find({}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });
    } else if (catId == '2') {
        Fun.find({}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '3') {
        Family.find({}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '4') {
        Children.find({}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '5') {
        Show.find({}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });
    }
});

router.get('/categories/:id/:idSubCategory', (req, res) => {
    const catId = req.params.id;
    const id = req.params.idSubCategory;

    if(catId == '1') {
        News.findOne({id: id}, (err, news) => {
            if(err) {
                res.json(err)
            }
            
            res.json(news.videolist);
        });
    } else if (catId == '2') {
        Fun.find({id: id}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '3') {
        Family.find({id: id}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '4') {
        Children.find({id: id}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });

    } else if (catId == '5') {
        Show.find({id: id}, (err, news) => {
            if(err) {
                res.json(err)
            }

            res.json(news);
        });
    }
});

router.get('/video/:id', (req, res) => {
    res.json({
        data: {
            like: "6"
        }
    })
});

module.exports = router;