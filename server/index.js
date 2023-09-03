const app = require('express')();

app.get('/', (req, res) => {
  res.send({ name: 'Brahima' });
});

app.listen(5000, () => console.log('Server listening at port: 5000'));
