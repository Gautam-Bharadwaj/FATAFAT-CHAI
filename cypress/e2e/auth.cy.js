describe('Auth flow', () => {
  const api = Cypress.env('apiUrl') || 'http://localhost:5000';

  beforeEach(() => {
    cy.fixture('user').then((user) => {
      cy.request({
        method: 'POST',
        url: `${api}/api/auth/register`,
        body: {
          email: user.email,
          password: user.password,
          name: user.name,
        },
        failOnStatusCode: false,
      });
    });
  });

  it('logs in from navbar and shows user name on home', () => {
    cy.visit('/');
    cy.get('[data-testid="nav-login"]').click();
    cy.url().should('include', '/login');
    cy.fixture('user').then((user) => {
      cy.get('[data-testid="login-email"]').clear().type(user.email);
      cy.get('[data-testid="login-password"]').clear().type(user.password);
    });
    cy.get('[data-testid="login-submit"]').click();
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
    cy.get('[data-testid="nav-user-name"]').should('be.visible');
  });

  it('shows error on wrong password', () => {
    cy.visit('/login');
    cy.fixture('user').then((user) => {
      cy.get('[data-testid="login-email"]').clear().type(user.email);
      cy.get('[data-testid="login-password"]')
        .clear()
        .type('wrong-password-xyz');
    });
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="login-error"]').should('be.visible');
  });
});
