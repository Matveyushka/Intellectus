const { shuffle } = require('./arrayShuffle');

const generateOrderedArray = length => [...Array(length).keys()];

const generateShuffledArray = length => shuffle(generateOrderedArray(length));

const createShuffledObjectKeysNumbersArray = object => shuffle(
  [...Array(Object.keys(object).length).keys()],
);

module.exports = {
  generateShuffledArray,
  createShuffledObjectKeysNumbersArray,
};
