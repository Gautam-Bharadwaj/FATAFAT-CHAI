describe('Checkout flow', () => {
  beforeEach(() => {
    cy.exec('node seed.js', {
      cwd: 'server',
      env: {
        MONGO_URI:
          Cypress.env('mongoUri') || 'mongodb://localhost:27017/fatafat-chai',
      },
      failOnNonZeroExit: false,
    });
    cy.login();
  });

  it('shows cart lines and completes checkout form', () => {
    cy.visit('/products');
    cy.get('[data-testid^="product-card-wrap-"]').eq(0).click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.visit('/products');
    cy.get('[data-testid^="product-card-wrap-"]').eq(1).click();
    cy.get('[data-testid="add-to-cart"]').click();

    cy.visit('/cart');
    cy.get('[data-testid="cart-item"]').should('have.length.at.least', 1);
    cy.get('[data-testid="cart-subtotal"]').should('contain', '₹');

    cy.get('[data-testid="checkout-link"]').click();
    cy.get('[data-testid="checkout-address"]').type('123 Tea Street, Mumbai');
    cy.get('[data-testid="checkout-submit"]').click();
    cy.get('[data-testid="order-confirmation"]').should('be.visible');
  });
});
