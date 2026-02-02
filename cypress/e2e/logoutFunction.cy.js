import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'

describe('Logout Functionality', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })

  beforeEach(() => {
    loginPage.login()
  })

  it('Verify user can logout successfully', () => {
    dashboardPage.logout()

    // Assertion
    cy.url().should('include', '/auth/login')
    cy.contains('Login').should('be.visible')
  })
})