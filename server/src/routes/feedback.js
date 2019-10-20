const express = require('express');

const router = express.Router();

/*
 * TODO
 * Этот роут не является рабочим и на данный момент
 * нужен только для тестирования функционала страницы contact us
 */
router.post('/', (req, res) => {
  const { name } = req.body;

  setTimeout(() => res.status(name === 'Slavik' ? 200 : 500).json(), 1000);
});

module.exports = router;
