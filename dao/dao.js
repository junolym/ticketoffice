var mysql = require('promise-mysql');

// 使用gethotmovie获得全部电影名字和图片
// 之后用getmoviebyid获得电影详细信息
// 再用getschedulebymovie获取电影排期
// 数据库暂无数据

var pool  = mysql.createPool({
    host: 'classhelper.ml',
    user: 'root',
    password: 'sysusdcs',
    database: 'pml',
    charset: 'utf8mb4_unicode_ci'
});

exports.gethotmovie = function() {
    var sql = "select movie_id, movie_img, movie_name "
            + "from movies";
    return pool.query(sql);
}

exports.getmoviebyid = function(movie_id) {
    var sql = "select * from movies where movie_id=?"
    return pool.query(sql, movie_id);
}

exports.getschedulebymovie = function(movie_id) {
    var sql = "select cinema_id, cinema_name, "
            + "sch_screen_name as screen_name, play_time, schedule_id "
            + "from schedules "
            + "inner join cinemas on sch_cinema_id = cinema_id "
            + "where sch_movie_id = ? "
            + "order by sch_cinema_id ";
    return pool.query(sql, movie_id);
}

exports.getseat = function(schedule_id) {
    var sql = "select screan_seat as seat, sales "
            + "from schedules, screens "
            + "where schedule_id=? and sch_cinema_id = scr_cinema_id "
            + "and sch_screen_name = screen_name ";
    return pool.query(sql, schedule_id);
}

exports.login = function(username, password) {
    var sql = "select * from users "
            + "where username=? and password=?";
    return pool.query(sql,[username, password]).then(function(result) {
        if (result.affectedRows == 0) {
            return Promise.reject();
        } else {
            return Promise.resolve();
        }
    });
}

exports.buy = function(username, schedule_id, number, ord_seat, newsales) {
    var sql = "insert into order valus(?, ?, ?, ?)";
    return pool.query(sql, [schedule_id, username, ord_seat, number])
        .then(function(result) {
            sql = "update schedules set sales = ? "
                + "where schedule_id = ?";
            return pool.query(sql, [newsales, schedule_id]);
        }).then (function(result) {
            if (result.affectedRows == 0) {
                return Promise.reject();
            } else {
                return Promise.resolve();
            }
        });
}


