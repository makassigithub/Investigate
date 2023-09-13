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
  app.get('/api/survey/thanks', (req, res) => {
    res.send('Thank you for helping us improve our platform.');
  });

  app.post(
    '/api/survey',
    authMiddleware,
    paymentMiddleware,
    async (req, res) => {
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

      try {
        await sgMail.send(emailObj);
        await survey.save();
        req.user.credits += -1;
        const user = await req.user.save();
        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};
