const { shuffle } = require('./arrayShuffle');

const generateShuffledArray = length => shuffle([...Array(length).keys()]);

const createShuffledObjectKeysNumbersArray = object => generateShuffledArray(
  Object.keys(object).length,
);

module.exports = {
  generateShuffledArray,
  createShuffledObjectKeysNumbersArray,
};
