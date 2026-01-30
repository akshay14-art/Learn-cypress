import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { PIMPage } from './pages/PIMPage'
import { MyInfoPage } from './pages/MyInfoPage'

// Login command
Cypress.Commands.add('login', (username = 'Admin', password = 'admin123') => {
  const loginPage = new LoginPage()
  loginPage.login(username, password)
})

// Navigate to PIM command
Cypress.Commands.add('navigateToPIM', () => {
  const dashboardPage = new DashboardPage()
  dashboardPage.navigateToPIM()
})

// Navigate to My Info command
Cypress.Commands.add('navigateToMyInfo', () => {
  const dashboardPage = new DashboardPage()
  dashboardPage.navigateToMyInfo()
})

// Create employee command
Cypress.Commands.add('createEmployee', (firstName, lastName) => {
  const pimPage = new PIMPage()
  pimPage.createEmployee(firstName, lastName)
})

// Search employee command
Cypress.Commands.add('searchAndViewEmployee', (employeeName) => {
  const pimPage = new PIMPage()
  pimPage.searchEmployee(employeeName)
  pimPage.verifyTableVisible()
  pimPage.verifyTableRowsExist()
  pimPage.verifyTableCellNotEmpty()
  pimPage.clickFirstTableRowAction()
  pimPage.verifyViewDetailsPage()
})

// Upload profile picture command
Cypress.Commands.add('uploadProfilePicture', (filePath) => {
  const myInfoPage = new MyInfoPage()
  myInfoPage.uploadProfilePicture(filePath)
})

// Handle exception command
Cypress.Commands.add('handleException', (errorMessage) => {
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes(errorMessage)) {
      return false
    }
    return true
  })
})