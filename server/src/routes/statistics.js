const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const statistics = await db.getStatistics();

  return res.status(200).json({
    passedTestsCounter: statistics.passedTestsCounter,
    averageTime: statistics.averageTime,
    pointsDistribution: statistics.pointsDistribution,
    averageTimeDistribution: statistics.averageTimeDistribution,
  });
});

module.exports = router;
