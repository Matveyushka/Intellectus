Cypress.Commands.add('getQuestions', (questions = 'fx:questions') => {
  cy.server();
  cy.route({
    method: 'GET',
    url: '/questions',
    response: questions
  });
})

Cypress.Commands.add('postAnswers', (req = 'fx:answers-req', resp = 'fx:answers-resp') => {
  cy.server();
  cy.route({
    method: 'POST',
    url: '/answers',
    status: 201,
    request: req,
    response: resp
  });
})

Cypress.Commands.add('passTest', () => {
  cy.get('.option-wrapper').children().eq(1).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(2).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(3).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(4).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(5).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(0).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(1).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(2).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(3).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(4).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(5).click();
  cy.get('.test-view-next-button').click();
  cy.get('.option-wrapper').children().eq(0).click();
})