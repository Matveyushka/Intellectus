describe('Test view', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.getQuestions();
    cy.get('.play-icon').click();
  })

  it('Clicking the Start button starts testing', () => {
    cy.get('.test-view').should('be.visible');
  })

  it('Prev and next buttons are displayed only if necessary', () => {
    cy.get('.test-view-prev-button').should('not.be.visible');
    cy.get('.test-view-next-button').should('be.visible').click();
    for (let i = 2; i <= 11; i++) {
      cy.get('.test-view-prev-button').should('be.visible');
      cy.get('.test-view-next-button').should('be.visible').click();
    }
    cy.get('.test-view-prev-button').should('be.visible');
    cy.get('.test-view-next-button').should('not.be.visible');
  })

  it('Prev and next buttons switch problems', () => {
    cy.fixture('questions').then(questions => {
      cy.checkProblemFields(questions.questions[0]);
      cy.get('.test-view-next-button').click();
      cy.checkProblemFields(questions.questions[1]);
      cy.get('.test-view-prev-button').click();
      cy.checkProblemFields(questions.questions[0]);
    })
  })

  it('Clicking on an option makes it selected', () => {
    cy.get('.option-wrapper').children().eq(0).should('not.have.class', 'selected')
      .click()
      .should('have.class', 'selected');
  })

  it('After 12 answers, finish button should appear', () => {
    cy.passTest();
    cy.get('.test-view-finish-button').should('be.visible');
  })

  it('Clicking Finish button shows statistics', () => {
    cy.passTest();
    cy.postAnswers();
    cy.get('.test-view-finish-button').click();
    cy.get('.stats').should('be.visible');
  })
})
