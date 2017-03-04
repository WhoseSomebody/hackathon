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
                name: "Сім'я"
            },
            {
                id: 4,
                name: "Дітям"
            },
            {
                id: 5,
                name: "Шоу"
            }
        ]
    })
});


router.get('categories/:id', (req, res) => {
    res.json({
        data: [
            {
                idSubCategory: "45",
                title: "Міняю жінку",
                playlist_subtitle: "реаліті-шоу",
                image: "https://images.ovva.tv/media/images/e13/b30/53f/e13b3053f4b4c9a41a956b267bd6b9ee.jpeg"
            },
            {
                idSubCategory: "46",
                playlist_title: "Панянка-селянка",
                playlist_subtitle: "Реаліті-експеримент",
                image: "https://images.ovva.tv/media/images/806/b72/460/806b72460bad749053733b7d79cdd3da.jpeg"
            }
            ],
    })
});

router.get('categories/:id/:idSubCategory', (req, res) => {
    res.json({
        data: [
            {
                id: "45",
                title: "Міняю жінку",
                playlist_subtitle: "реаліті-шоу",
                image: "https://images.ovva.tv/media/images/e13/b30/53f/e13b3053f4b4c9a41a956b267bd6b9ee.jpeg"
            },
            {
                id: "46",
                playlist_title: "Панянка-селянка",
                playlist_subtitle: "Реаліті-експеримент",
                image: "https://images.ovva.tv/media/images/806/b72/460/806b72460bad749053733b7d79cdd3da.jpeg"
            }
        ],
    })
});

router.get('/video/:id', (req, res) => {
    res.json({
        data: {
            id: "68MVqpM_gw0"
        }
    })
});

module.exports = router;