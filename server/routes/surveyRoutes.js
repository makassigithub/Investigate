const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');
const paymentMiddleware = require('../middlewares/paymentMiddleware');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const buildEmail = require('../services/buildEmail');
const _ = require('lodash');
const { Path } = require('path-parser');

sgMail.setApiKey(keys.sendGridKey);

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/survey/:surveyId/:choice', (req, res) => {
    res.send('Thank you for helping us improve our platform.');
  });

  app.post('/api/survey/webhook', (req, res) => {
    const p = new Path('/api/survey/:surveyId/:choice');
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    console.log(events);
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

  app.get('/api/surveys', authMiddleware, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });
};
