import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { PIMPage } from '../support/pages/PIMPage'

describe('OrangeHRM Full E2E Demo Test', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const pimPage = new PIMPage()

  it('Login and Create + Verify Employee in one flow', () => {

    // Step 1: Login
    loginPage.login()

    // Step 2: Navigate to PIM
    dashboardPage.navigateToPIM()

    // Step 3: Create Employee with unique name
    pimPage.verifyEmployeeInformationVisible()
    pimPage.clickAddButton()
    pimPage.verifyAddEmployeePageVisible()
    pimPage.waitForFormLoader()

    const firstName = 'Cypress'
    const lastName = 'Tester' + Date.now()

    pimPage.enterFirstName(firstName)
    pimPage.enterLastName(lastName)
    pimPage.captureEmployeeId()
    pimPage.clickSave()

    // Step 4: Verify Personal Details Page
    pimPage.verifyPersonalDetailsVisible()
    pimPage.verifyFirstName(firstName)
    pimPage.verifyLastName(lastName)

    // Step 5: Navigate Back to Employee List & Search
    pimPage.navigateToEmployeeList()
    pimPage.searchEmployee(firstName)

    // Step 6: Validate Employee Appears in Table
    pimPage.verifyEmployeeInTable(firstName)
    pimPage.verifyEmployeeIdInTable()
  })
})