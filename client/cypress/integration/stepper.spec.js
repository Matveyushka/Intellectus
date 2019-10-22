describe('Stepper', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.getQuestions();
    cy.get('.play-icon').click();
  })

  context('During the test', () => {

    it('Stepper should be visible during the test', () => {
      cy.get('.stepper-wrapper').should('be.visible');
    })
  
    it('Displays completed and current tasks', () => {
      cy.get('.option-wrapper').children().eq(0).click();
      cy.get('.test-view-next-button').click();
      cy.get('.option-wrapper').children().eq(1).click();
      cy.get('.test-view-next-button').click();
  
      cy.get('.stepper-wrapper').children().eq(0*2).should('have.class', 'completed');
      cy.get('.stepper-wrapper').children().eq(1*2).should('have.class', 'completed');
      cy.get('.stepper-wrapper').children().eq(2*2).should('have.class', 'current');

      cy.get('.stepper-wrapper').children().eq(3*2).click();
      cy.get('.option-wrapper').children().eq(0).click();
      cy.get('.stepper-wrapper').children().eq(5*2).click()

      cy.get('.stepper-wrapper').children().eq(2*2)
        .should('not.have.class', 'current').and('not.have.class', 'completed');
      cy.get('.stepper-wrapper').children().eq(3*2).should('have.class', 'completed');
      cy.get('.stepper-wrapper').children().eq(5*2).should('have.class', 'current');
    })

    it('Navigates to selected question', () => {
      cy.fixture('questions').then(questions => {
        cy.get('.stepper-wrapper').children().eq(5*2).click()
          .should('have.class', 'current');
        cy.checkProblemFields(questions.questions[5]);
      })
    })
  })

  context('After the test', () => {

    beforeEach(() => {
      cy.passTest();
      cy.postAnswers();
      cy.get('.test-view-finish-button').click();
    })

    it('Shows right and wrong answers', () => {
      cy.fixture('answers-req').then(req => {
        cy.fixture('answers-resp').then(resp => {
          for (let i = 0; i < req.answers.length; i++) {
            cy.get('.stepper-wrapper').children().eq(i*2)
              .should(req.answers[i] === resp.solutions[i] ? 'not.have.class' : 'have.class', 'failed');
          }
        })
      })
    })

    it('Navigates to selected question', () => {
      cy.fixture('questions').then(questions => {
        cy.get('.stepper-wrapper').children().eq(5*2).click();
        cy.checkProblemFields(questions.questions[5]);
      })
    })
  })
})