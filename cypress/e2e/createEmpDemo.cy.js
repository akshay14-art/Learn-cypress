describe('Create Employee profile', () => {

    beforeEach(() => {
      // Login reusable logic
      cy.visit('https://opensource-demo.orangehrmlive.com/')
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/dashboard')
    })
  
    it('Verify user can select dropdown and scroll', () => {
  
      // Navigate to PIM
      cy.contains('PIM').click()
  
      cy.contains('Employee Information').should('be.visible')
  
      // Scroll to button
      cy.contains('Add').scrollIntoView().should('be.visible').click()
  
      // Verify Add Employee page
      cy.contains('Add Employee').should('be.visible')
  
      // Wait for form loader to disappear
      cy.get('.oxd-form-loader').should('not.exist')
  
      // Enter employee details
      cy.get('input[name="firstName"]').type('Akshay')
      cy.get('input[name="lastName"]').type('Automation')
  
      // Intercept the save API call
      cy.intercept('POST', '**/api/v2/pim/employees').as('saveEmployee')
      cy.contains('Save').click()
      
      // Wait for the save request to complete
      cy.wait('@saveEmployee')
      
      // Wait for the page to load and the loader to disappear
      cy.get('.oxd-form-loader').should('not.exist')
      
      // Wait for Personal Details to be visible
      cy.contains('Personal Details', {timeout: 10000}).should('be.visible')
    })
  })
  