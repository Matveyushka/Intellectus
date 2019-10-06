Cypress.Commands.add('getQuestions', (questions = 'fuxture:questions') => {
    cy.server();
    cy.route({
        method: 'GET',
        url: '/api/questions',
        response: questions
    });
})

Cypress.Commands.add('postAnswers', (answers = 'fixture:answers') => {
    cy.server();
    cy.route({
        method: 'POST',
        url: '/api/answers',
        status: 200,
        response: answers
    });
})
