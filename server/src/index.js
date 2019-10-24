require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
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

app.use('/reports', routes.reports);

app.use('/feedback', routes.feedback);

app.use('/statistics', routes.statistics);

app.get('*', (req, res) => {
  // грязные хаки, чтобы браузер не скачивал gzip-архив, а отображал его как html
  const file = fs.readFileSync(path.join(__dirname, '../public', 'index.html.gz'));

  res.type('html');

  res.setHeader('Content-Encoding', 'gzip');

  res.send(file);
});

const { MONGO_ATLAS_LOGIN, MONGO_ATLAS_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGO_ATLAS_LOGIN}:${MONGO_ATLAS_PASSWORD}@cluster0-gsf7q.gcp.mongodb.net/db?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info('MongoDB connected.');

    db.initializeDB();
  })
  .catch(err => console.error(`MongoDB connection error: ${err}`));

const Port = process.env.PORT || 9000;

app.listen(Port, () => console.info(`Server started on ${Port}.`));
