var TVShow = require('../models/tvshows');

// GET /tvshows
exports.findAllTVShows = function (req,res) {
  TVShow.find(function (err,tvshows) {
    if(err) res.send(500,err.message);
    console.log('GET /tvshows desde el controlador');
    //console.log(tvshows)
      res.status(200).jsonp(tvshows);
  });
}

// GET /tvshows/:id
exports.findById = function (req,res) {
	console.log('Request id:',req.params.id + "Request "+req.is('application/json'));
  TVShow.findById(req.params.id,function (err,tvshow) {
    //console.log(tvshow);
    if(err) return res.send(500,err.message);
      res.status(200).jsonp(tvshow);
  })
}

// POST /tvshow
exports.addTVShow = function (req,res,next) {
  console.log('POST');
  //console.log(req.body);
  console.log("Request "+req.is('application/json'));

  if(!req.is('application/json')){
    return res.status(400).send('El Content-Type debe ser application/json');
  }
  var tvshow = new TVShow({
    title   : req.body.title,
    year    : req.body.year,
    country : req.body.country,
    poster  : req.body.poster,
    seasons : req.body.seasons,
    gender  : req.body.gender,
    summary : req.body.summary
  });

  tvshow.save(function (err, tvshow) {
    console.log('OCURRIO ERROR AL INSERTAR DATOS');
    if(err) return res.status(500).send(err.message);

    res.set('Content-Type','application/json');
    res.status(200).jsonp(tvshow);
  });
}

// PUT /tvshows/:id
exports.updateTVShow = function (req,res) {
  if(!req.is('application/json')){
    return res.status(400).json({ title : 'El Content-Type debe ser application/json'});
  }
  TVShow.findById(req.params.id, function (err,tvshow) {
    tvshow.title   = req.body.title;
    tvshow.year    = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster  = req.body.poster;
    tvshow.seasons = req.body.seasons;
    tvshow.gender  = req.body.gender;
    tvshow.summary = req.body.summary;

    tvshow.save(function (err) {
      if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(tvshow);
    });
  })
}

// DELETE /tvshows/:id
exports.deleteTVShow = function (req,res) {
  // if(!req.is('application/json')){
  //   return res.status(404).send('El Content-Type debe ser application/json');
  // }
  TVShow.findById(req.params.id, function (err,tvshow) {
    tvshow.remove(function (err) {
      if(err) return res.status(500).send(err.message);

      res.status(200).send();
    });
  });
}
