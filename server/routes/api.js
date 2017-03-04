const router = require('express').Router();
const request = require('request');

router.get('/projects', (req, res) => {
    const lang = "ua";
    const reqURL = `https://api.ovva.tv/v2/${lang}/playlist`;
    request(reqURL, (error, response, body) => {
        if(error || response.statusCode != 200)
            res.json(error);
        else
            res.json({data: JSON.parse(body)})
    })
});

router.get('/categories', (req, res) => {
    res.json({
        data: [
            {
                id: 1,
                name: "Новини"
            },
            {
                id: 2,
                name: "Розваги"
            },
            {
                id: 3,
                name: "Спорт"
            },
            {
                id: 4,
                name: "Мультфільми"
            }
        ]
    })
});


router.get('categories/:id', (req, res) => {

});
module.exports = router;