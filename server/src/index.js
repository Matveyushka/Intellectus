const express = require('express');
const path = require('path');
const questions = require('../routes/questions.js');

const app = express();


app.use(express.static(path.join(__dirname, '../public')));
app.use('/questions', questions);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(9000);
