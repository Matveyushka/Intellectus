describe('Loader', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Loader is shown when questions loading', () => {
    cy.server().route({
      method: 'GET',
      url: '/questions',
      response: 'fx:questions',
      delay: 100
    });
    cy.get('.play-icon').click();
    cy.get('.loader').should('be.visible');
  })

  it('Loader is shown when answers loading', () => {
    cy.getQuestions();
    cy.get('.play-icon').click();
    cy.passTest();
    cy.server().route({
      method: 'POST',
      url: '/answers',
      status: 201,
      request: 'fx:answers-req',
      response: 'fx:answers-resp',
      delay: 100
    });
    cy.get('.test-view-finish-button').click();
    cy.get('.loader').should('be.visible');
  })
})
