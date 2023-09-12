const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');
const paymentMiddleware = require('../middlewares/paymentMiddleware');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const buildEmail = require('../services/buildEmail');
sgMail.setApiKey(keys.sendGridKey);

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  console.log('Survey route activated.....');
  app.post('/api/survey', authMiddleware, paymentMiddleware, (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const emailObj = buildEmail(survey, surveyTemplate(survey));
    sgMail.send(emailObj);
  });
};
