module.exports = (survey, content) => {
  const msg = {
    to: survey.recipients,
    from: 'my123gate@gmail.com',
    subject: survey.subject,
    survey: survey.subject,
    text: 'Hello plain word',
    html: content,
  };
  return msg;
};
