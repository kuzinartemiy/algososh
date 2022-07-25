describe('testing string-reverse vizualization', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('button should be disabled on start', () => {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });

  it('page should render circles', () => {
    cy.get('input').type('12345');
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(index + 1);

        if (index === 0 || index === 4) {
          cy.wrap(el).find('[class*=circle_changing]');
        }

        if (index === 1 || index === 2 || index === 3) {
          cy.wrap(el).find('[class*=circle_default]');
        }
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(5 - index);

        cy.wrap(el).find('[class*=modified]');
      });
  });
});
