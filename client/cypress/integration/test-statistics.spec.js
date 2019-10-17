describe('Test statistics', () => {

  before(() => {
    cy.visit('/');
    cy.getQuestions();
    cy.get('.play-icon').click();
    cy.passTest();
    cy.postAnswers(); // 5 right answers
    cy.get('.test-view-next-button').click();
  })

  it('Statistics title contains right number of answers', () => {
    cy.get('.test-title').should('be.visible').and('contain.text', '5').and('contain.text', '12');
  })

  it('The histogram should highlight the current column', () => {
    for (let i = 0; i <= 12; i++) {
      cy.get('.stats').children().eq(i)
        .should(i !== 5 ? 'not.have.class' : 'have.class', 'selected');
    }
  })
})