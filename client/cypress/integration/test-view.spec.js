describe('Test view', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.getQuestions();
    cy.get('.play-icon').click();
  })

  it('Clicking the Start button starts testing', () => {
    cy.get('.test-view').should('be.visible');
  })

  it('Clicking on an option makes it selected', () => {
    cy.get('.option-wrapper').children().eq(0).should('not.have.class', 'selected')
      .click()
      .should('have.class', 'selected');
  })

  it('Next button appears after choosing an option', () => {
    cy.get('.test-view-next-button').should('not.exist');
    cy.get('.option-wrapper').children().eq(0).click();
    cy.get('.test-view-next-button').should('contain.text', 'Next');
  })

  it('After 12 answers, finish button should appear', () => {
    cy.passTest();
    cy.get('.test-view-next-button').should('contain.text', 'Finish');
  })

  it('Clicking Finish button shows statistics', () => {
    cy.passTest();
    cy.postAnswers();
    cy.get('.test-view-next-button').click();
    cy.get('.stats').should('be.visible');
  })
})
