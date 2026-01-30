import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { PIMPage } from '../support/pages/PIMPage'

describe('Create Employee profile', () => {
  let loginPage
  let dashboardPage
  let pimPage

  beforeEach(() => {
    loginPage = new LoginPage()
    dashboardPage = new DashboardPage()
    pimPage = new PIMPage()

    loginPage.login()
  })

  it('Verify user can select dropdown and scroll', () => {
    dashboardPage.navigateToPIM()
    pimPage.createEmployee('Akshay', 'Automation')
  })
})
  