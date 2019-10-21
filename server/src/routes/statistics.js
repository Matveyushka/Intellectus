const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const {
    passedTestsCounter,
    averageTime,
    pointsDistribution,
    averageTimeDistribution,
  } = await db.getStatistics();

  return res.status(200).json({
    passedTestsCounter,
    averageTime,
    pointsDistribution,
    averageTimeDistribution,
  });
});

module.exports = router;
