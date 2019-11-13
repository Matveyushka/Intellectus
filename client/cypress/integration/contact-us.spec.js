describe('Contact us', () => {

  const url = '/feedback';

  beforeEach(() => {
    cy.visit('/contact-us');
  })

  it('Body length counter displays correct string', () => {
    cy.fixture('feedback').then(feedback => {
      cy.get('.area-count').contains(/^0.\/.300$/);

      cy.get('[name="body"]').type(feedback.body);
      const length = feedback.body.length.toString();
      cy.get('.area-count').contains(new RegExp(`^${length}.\/.300$`));

      cy.get('[name="body"]').clear();
      cy.get('.area-count').contains(/^0.\/.300$/);

      cy.get('[name="body"]').type(Array(301).fill('a').join(''));
      cy.get('.area-count').contains(/^300.\/.300$/);
    });
  })

  it('A success message is displayed for valid data', () => {
    cy.fixture('feedback').then(feedback => {
      cy.fillContactUsInputFields(feedback);
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

  context('Invalid data', () => {

    it('An error message is displayed when status is 500', () => {
      cy.fixture('feedback').then(feedback => {
        cy.fillContactUsInputFields(feedback);
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

    it('Empty fields', () => {
      const feedback = {name: '', email: '', title: '', body: ''};
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
    })

    it('Invalid email', () => {
      const feedback = {name: 'Petr', email: '1@1.1', title: 'title', body: 'body'};
      cy.fillContactUsInputFields(feedback)
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
