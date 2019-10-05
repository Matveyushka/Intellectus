const session = {};
const lifeTimeSession = 1000 * 60 * 60 * 5;
const saveSession = (token, questions) => {
  session[token] = {
    questions,
    createdAt: new Date().getTime(),
  };

  setTimeout(() => {
    session[token] = undefined;
  }, lifeTimeSession);
};
const getSession = (token) => {
  if (session[token] === undefined) {
    return false;
  }

  return session[token];
};

const getTimeSession = token => new Date().getTime() - session[token].createdAt;


module.exports = {
  saveSession,
  getSession,
  getTimeSession,
};
