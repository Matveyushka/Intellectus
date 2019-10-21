const session = {};
const lifeTimeSession = 1000 * 60 * 60 * 5;

const createSession = questions => ({
  questions,
  createdAt: new Date().getTime(),
  finished: false,
});

const finishSession = (token) => {
  session[token].finished = true;
};

const closeSession = (token) => {
  session[token] = undefined;
};

const saveSession = (token, questions) => {
  session[token] = createSession(questions);

  setTimeout(() => closeSession(token), lifeTimeSession);
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
  finishSession,
  closeSession,
  getSession,
  getTimeSession,
};
