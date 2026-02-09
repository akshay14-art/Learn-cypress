import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'

describe('Session Handling Validation', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()

  it('Verify session persists on refresh and ends after clearing cookies', () => {
    // Login
    loginPage.navigate()
      .enterUsername('Admin')
      .enterPassword('admin123')
      .clickLogin()
      .verifyLoginSuccess()

    // Refresh page
    cy.reload()

    // Session should still be active
    dashboardPage.verifyDashboardVisible()

    // Clear cookies & storage
    cy.clearCookies()
    cy.clearLocalStorage()

    // Reload again
    cy.reload()

    // Should redirect to login
    cy.url().should('include', '/auth/login')
    loginPage.verifyLoginPageVisible()
  })
})