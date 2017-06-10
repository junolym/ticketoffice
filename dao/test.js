var dao = require('./dao.js');

// dao.gethotmovie()
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });

// dao.getmoviebyid(1)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });

// dao.getschedulebymovie(1)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });

dao.getseat(1)
.then(function(doc) {
    console.log(doc);
}).catch(function(err) {
    console.log(err);
});

dao.login(1, 1)
.then(function(doc) {
    console.log(doc);
}).catch(function(err) {
    console.log(err);
});
