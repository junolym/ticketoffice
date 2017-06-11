'use strict';

const express = require('express');
const router = express.Router();
const dao = require('../dao/dao');

/* GET home page. */
router.get('/', (req, res, next) => {
    let data = {
        title: 'TicketOffice'
    }
    Object.assign(data, req.session);
    res.render('index', data);
});

router.get('/login', (req,res,next) => {
    res.render('login', {title:'Login'});
});

router.get('/regist', (req,res,next) => {
    res.render('regist', {title:'Regist'});
});

router.post('/login', (req, res, next) => {
    dao.login(req.body.form_username, req.body.form_password).then(() => {
        req.session.username = req.body.form_username;
        res.redirect('/');
    }).catch(() => {
        res.render('login', { error : '用户不存在或密码错误' });
    })
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/detail/:id', (req, res, next) => {
    /* 返回数据样例: (字符串)

    dao.getmoviebyid(1)

    [ RowDataPacket {
        movie_img: '/images/show1.jpg',
        movie_name: '神奇女侠',
        movie_publish: '2017-06-02',
        movie_time: '142分钟',
        movie_director: '派蒂·杰金斯',
        movie_language: '英语',
        movie_type: '动作|奇幻|冒险',
        movie_description: '亚马逊公主戴安娜·普林斯（盖尔·加朵饰），经过在家乡天堂岛的训练，取得上帝赐予的武器与装备，化身神奇女侠，与空军上尉史蒂夫·特雷弗（克里斯·派恩饰）一同来到人类世界，一起捍卫和平、拯救世界，在一战期间上演了震撼人心的史诗传奇'
    } ]

    dao.getschedulebymovie(1)

    [ RowDataPacket {
        cinema_loaction: "北京UME华星影城",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "保利DMC望京国际影城",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "UME国际影城双井店",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "北京新华国际影城大钟寺店",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "北京天幕新彩云影城",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "金逸北京朝阳大悦城店",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "北京金逸国际影城(双桥店)",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "SFC上影影城（北京大兴龙湖店）",
        time: ['9:00','14:00','20:00','23:00']
    }, RowDataPacket {
        cinema_loaction: "北京耀莱成龙国际影城王府井店",
        time: ['9:00','14:00','20:00','23:00']
    } ]

     */

    let data = {};
    dao.getmoviebyid(req.params.id).then(result => {
        result = JSON.parse(JSON.stringify(result));
        Object.assign(data, result[0]);
        data.title = '电影详情 - ' + result.movie_name;
        data.movie_id = req.params.id;
        return dao.getschedulebymovie(req.params.id);
    }).then(result => {
        result = JSON.parse(JSON.stringify(result));
        data.cinema = result;
        res.render('detail', data);
    }).catch(error => {
        next(error);
    });
});

router.get('/order/:movie_id/:cinema/:movie_start', (req,res,next) => {
    let data = {
        title: 'Order'
    }
    Object.assign(data, req.params);
    dao.getmoviebyid(req.params.id).then(result => {
        result = JSON.parse(JSON.stringify(result));
        data.movie_name = result[0].movie_name;
        res.render('order', data);
    }).catch(error => {
        next(error);
    });
});

router.get('/payment/:movie_id/:cinema/:movie_start/:price', (req, res, next) => {
    let data = {
        title: 'Payment'
    };
    Object.assign(data, req.params);
    dao.getmoviebyid(req.params.id).then(result => {
        result = JSON.parse(JSON.stringify(result));
        data.movie_name = result[0].movie_name;
        // pay
        res.render('payment', data);
    }).catch(error => {
        next(error);
    });
});

router.get('/payinfo/:movie_id/:cinema/:movie_start/:price', (req, res, next) => {
    // for front-end dev
    req.session.payinfo = {
        ticket: Math.random().toString().slice(-6),
        challenge: Math.random().toString().slice(-4)
    };
    dao.getmoviebyid(req.params.movie_id).then(result => {
        result = JSON.parse(JSON.stringify(result));
        req.session.payinfo.movie_name = result[0].movie_name;
        res.redirect('/paysuccess');
    }).catch(error => {
        next(error);
    });
});

router.get('/paysuccess', (req, res, next) => {
    let data = {
        title: 'Payinfo'
    };
    Object.assign(data, req.session.payinfo);
    res.render('payinfo', data);
})


module.exports = router;
