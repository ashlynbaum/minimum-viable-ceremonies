describe('Create user', () => {
  it('Can create a user', () => {
    cy.seedRoom({
      uuid: 'test-room-uuid',
      name: 'Example room'
    })
    cy.visit('/room/test-room-uuid')
    cy.contains('What\'s your name?')
    cy.get('.controls .btn-primary').should('be.disabled')
    cy.get('input[name=username]').type('Barbara Smith')
    cy.get('.controls .btn-primary').should('not.be.disabled')
    cy.get('.controls .btn-primary').click()

    cy.contains('Pick a role')
    cy.get('.controls .btn-primary').should('be.disabled')
    cy.contains('Actioner').click()
    cy.get('.controls .btn-primary').should('not.be.disabled')
    cy.get('.controls .btn-primary').click()

    cy.contains('You\'re all set up!')
    cy.get('.controls .btn-primary').click()

    cy.get('.board-title').invoke('text').should('match', /Minimum Viable Ceremonies/)
    cy.get('.sidebar-title').invoke('text').should('match', /Example room/)
    cy.get('.participant-name').invoke('text').should('match', /Barbara Smith/)
    cy.get('.participant-roles').invoke('text').should('match', /Actioner/)
  })
})
