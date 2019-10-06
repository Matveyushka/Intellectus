const next = 'Next';

beforeEach(() => {
  cy.visit('/');
  // cy.getQuestions();
  cy.get('.play-icon').click();
})

it('Clicking Start button starts testing', () => {
  cy.get('.test-view').should('be.visible');
})

it('Next button appears after choosing an option', () => {
  cy.get('.test-view-next-button').should('not.exist');
  cy.get('.option-wrapper').children().eq(0).click();
  cy.get('.test-view-next-button').should('contain.text', next);
})

it('After 12 answers, finish button should appear', () => {
  passTest();
  cy.get('.test-view-next-button').should('contain.text', 'Finish');
})

it('Clicking Finish button shows statistics', () => {
  passTest();
  // cy.postAnswers();
  cy.get('.test-view-next-button').click();
  cy.get('.stats').should('be.visible');
})

const passTest = () => {
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
}
