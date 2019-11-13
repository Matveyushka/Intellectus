describe('Smoke tests', () => {
  
  describe('UI', () => {
    
    beforeEach(() => {
      cy.visit('/');
    })

    it('Passing a test', () => {
      cy.server().route('GET', '/questions').as('questionsReq');
      cy.get('.play-icon').click();
      cy.wait('@questionsReq');

      cy.passTest();
      
      cy.server().route('POST', '/answers').as('answersReq');
      cy.get('.test-view-finish-button').click();
      cy.wait('@answersReq');
      
      cy.get('.stats').should('be.visible');
    })

    it('Send feedback (Some providers can block SMTP)', () => {
      cy.fixture('feedback').then(feedback => {
        cy.get('.header-container').contains('CONTACT US').click();
        cy.fillContactUsInputFields(feedback);
        
        cy.server().route('POST', '/feedback').as('feedbackReq');
        cy.get('.send-btn').click();
        cy.wait('@feedbackReq');
        
        cy.get('.success').should('exist');
      })
    })
  })

  describe('Requests', () => {
    it('Get solutions for valid token and answers', () => {
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
})
