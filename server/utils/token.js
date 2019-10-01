const generateRandomString = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  return Array(5).fill(null).map(() => alphabet.charAt(Math.floor(Math.random() * alphabet.length))).join('');
};

const generateToken = () => `${`${Buffer.from(new Date().getTime().toString()).toString('base64')};${generateRandomString()}`}`;

module.exports = {
  generateToken,
};
