describe('Login', () => {
  it('shows login screen', () => {
    cy.server({force404: true});

    cy.visit('/');
    cy.contains('Log in');
  });

    it('shows logged in', () => {
        cy.server({force404: true});

        cy.visit('/');
        cy.get('.login__username').type('admin');
        cy.get('.login__password').type('qwerty');
        cy.get('.login__login').click();
        cy.contains('Logged in');
    });
});
