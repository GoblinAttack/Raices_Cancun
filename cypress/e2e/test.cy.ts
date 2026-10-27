describe('Raíces Cancún', () => {
  it('Redirige la raíz a /inicio', () => {
    cy.visit('/')
    cy.url().should('include', '/inicio')
    cy.contains('ion-title', 'Raíces Cancún')
  })
})
