describe('Edit ceremony', () => {
  beforeEach(() => {
    cy.seedRoom('default').then(() => {
      cy.setCookie('test-room-uuid', 'test-participant-uuid')
      cy.visit('/room/test-room-uuid')
      cy.contains('Personal Check-in').click()
    })
  })

  it('Can make a placement via the modal', () => {
    cy.get('.mvc-input__cadence').click().find('input').focus()
    cy.focused().type('{downarrow}{enter}', {force:true})
    cy.contains('Back').click()
    cy.get('.cadence.daily').contains('Personal Check-in')

    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.ceremonies.checkin.placement, 'daily')
    })
  })

  it('Can add attendees', () => {
    cy.get('.mvc-input__people').click().find('input').focus()
    cy.focused().type('{downarrow}{enter}', {force:true})
    cy.contains('Back').click()

    cy.wait(500)
    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.ceremonies.checkin.people[0].value, 'test-participant-uuid')
    })
  })

  it('Can add notes', () => {
    cy.get('.mvc-input__notes').find('textarea').type('Some notes')

    cy.wait(500)
    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.ceremonies.checkin.notes, 'Some notes')
    })
  })

  it('Can add a time for synchronous meetings', () => {
    cy.get('.mvc-input__async').contains('Yes (Synchronous)').click()
    cy.get('.mvc-input__cadence').click().find('input').focus()
    cy.focused().type('{downarrow}{enter}', {force:true})

    cy.get('.mvc-input__start-time').click().find('input').focus()
    cy.focused().type('{downarrow}{enter}', {force:true})

    cy.wait(500)
    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.ceremonies.checkin.startTime, 15) // 12:15am :P
      assert.equal(room.ceremonies.checkin.endTime, 75) // 60 minute meetings by default
    })
  })

  it('Can make a custom ceremony', () => {
    cy.contains('Back').click()
    cy.contains('Add custom').click()
    cy.get('input[name=title]').type('Test title')
    cy.get('input[name=subheading]').type('Test subheading')
    cy.get('textarea[name=description]').type('Test description')
    cy.contains('Save').click()

    cy.get('.ReactModal__Content .custom-card')
    cy.contains('Back').click()

    cy.fetchRoom('test-room-uuid').then(room => {
      const ceremony = Object.values(room.ceremonies).find(({ custom }) => custom)
      assert.equal(ceremony.title, 'Test title')
      assert.equal(ceremony.subheading, 'Test subheading')
      assert.equal(ceremony.description, 'Test description')
      assert.equal(ceremony.placement, 'undecided')
    })
  })
})
