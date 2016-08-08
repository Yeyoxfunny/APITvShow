'use strict';

var obtenerTVShows;

(function() {
    var API_TVSHOW_URL = "http://localhost:3000/tvshows";

    var tvShow = {};
    var $body = $("#tvshows__main");

    function getTVShows() {
        $.getJSON(API_TVSHOW_URL, getTVShowData)
    }
    function activeTemplate(id) {
      var template = document.getElementById(id);
      return document.importNode(template.content, true);
    }
    function getTVShowData(data) {
        $.each(data, function(index,value) {
            tvShow.id = value._id;
            tvShow.title = value.title;
            tvShow.year = value.year;
            tvShow.country = value.country;
            tvShow.poster = value.poster;
            tvShow.seasons = value.seasons;
            tvShow.gender = value.gender || "Sin genero";
            tvShow.summary = value.summary;
            //console.log(tvShow);
            renderTemplate(tvShow);
        });
    }

    function renderTemplate(objTVShow) {
      var clone = activeTemplate('template--tvshow');
      console.log(objTVShow);
      clone.querySelector('[data-title]').innerHTML = objTVShow.title;
      clone.querySelector('[data-year]').innerHTML = objTVShow.year;
      clone.querySelector('[data-country]').innerHTML = objTVShow.country;
      clone.querySelector('[data-poster]').src = objTVShow.poster;
      clone.querySelector('[data-seasons]').innerHTML = objTVShow.seasons;
      clone.querySelector('[data-gender]').innerHTML = objTVShow.gender;
      clone.querySelector('[data-summary]').innerHTML = objTVShow.summary;
      clone.querySelector('#edit-entry').href = '/edit/'+objTVShow.id;
      $body.append(clone);
    }    
    obtenerTVShows = getTVShows;
})();
