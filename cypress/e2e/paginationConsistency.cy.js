import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { PIMPage } from '../support/pages/PIMPage'

describe('Pagination and Filter Consistency', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const pimPage = new PIMPage()

  beforeEach(() => {
    loginPage.login()
    dashboardPage.navigateToPIM()
  })

  it('Verify filter persists across pagination', () => {
    pimPage.searchEmployee('Linda')
    pimPage.verifyTableRowsExist()
    pimPage.goToNextPageIfEnabled()
    pimPage.verifyTableRowsExist()
  })
})