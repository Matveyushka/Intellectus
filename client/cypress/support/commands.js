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

Cypress.Commands.add('getStatisticsData', (statisticsData = 'fx:statistics-data') => {
  cy.server().route({
    method: 'GET',
    url: '/statistics-data',
    response: statisticsData
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

Cypress.Commands.add('checkProblemFields', question => {
  question.problemFields.forEach((field, index) => {
    if (field) {
      cy.get('.problem-wrapper').children().eq(index).children()
        .should('have.attr', 'src').and('include', field);
    }
  })
})

Cypress.Commands.add('fillContactUsInputFields', feedback => {
  cy.get('[name="name"]').type(feedback.name);
  cy.get('[name="email"]').type(feedback.email);
  cy.get('[name="title"]').type(feedback.title);
  cy.get('[name="body"]').type(feedback.body);
})
