describe('Login Functionality', () => {

    it('Verify user can login successfully', () => {
  
      // Launch application
      cy.visit('https://opensource-demo.orangehrmlive.com/')
  
      // Verify login page is visible
      cy.get('h5').should('contain.text', 'Login')
  
      // Enter username
      cy.get('input[name="username"]')
        .should('be.visible')
        .type('Admin')
  
      // Enter password
      cy.get('input[name="password"]')
        .should('be.visible')
        .type('admin123')
  
      // Click login button
      cy.get('button[type="submit"]').click()
  
      // Verify dashboard URL
      cy.url().should('include', '/dashboard')
  
      // Verify dashboard header
      cy.contains('Dashboard').should('be.visible')
    })
  })
  