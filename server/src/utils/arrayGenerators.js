const { shuffle } = require('./arrayShuffle');

const generateOrderedArray = length => [...Array(length).keys()];

const generateShuffledArray = length => shuffle(generateOrderedArray(length));

module.exports = {
  generateOrderedArray,
  generateShuffledArray,
};
