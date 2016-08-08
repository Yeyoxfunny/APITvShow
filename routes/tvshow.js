var express = require('express');
var router = express.Router();
var TVShowCtrl = require('../controllers/tvshows');

/* GET users listing. */
router.route('/')
  // .all(function(req, res, next) {
  //     res.set('Content-Type','application/json');
  //     next();
  // })
  // GET /tvshows
  .get(TVShowCtrl.findAllTVShows)
  // POST /tvshows
  .post(TVShowCtrl.addTVShow);

router.route('/:id')
  .all(function(req, res, next) {
      res.set('Content-Type','application/json');
      next();
  })
  // GET /tvshows/:id
  .get(TVShowCtrl.findById)
  // PUT /tvshows/:id
  .put(TVShowCtrl.updateTVShow)
  // DELETE /tvshows/:id
  .delete(TVShowCtrl.deleteTVShow);

module.exports = router;
