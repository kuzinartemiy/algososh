describe('pages available to visit', () => {
  it('visit main page', () => {
    cy.visit('http://localhost:3000');
  });

  it('visit recursion page', () => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('visit fibonacci page', () => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('visit sorting page', () => {
    cy.visit('http://localhost:3000/sorting');
  });

  it('visit stack page', () => {
    cy.visit('http://localhost:3000/stack');
  });

  it('visit queue page', () => {
    cy.visit('http://localhost:3000/queue');
  });

  it('visit list page', () => {
    cy.visit('http://localhost:3000/list');
  });
});
