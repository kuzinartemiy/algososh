/* eslint-disable cypress/no-unnecessary-waiting */
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('test queue vizualization', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it('button should be disabled when input value is empty', () => {
    cy.get('input').clear();
    cy.get('button').eq(1).should('be.disabled');
  });

  it('correct adding element to queue', () => {
    cy.get('input').clear();
    cy.get('input').type(1);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]').should('have.length', 7);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 0) cy.wrap(el).contains('tail');
      });

    cy.get('input').type(2);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).contains('tail');
      });

    cy.get('input').type(3);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).contains('tail');
      });

    cy.get('input').type(4);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).contains('tail');
      });

    cy.get('input').type(5);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).contains('tail');
      });

    cy.get('input').type(6);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).find('[class*=circle_default]');
        if (index === 5) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).find('[class*=circle_default]');
        if (index === 5) cy.wrap(el).find('[class*=circle_default]');
        if (index === 5) cy.wrap(el).contains('tail');
      });

    cy.get('input').type(7);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).find('[class*=circle_default]');
        if (index === 5) cy.wrap(el).find('[class*=circle_default]');
        if (index === 6) cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).find('[class*=circle_default]');
        if (index === 5) cy.wrap(el).find('[class*=circle_default]');
        if (index === 6) cy.wrap(el).find('[class*=circle_default]');
        if (index === 6) cy.wrap(el).contains('tail');
      });
  });

  it('add button should be disabled when queue is ended', () => {
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

    cy.get('input').type(4);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(5);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(6);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(7);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 6) cy.wrap(el).contains('tail');
      });

    cy.get('button').eq(1).should('be.disabled');
  });

  it('correct removing data from queue', () => {
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

    cy.get('input').type(4);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(5);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(6);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);
    
    cy.get('input').type(7);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_changing]');
        if (index !== 0) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find('[class*=circle_default]');
        if (index === 1) cy.wrap(el).contains('head');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 1) cy.wrap(el).find('[class*=circle_changing]');
        if (index !== 1) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 1) cy.wrap(el).find('[class*=circle_default]');
        if (index === 2) cy.wrap(el).contains('head');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 2) cy.wrap(el).find('[class*=circle_changing]');
        if (index !== 2) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 2) cy.wrap(el).find('[class*=circle_default]');
        if (index === 3) cy.wrap(el).contains('head');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 3) cy.wrap(el).find('[class*=circle_changing]');
        if (index !== 3) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 3) cy.wrap(el).find('[class*=circle_default]');
        if (index === 4) cy.wrap(el).contains('head');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 4) cy.wrap(el).find('[class*=circle_changing]');
        if (index !== 4) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 4) cy.wrap(el).find('[class*=circle_default]');
        if (index === 5) cy.wrap(el).contains('head');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 5) cy.wrap(el).find('[class*=circle_changing]');
        if (index !== 5) cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 5) cy.wrap(el).find('[class*=circle_default]');
        if (index === 6) cy.wrap(el).contains('head');
      });

    cy.get('button').eq(2).click();

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).find('[class*=circle_default]');
      });

    cy.get('[class*=circle_content]')
      .each((el) => {
        cy.wrap(el).contains('head').should('not.exist');
        cy.wrap(el).contains('tail').should('not.exist');
      });

    cy.get('button').eq(3).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
  });

  it('correct clear data from queue', () => {
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

    cy.get('input').type(4);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(5);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('input').type(6);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);
    
    cy.get('input').type(7);
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('button').eq(3).click();

    cy.get('[class*=circle_circle]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('1').should('not.exist');
        if (index === 1) cy.wrap(el).contains('2').should('not.exist');
        if (index === 2) cy.wrap(el).contains('3').should('not.exist');
        if (index === 3) cy.wrap(el).contains('4').should('not.exist');
        if (index === 4) cy.wrap(el).contains('5').should('not.exist');
        if (index === 5) cy.wrap(el).contains('6').should('not.exist');
        if (index === 6) cy.wrap(el).contains('7').should('not.exist');
      });

      cy.get('[class*=circle_content]')
        .each((el) => {
          cy.wrap(el).contains('head').should('not.exist');
          cy.wrap(el).contains('tail').should('not.exist');
        });

        cy.get('button').eq(2).should('be.disabled');
        cy.get('button').eq(3).should('be.disabled');
  });
});
