const generateRandomString = () => {
  let randomString = '';
  const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  for (let i = 0; i < 5; i += 1) {
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return randomString;
};

const generateToken = () => `${`${Buffer.from(new Date().getTime().toString()).toString('base64')};${generateRandomString()}`}`;

module.exports = {
  generateToken,
};
