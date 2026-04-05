Cypress.Commands.add('login', () => {
  const api = Cypress.env('apiUrl') || 'http://localhost:5000';
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
    cy.request('POST', `${api}/api/auth/login`, {
      email: user.email,
      password: user.password,
    }).then((res) => {
      expect(res.status).to.eq(200);
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('fatafat-token', res.body.token);
          win.localStorage.setItem(
            'fatafat-auth',
            JSON.stringify(res.body.user)
          );
        },
      });
    });
  });
});
