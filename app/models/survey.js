var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SurveySchema = new Schema({

  formId: String,
  questionId: String,
  answer: String,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
  video: String
});

module.exports = mongoose.model('survey', SurveySchema);
