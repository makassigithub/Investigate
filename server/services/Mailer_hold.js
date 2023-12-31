const sendGrid = require('sendgrid');
const keys = require('../config/keys');

const { mail: helper } = sendGrid;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendGrid(keys.sendGridKey);
    this.from_email = new helper.Email('my123gate@gmail.com');
    this.subject = subject;
    this.body = this.addContent(new helper.Content('text/html', content));
    this.recipients = recipients.map(({ email }) => new helper.Email(email));

    this.addClickTracking();
    this.addRecipients();
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => personalize.addTo(recipient));
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });

    return this.sgApi.API(request);
  }
}

module.exports = Mailer;
