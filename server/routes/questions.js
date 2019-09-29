const express = require('express');

const router = express.Router();
const token = require('../utils/token');
// Get questions.
router.get('/', (req, res) => {
  let uid = token.generateToken(44);
  // eslint-disable-next-line no-use-before-define
  while (existsToken(uid)) {
    uid = token.generateToken(44);
  }
  res.status(200).json({
    token: uid,
    questions: 'questions',
  });
});

// eslint-disable-next-line no-unused-vars
function existsToken(uid) {
  return false;
}


module.exports = router;
