var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  title: String,
  url: String,
  videoevent: Array(),
	creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('video', VideoSchema);
