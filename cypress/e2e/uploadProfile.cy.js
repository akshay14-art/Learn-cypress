import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { MyInfoPage } from '../support/pages/MyInfoPage'

describe('File Upload', () => {
  let loginPage
  let dashboardPage
  let myInfoPage

  beforeEach(() => {
    loginPage = new LoginPage()
    dashboardPage = new DashboardPage()
    myInfoPage = new MyInfoPage()

    cy.handleException('Request failed with status code 500')
    loginPage.login()
  })

  it('Verify user can upload profile picture', () => {
    dashboardPage.navigateToMyInfo()
    myInfoPage.uploadProfilePicture('cypress/fixtures/profile.png')
  })
})
