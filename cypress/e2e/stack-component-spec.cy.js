import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('test stack vizualization', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('button should be disabled when input value is empty', () => {
    cy.get('input').clear();
    cy.get('button').eq(1).should('be.disabled');
  });

  it('correct adding element to stack', () => {
    cy.get('input').clear();
    cy.get('input').type(1);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('input').type(2);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0 || index === 1) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('input').type(3);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0 || index === 1 || index === 2) cy.wrap(el).find('[class*=circle_default]');
      });
  });

  it('correct removing data from stack', () => {
    cy.get('input').type(1);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(2);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(3);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0 || index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0 || index === 1) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').should('have.length', 0);

    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });

  it('correct clear data from stack', () => {
    cy.get('input').clear();
    cy.get('input').type(1);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(2);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(3);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('button').eq(3).click();
    cy.get('[class*=circle_content]').should('have.length', 0);

    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });
});
