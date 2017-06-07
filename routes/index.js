'use strict';
const movie_names = {
    1 : '神奇女侠',
    2 : '加勒比海盗5',
    3 : '摔跤吧！爸爸',
    4 : '哆啦A梦',
    5 : '29',
    6 : '迷失Z城',
    7 : '美好的意外',
    8 : '荡寇风云',
    9 : '李雷和韩梅梅',
    10 : '吃吃的爱',
    11 : '异星觉醒',
    12 : '速度与激情8',
    13 : '爱乐之城'
};

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'TicketOffice' });
});

router.get('/detail/:id', function(req, res, next) {
    res.render('detail', {
        title: 'Detail',
        movie_id: req.params.id,
        movie_img: '/images/show'+req.params.id+'.jpg',
        movie_name: movie_names[req.params.id],
        movie_publish: '2017-06-02',
        movie_time: '142分钟',
        movie_director: '派蒂·杰金斯',
        movie_language: '英语',
        movie_type: '动作|奇幻|冒险',
        movie_description: '亚马逊公主戴安娜·普林斯（盖尔·加朵饰），经过在家乡天堂岛的训练，取得上帝赐予的武器与装备，化身神奇女侠，与空军上尉史蒂夫·特雷弗（克里斯·派恩饰）一同来到人类世界，一起捍卫和平、拯救世界，在一战期间上演了震撼人心的史诗传奇',
        cinema: [
            {
                cinema_loaction: "北京UME华星影城",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "保利DMC望京国际影城",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "UME国际影城双井店",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "北京新华国际影城大钟寺店",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "北京天幕新彩云影城",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "金逸北京朝阳大悦城店",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "北京金逸国际影城(双桥店)",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "SFC上影影城（北京大兴龙湖店）",
                time: ['9:00','14:00','20:00','23:00']
            },
            {
                cinema_loaction: "北京耀莱成龙国际影城王府井店",
                time: ['9:00','14:00','20:00','23:00']
            }
        ]
    });
});

router.get('/payment/:id/:cinema/:time', function(req,res,next) {
    res.render('payment', {
        title:'Payment',
        movie_name: movie_names[req.params.id],
        cinema: req.params.cinema,
        movie_start: req.params.time
    });
});



module.exports = router;
