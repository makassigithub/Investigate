const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = require('./User');
const RecipientSchema = require('./Recipient');

const SurveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: UserSchema,
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model('surveys', SurveySchema);
