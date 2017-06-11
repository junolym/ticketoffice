var mysql = require('promise-mysql');
var cinemadata = require('./cinemadata.json')

var pool = mysql.createPool({
    host: 'classhelper.ml',
    user: 'root',
    password: 'sysusdcs',
    database: 'pml',
    charset: 'utf8mb4_unicode_ci'
});

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


var insertmovie = function() {
    var sql = "delete from movies where 1";
    pool.query(sql).then(function() {
        for (var i = 1; i < 14; ++i) {
            var sql = "insert into movies "
                    + "set movie_id=?, movie_img=?, movie_name=?, "
                    + "movie_publish='2017-06-02', movie_time=142, "
                    + "movie_director='派蒂·杰金斯', "
                    + "movie_language='英语', "
                    + "movie_type='动作|奇幻|冒险', " 
                    + "movie_description='亚马逊公主戴安娜·普林斯（盖尔·加朵饰），经过在家乡天堂岛的训练，取得上帝赐予的武器与装备，化身神奇女侠，与空军上尉史蒂夫·特雷弗（克里斯·派恩饰）一同来到人类世界，一起捍卫和平、拯救世界，在一战期间上演了震撼人心的史诗传奇' ";
            pool.query(sql, [i, "/images/movie"+i+".jpg", movie_names[i]]);
        }
    });
}

var insertcinema = function() {
    // console.log(cinemadata['cinemaData'].length);
    var sql = "delete from cinemas where 1";
    pool.query(sql).then(function() {
        for (var i = 0; i < cinemadata['cinemaData'].length; ++i) {
            var sql = "insert into cinemas "
                    + "set cinema_id=?, cinema_name=?, cinema_location=? ";
            var data = cinemadata['cinemaData'][i];
            pool.query(sql, [i+1, data['pname'], data['padd']]);
        }    
    })
}

var insertscreen = function() {
    var sql = "delete from screens where 1";
    pool.query(sql).then(function() {
        var data = [];
        for (var i = 0; i < cinemadata['cinemaData'].length; ++i) {
            data.push([i+1, '一号厅', 120]);
            data.push([i+1, '二号厅', 100]);
            data.push([i+1, '三号厅', 100]);
            data.push([i+1, 'IMAX厅', 250]);
        }
        var sql = "insert into screens(scr_cinema_id, screen_name, "
                + "screen_seat) values ? ";
        pool.query(sql, [data]);
    });
}

var insertschedule = function() {
    var sql = "delete from schedules where 1";
    pool.query(sql).then(function() {
        var data = []
        for (var i = 0; i < 13; ++i) {
            for (var j = 0; j < 10; ++j) {
                data.push([i*50+j*5+1, i+1, 
                    Math.round(Math.random()*(cinemadata['cinemaData'].length-1)+1),
                    '一号厅', '2017-06-11 09:00:00', 40]);
                data.push([i*50+j*5+2, i+1, 
                    Math.round(Math.random()*(cinemadata['cinemaData'].length-1)+1),
                    '三号厅', '2017-06-11 12:00:00', 40]);
                data.push([i*50+j*5+3, i+1, 
                    Math.round(Math.random()*(cinemadata['cinemaData'].length-1)+1),
                    'IMAX厅', '2017-06-11 15:00:00', 40]);
                data.push([i*50+j*5+4, i+1, 
                    Math.round(Math.random()*(cinemadata['cinemaData'].length-1)+1),
                    '一号厅', '2017-06-11 18:00:00', 40]);
                data.push([i*50+j*5+5, i+1, 
                    Math.round(Math.random()*(cinemadata['cinemaData'].length-1)+1),
                    'IMAX厅', '2017-06-11 21:00:00', 40]);
            }
        }
        var sql = "insert into schedules(schedule_id, sch_movie_id, sch_cinema_id, "
                + "sch_screen_name, play_time, price) values ?";
        pool.query(sql, [data]);
    });
}
// insert into schedules(schedule_id, sch_movie_id, sch_cinema_id, sch_screen_name, play_time, price) values (1, 1, 1, '一号厅', '2017-06-11 12:00:00', 40);

// insertmovie();
// insertcinema();
// insertscreen();
insertschedule();
