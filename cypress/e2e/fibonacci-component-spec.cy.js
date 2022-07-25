import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('testing fibonacci vizualization', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('button should be disabled on start', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('page should render circles with correct values', () => {
    cy.get('input').clear();
    cy.get('input').type(19);
    cy.get('button').eq(1).click();

    cy.wait(SHORT_DELAY_IN_MS * 20);

    cy.get('[class*=circle_content]')
      .should('have.length', 20)
      .each((el, index) => {
        if (index === 0 || index === 1) cy.wrap(el).contains(1);
        if (index === 2) cy.wrap(el).contains(2);
        if (index === 3) cy.wrap(el).contains(3);
        if (index === 4) cy.wrap(el).contains(5);
        if (index === 5) cy.wrap(el).contains(8);
        if (index === 6) cy.wrap(el).contains(13);
        if (index === 7) cy.wrap(el).contains(21);
        if (index === 8) cy.wrap(el).contains(34);
        if (index === 9) cy.wrap(el).contains(55);
        if (index === 10) cy.wrap(el).contains(89);
        if (index === 11) cy.wrap(el).contains(144);
        if (index === 12) cy.wrap(el).contains(233);
        if (index === 13) cy.wrap(el).contains(377);
        if (index === 14) cy.wrap(el).contains(610);
        if (index === 15) cy.wrap(el).contains(987);
        if (index === 16) cy.wrap(el).contains(1597);
        if (index === 17) cy.wrap(el).contains(2584);
        if (index === 18) cy.wrap(el).contains(4181);
        if (index === 19) cy.wrap(el).contains(6765);
      });
  });
});
