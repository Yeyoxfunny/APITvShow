var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tvshowSchema = new Schema({
  title : { type : String, required : 'No debe estar el campo vacío'},
  year : { type : Number, required : true },
  country : { type : String, required : true},
  poster : { type : String, required : true},
  seasons : { type : Number, required : true},
  gender : { type : String, enum : ['Drama','Fantasy','Sci-Fi', 'Thriller', 'Comedy'], required : true},
  summary : { type : String, required : true}
});

module.exports = mongoose.model('TVShow',tvshowSchema);
