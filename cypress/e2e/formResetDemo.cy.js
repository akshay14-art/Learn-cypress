import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { PIMPage } from '../support/pages/PIMPage'

describe('Form Reset Validation', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const pimPage = new PIMPage()

  beforeEach(() => {
    loginPage.login()
    dashboardPage.navigateToPIM()
  })

  it('Verify Reset button clears search filters', () => {
    pimPage.searchEmployee('Paul')
    pimPage.clickReset()
    pimPage.verifySearchInputCleared()
  })
})