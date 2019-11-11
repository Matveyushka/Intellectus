const seedRandom = (seed, bound = 100) => Math.abs(Math.round(
  ((((Math.log(seed * 1771) % bound) * ((seed + Math.sqrt(seed * 2128506)) % bound)) % bound)
  ** ((seed ** 2.71828) % 17)) % bound,
));

module.exports = {
  seedRandom,
};
