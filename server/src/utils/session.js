const sessions = {};
const saveSession = (token, questions) => {
  sessions[token] = questions;
};
const getSession = token => sessions[token];

module.exports = {
  saveSession,
  getSession,
};
