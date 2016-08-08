var express = require('express');
var request = require('supertest');

var router = express.Router();
request = request('http://localhost:3000/tvshows');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Series de TV'
    });
});

router.get('/create',function (req, res) {
    res.render('create');
});

router.post('/edit',function (req, res) {
    var data = {
      title   : req.body.title,
      year    : req.body.year,
      country : req.body.country,
      poster  : req.body.poster,
      seasons : req.body.seasons,
      gender  : req.body.gender,
      summary : req.body.summary
    };

    request.post('/')
      .set('Accept', 'application/json')
      .send(data)
      .end(function (err,response) {
        console.log('Estado: '+response.status);
        if (err || response.status !== 200) {
            console.log('Ocurrio un error!');
            return res.redirect('/create');
        }
        console.log('No ocurrio un error!');
        res.redirect('/');
      })
});

router.route('/edit/:id')
    .get(function(req, res) {
        console.log(req.params.id);
        request.get('/'+req.params.id)
            .end(function(err, response) {
                if (err) {
                    res.status(400).send('Ha ocurrido un error');
                }
                var tvShow = response.body;
                res.render('edit', tvShow);
            });
    })
    .put(function(req, res) {
        console.log('PETICIÓN PUT');
        var data = {
          title   : req.body.title,
          year    : req.body.year,
          country : req.body.country,
          poster  : req.body.poster,
          seasons : req.body.seasons,
          gender  : req.body.gender,
          summary : req.body.summary
        };
        request.put('/'+req.params.id)
            .set('Accept', 'application/json')
            .send(data)
            .end(function(err, response) {
                if (err) {
                    res.status(404).send('Ha ocurrido un error');
                }
                res.redirect('/');
            });
    })
    .delete(function(req, res) {
      console.log('Entre a petición DELETE');
      request.delete('/'+req.params.id)
          .set('Accept', 'application/json')
          .end(function(err, response) {
              if (err) {
                  res.status(400).send('Ha ocurrido un error '+err);
              }
              res.redirect('/');
          });
    });

module.exports = router;
