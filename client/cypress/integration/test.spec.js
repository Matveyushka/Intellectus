describe('UI', () => {
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
})

describe.only('Requests', () => {
  it('Get right answers for valid token and answers', () => {
    cy.request('GET', '/questions')
      .then(resp => {
        cy.request({
          method: 'POST',
          url: '/answers',
          body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]}
        }).then(resp => {
            expect(resp.status).to.eq(201);
        })
      })
  })

  it('Bad request on nonexistent token', () => {
    cy.request('GET', '/questions')
    cy.request({
      method: 'POST',
      url: '/answers',
      body: {"token": 'nonexistenttoken', "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]},
      failOnStatusCode: false
    }).then(resp => {
      expect(resp.status).to.eq(404);
    })
  })
  
  it('Bad request when number of answers != 12', () => {
    cy.request('GET', '/questions')
      .then(resp => {
        cy.request({
          method: 'POST',
          url: '/answers',
          body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6]},
          failOnStatusCode: false
        }).then(resp => {
            expect(resp.status).to.eq(400);
          })
      })
  })

  it('Bad request on second attempt to get answers for one token', () => {
    cy.request('GET', '/questions')
      .then(resp => {
        cy.request({
          method: 'POST',
          url: '/answers',
          body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]}
        })
        cy.request({
          method: 'POST',
          url: '/answers',
          body: {"token": resp.body.token, "answers": [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]},
          failOnStatusCode: false
        }).then(resp2 => {
          expect(resp2.status).to.eq(404);
        })  
      })
  })
})