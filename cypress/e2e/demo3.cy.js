import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { PIMPage } from '../support/pages/PIMPage'

describe('Table Handling', () => {
  let loginPage
  let dashboardPage
  let pimPage

  beforeEach(() => {
    loginPage = new LoginPage()
    dashboardPage = new DashboardPage()
    pimPage = new PIMPage()

    loginPage.login()
    dashboardPage.navigateToPIM()
  })

  it('Verify employee search result from table', () => {
    pimPage.searchEmployee('Paul')
    pimPage.verifyTableVisible()
    pimPage.verifyTableRowsExist()
    pimPage.verifyTableCellNotEmpty()
    pimPage.clickFirstTableRowAction()
    pimPage.verifyViewDetailsPage()
  })
})
