const express = require('express');

const path = require('path');

const app = express();

const mongoose = require('mongoose');

const uri = 'mongodb+srv://lol:kek@cluster0-gsf7q.gcp.mongodb.net/db?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info('MongoDB connected.'))
  .catch((err) => console.info('MongoDB connection error: ', err));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const Port = process.env.Port || 3000;

app.listen(Port, () => console.info('Server started.'));
