const session = {};
const saveSession = (token, questions) => {
  session[token] = {
    questions,
    createdAt: new Date().getTime(),
  };
};
const getSession = token => session[token];

const getTimeSession = token => new Date().getTime() - session[token].createdAt;

module.exports = {
  saveSession,
  getSession,
  getTimeSession,
};
