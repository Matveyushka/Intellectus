const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const secure = require('../secure.json');
const routes = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use('/questions', routes.questions);

const { MONGO_ATLAS_LOGIN, MONGO_ATLAS_PASSWORD } = secure;
const uri = `mongodb+srv://${MONGO_ATLAS_LOGIN}:${MONGO_ATLAS_PASSWORD}@cluster0-gsf7q.gcp.mongodb.net/db?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info('MongoDB connected.'))
  .catch(err => console.info('MongoDB connection error: ', err));

const Port = process.env.Port || 9000;

app.listen(Port, () => console.info('Server started.'));
