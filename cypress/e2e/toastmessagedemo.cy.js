import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { MyInfoPage } from '../support/pages/MyInfoPage'

describe('Toast Message Validation', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const myInfoPage = new MyInfoPage()

  beforeEach(() => {
    loginPage.login()
    dashboardPage.navigateToMyInfo()
  })

  it('Verify success toast message disappears', () => {
    myInfoPage.verifyPersonalDetailsVisible()
    myInfoPage.editEmployeeId('12345')
    myInfoPage.clickSave()
    myInfoPage.verifyToastVisible()
    myInfoPage.verifyToastDisappears()
  })
})