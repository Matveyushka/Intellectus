describe('Menu', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Click to menu item navigate to right route', () => {
    cy.get('.header-container').contains('STATISTICS').click();
    cy.url().should('include', '/statistics');
    cy.get('.header-container').contains('ABOUT').click();
    cy.url().should('include', '/about');
    cy.get('.header-container').contains('CONTACT US').click();
    cy.url().should('include', '/contact-us');
    cy.get('.header-logo-img').click();
    cy.get('.play-icon').should('be.visible');
  })
})
