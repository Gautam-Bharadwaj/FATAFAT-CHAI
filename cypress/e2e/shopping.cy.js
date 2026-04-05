describe('Shopping flow', () => {
  beforeEach(() => {
    cy.exec('node seed.js', {
      cwd: 'server',
      env: {
        ...Cypress.env(),
        MONGO_URI:
          Cypress.env('mongoUri') || 'mongodb://localhost:27017/fatafat-chai',
      },
      failOnNonZeroExit: false,
    });
    cy.login();
  });

  it('opens product detail from listing and adds to cart', () => {
    cy.visit('/products');
    cy.get('[data-testid^="product-card-wrap-"]').first().click();
    cy.get('[data-testid="product-detail"]').should('be.visible');
    cy.get('[data-testid="product-detail-name"]').should('not.be.empty');
    cy.get('[data-testid="product-detail-price"]').should('contain', '₹');
    cy.get('[data-testid="product-detail-description"]').should('be.visible');
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="cart-count"]').should('contain', '(');
  });
});
