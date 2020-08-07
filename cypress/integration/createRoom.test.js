describe('Basics', () => {
  it('Can create a room', () => {
    cy.visit('/')
    cy.contains('Get started').click()

    cy.get('.controls .btn-primary').should('be.disabled')
    cy.get('input[name=name]').type('Test room')
    cy.get('.controls .btn-primary').should('not.be.disabled')
    cy.get('.controls .btn-primary').click()

    cy.get('.copy-link').invoke('val').should('match', /http:\/\/localhost:8000\/room/)
    cy.contains('Create room').click()

    cy.get('.setup-user-name h1', {timeout: 10_000}).invoke('text').should('match', /What\'s your name/)
    cy.url().should('include', 'http://localhost:8000/room')
  })
})
