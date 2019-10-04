const session = {};
const saveSession = (token, questions) => {
  session[token] = {
    questions,
    created_at: new Date().getTime(),
  };
};
const getSession = token => session[token];

const getTimeSession = token => new Date().getTime() - session[token].created_at;

module.exports = {
  saveSession,
  getSession,
  getTimeSession,
};
