const {
  saveSession, closeSession, finishSession, getSession,
} = require('./session.js');

describe('Session', () => {
  it('should create session object', () => {
    saveSession('blablabla', [1, 2, 3]);

    expect(getSession('blablabla')).toHaveProperty('createdAt');

    expect(getSession('blablabla').finished).toEqual(false);

    expect(getSession('blablabla').questions).toEqual([1, 2, 3]);
  });

  it('should finnish session', () => {
    saveSession('blablabla', [1, 2, 3]);

    expect(getSession('blablabla').finished).toEqual(false);

    finishSession('blablabla');

    expect(getSession('blablabla').finished).toEqual(true);
  });

  it('should close session', () => {
    saveSession('blablabla', [1, 2, 3]);

    expect(getSession('blablabla')).toBeDefined();

    closeSession('blablabla');

    expect(getSession('blablabla')).not.toBeDefined();
  });
});
