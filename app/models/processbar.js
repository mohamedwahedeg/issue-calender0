var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PbarSchema = new Schema({

  width: String
});

module.exports = mongoose.model('Pbar', PbarSchema);
