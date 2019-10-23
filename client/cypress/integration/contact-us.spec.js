describe('Contact us', () => {

  const url = '/feedback';

  beforeEach(() => {
    cy.visit('/');
    cy.get('.header-container').contains('CONTACT US').click();
  })

  it('A success message is displayed for valid data', () => {
    cy.fixture('feedback').then(feedback => {
      fillInputFields(feedback);
      cy.server().route({
        method: 'POST',
        url: url,
        status: 200,
        request: feedback,
        response: ''
      });
      cy.get('.send-btn').click();
      cy.get('.contact-results').children().should('have.class', 'success');
    })
  })

  it('An error message is displayed when status ', () => {
    cy.fixture('feedback').then(feedback => {
      fillInputFields(feedback);
      cy.server().route({
        method: 'POST',
        url: url,
        status: 500,
        request: feedback,
        response: ''
      });
      cy.get('.send-btn').click();
      cy.get('.contact-results').children().should('have.class', 'error');
    })
  })

  context('Invalid data', () => {
    
    it('Empty fields', () => {
      const feedback = {name: ' ', email: ' ', title: ' ', body: ' '};
      fillInputFields(feedback)
      cy.server().route({
        method: 'POST',
        url: url,
        request: feedback,
        response: '',
        onResponse: () => { expect("Unexpected Https call").to.be.false; },
      })
      cy.get('.send-btn').click();

      cy.get('[name="name"]').should('have.class', 'border-error');
      cy.get('[name="email"]').should('have.class', 'border-error');
      cy.get('[name="title"]').should('have.class', 'border-error');
      cy.get('[name="body"]').should('have.class', 'border-error');
    })

    it('Invalid email', () => {
      const feedback = {name: 'Petr', email: '1@1.1', title: 'title', body: 'body'};
      fillInputFields(feedback)
      cy.server().route({
        method: 'POST',
        url: url,
        request: feedback,
        response: '',
        onResponse: () => { expect("Unexpected Https call").to.be.false; },
      })
      cy.get('.send-btn').click();
      cy.get('[name="email"]').should('have.class', 'border-error');
    })
  })
})

const fillInputFields = feedback => {
  cy.get('[name="name"]').type(feedback.name);
  cy.get('[name="email"]').type(feedback.email);
  cy.get('[name="title"]').type(feedback.title);
  cy.get('[name="body"]').type(feedback.body);
}