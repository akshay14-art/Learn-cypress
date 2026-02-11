import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { PIMPage } from '../support/pages/PIMPage'

describe('Employee Data Integrity Validation', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const pimPage = new PIMPage()

  beforeEach(() => {
    loginPage.login()
    dashboardPage.navigateToPIM()
    pimPage.waitForLoader()
    pimPage.verifyEmployeeInformationVisible()
  })

  it('Verify employee data remains consistent', () => {
    // Search employee
    pimPage.searchEmployee('aniket Ashok patil')
    pimPage.verifyTableRowsExist()

    // Capture employee ID from first row and open employee in one flow
    // Find the table row that contains the employee name (case-insensitive), capture ID and click it
    const employeeName = 'aniket Ashok patil'
    cy.get('.oxd-table-card', { timeout: 10000 })
      .filter((_, el) => el.innerText.toLowerCase().includes(employeeName.toLowerCase()))
      .first()
      .should('exist')
      .then($row => {
        cy.wrap($row)
          .find('.oxd-table-cell')
          .eq(1)
          .invoke('text')
          .then(text => {
            const id = text.trim()
            cy.wrap(id).as('empId')
            cy.log('Captured employee id: ' + id)
            cy.wrap($row).click()
          })
      })

    // Wait for details page and verify header
    pimPage.verifyPersonalDetailsVisible()

    // Validate ID on details page: check input value if present, otherwise search visible text
    cy.get('@empId').then(id => {
      cy.log('Verifying employee id on details page: ' + id)
      cy.get('body').then($body => {
        if ($body.find('input[name="employeeId"]').length > 0) {
          cy.get('input[name="employeeId"]', { timeout: 10000 }).should('have.value', id)
        } else {
          cy.contains(id, { timeout: 10000 }).should('be.visible')
        }
      })
    })
  })
})