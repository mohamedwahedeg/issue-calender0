var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubscribeSchema = new Schema({
  mail: String
});

module.exports = mongoose.model('Subscribe', SubscribeSchema);
