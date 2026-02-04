import { LoginPage } from '../support/pages/LoginPage'

describe('Unauthorized Access Validation', () => {
  let loginPage

  beforeEach(() => {
    loginPage = new LoginPage()
  })

  it('Verify user cannot access dashboard without login', () => {
    // Directly hit protected URL
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

    // Verify redirected to login page
    loginPage.verifyLoginPageVisible()
    loginPage.verifyUrlContains('/auth/login')
  })
})