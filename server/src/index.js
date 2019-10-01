const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use('/questions', routes.questions);

app.listen(9000);
