describe('OrangeHRM - Employee API + UI Validation', () => {

  beforeEach(() => {
    // Direct login without session caching to ensure credentials are entered
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
    cy.get('input[name="username"]', { timeout: 10000 }).type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    cy.url({ timeout: 10000 }).should('include', '/dashboard')
    cy.contains('PIM', { timeout: 10000 }).should('exist')
  })

  it('Validate Employee List from API and UI', () => {
    // Set up intercept BEFORE navigating
    cy.intercept('GET', '**/api/v2/pim/employees*').as('getEmployees')

    // Navigate to PIM employee list
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')

    // Wait for API response and table to load
    cy.wait('@getEmployees', { timeout: 15000 }).then((interception) => { 
      expect(interception.response.statusCode).to.eq(200)

      const apiEmployeeCount = interception.response.body.data.length

      // Validate UI row count matches API count
      cy.get('.oxd-table-body .oxd-table-row', { timeout: 10000 })
        .should('have.length', apiEmployeeCount)
    })
  })

})