const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    env: {
      apiUrl: 'http://localhost:5000',
    },
    setupNodeEvents() {
      // extend with tasks if needed
    },
  },
});
