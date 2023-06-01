var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FileSchema = new Schema({
  url: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  oldfn: String
});

module.exports = mongoose.model('file', FileSchema);
