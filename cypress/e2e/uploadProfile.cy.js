
describe('File Upload', () => {

  beforeEach(() => {
    // Handle uncaught exceptions from the application
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent Cypress from failing the test
      if (err.message.includes('Request failed with status code 500')) {
        return false
      }
      return true
    })
    
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]', {timeout: 10000}).type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })

  it('Verify user can upload profile picture', () => {

    // Navigate to My Info
    cy.contains('My Info').click()
    cy.contains('Personal Details', {timeout: 10000}).should('be.visible')

    // Wait for the page to fully load
    cy.get('.oxd-form-loader').should('not.exist')

    // Log all file inputs for debugging
    cy.get('body').then(($body) => {
      const fileInputs = $body.find('input[type="file"]')
      cy.log(`Found ${fileInputs.length} file inputs`)
    })

    // Try to find and click the profile image/upload area
    cy.get('body').then(($body) => {
      // Look for clickable image elements
      if ($body.find('.employee-image').length > 0) {
        cy.get('.employee-image').first().click({force: true})
      } else if ($body.find('[role="button"]').contains('upload').length > 0) {
        cy.contains('upload', {matchCase: false}).click({force: true})
      } else {
        // Try direct file input
        cy.log('No upload button found, attempting direct file input')
      }
    })

    // Now select the file - use {visible: false} since it's likely hidden
    cy.get('input[type="file"]', {timeout: 10000}).selectFile('cypress/fixtures/profile.png', { force: true })

    // Wait a moment for the file to be processed
    cy.wait(2000)

    // Save changes
    cy.contains('Save').click()

    // Wait for success message
    cy.contains('Successfully Updated', {timeout: 10000}).should('be.visible')
  })
})
