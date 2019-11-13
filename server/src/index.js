require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const expressStaticGzip = require('express-static-gzip');
const routes = require('./routes/index');
const db = require('./db');

const app = express();

app.use('/', expressStaticGzip(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/questions', routes.questions);

app.use('/answers', routes.answers);

app.use('/report', routes.reports);

app.use('/feedback', routes.feedback);

app.use('/statistics-data', routes.statistics);

app.get('*', (req, res) => {
  // грязные хаки, чтобы браузер не скачивал gzip-архив, а отображал его как html
  const file = fs.readFileSync(path.join(__dirname, '../public', 'index.html.gz'));

  res.type('html');

  res.setHeader('Content-Encoding', 'gzip');

  res.send(file);
});

db.connect();

const Port = process.env.PORT || 9000;

app.listen(Port, () => console.info(`Server started on ${Port}.`));
