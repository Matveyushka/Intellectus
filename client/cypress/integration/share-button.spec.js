describe('Share button', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Social media icons appears when you click the share button', () => {
    cy.get('.share-icon').click();
    cy.get('.twitter').should('be.visible');
    cy.get('.facebook').should('be.visible');
    cy.get('.vk').should('be.visible');
  })

  it('Social media icons disappears when you click the share button second time', () => {
    cy.get('.share-icon').click();
    cy.get('.twitter').should('not.be.visible');
    cy.get('.facebook').should('not.be.visible');
    cy.get('.vk').should('not.be.visible');
  })
})
