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
