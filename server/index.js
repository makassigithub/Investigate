const app = require('express')();

app.get('/', (req, res) => {
  res.send({ buddy: 'How be' });
});

app.listen(5000, () => console.log('Server listening at port: 5000'));
