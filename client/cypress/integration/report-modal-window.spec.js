describe('Test report', () => {

  const url = '/report';

  beforeEach(() => {
    cy.visit('/');
    cy.getQuestions();
    cy.get('.play-icon').click();
    cy.passTest();
    cy.postAnswers();
    cy.get('.test-view-finish-button').click();
    cy.get('.stepper-wrapper').children().eq(3*2).click();
    cy.get('.test-view-report-button').click();
  })

  it('The modal window should appear', () => {
    cy.get('.modal-body').should('be.visible');
  })

  it('The modal window closes when you click on the background', () => {
    cy.get('.modal-bg').click('right', { force: true });
    cy.get('.modal-body').should('not.exist');
  })

  it('A success message is displayed for valid data', () => {
    cy.fixture('report').then(report => {
      cy.fillReportInputFields(report);
      cy.server().route({
        method: 'POST',
        url: url,
        status: 200,
        request: report,
        response: ''
      });
      cy.get('.submit').click();
      cy.get('.contact-results').children().should('have.class', 'success');
    })
  })

  context('Invalid data', () => {

    it('An error message is displayed when status is 500', () => {
      cy.fixture('report').then(report => {
        cy.fillReportInputFields(report);
        cy.server().route({
          method: 'POST',
          url: url,
          status: 500,
          request: report,
          response: ''
        });
        cy.get('.submit').click();
        cy.get('.contact-results').children().should('have.class', 'error');
      })
    })

    it('Empty fields', () => {
      const report = {name: '', email: '', body: ''};
      cy.server().route({
        method: 'POST',
        url: url,
        request: report,
        response: '',
        onResponse: () => { expect("Unexpected Https call").to.be.false; },
      })
      
      cy.get('.submit').click();

      cy.get('[name="name"]').should('have.class', 'border-error');
      cy.get('[name="email"]').should('have.class', 'border-error');
      cy.get('.input-with-area').should('have.class', 'border-error');
    })

    it('Invalid email', () => {
      const report = {name: 'Petr', email: '1@1.1', title: 'title', body: 'body'};
      cy.fillReportInputFields(report);
      cy.server().route({
        method: 'POST',
        url: url,
        request: report,
        response: '',
        onResponse: () => { expect("Unexpected Https call").to.be.false; },
      })
      cy.get('.submit').click();
      cy.get('[name="email"]').should('have.class', 'border-error');
    })
  })
})
