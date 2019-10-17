Cypress.Commands.add('getQuestions', (questions = 'fx:questions') => {
  cy.server().route({
    method: 'GET',
    url: '/questions',
    response: questions
  });
})

Cypress.Commands.add('postAnswers', (req = 'fx:answers-req', resp = 'fx:answers-resp') => {
  cy.server().route({
    method: 'POST',
    url: '/answers',
    status: 201,
    request: req,
    response: resp
  });
})

Cypress.Commands.add('passTest', () => {
  cy.fixture('answers-req').then(req => {
    const lastIndex = req.answers.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      cy.get('.option-wrapper').children().eq(req.answers[i]).click();
      cy.get('.test-view-next-button').click();
    }
    cy.get('.option-wrapper').children().eq(req.answers[lastIndex]).click();
    // Finish button not clicked
  })
})