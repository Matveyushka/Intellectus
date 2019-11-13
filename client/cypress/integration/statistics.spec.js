describe('Statistics', () => {

  beforeEach(() => {
    cy.getStatisticsData();
    cy.visit('/statistics');
  })

  it('Correct title is displayed', () => {
    cy.fixture('statistics-data').then(statistics => {
      const formatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      const threeHours = 3 * 60 * 60 * 1000;
      const date = new Date(statistics.averageTime - threeHours);
      const formattedDate = date.toLocaleString('ru', formatOptions);
      cy.get('.statistics-title').contains(`The test was passed ${statistics.passedTestsCounter} times with average time ${formattedDate}`);
    });
  })
})
