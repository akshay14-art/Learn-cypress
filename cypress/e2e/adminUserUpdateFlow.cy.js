import { LoginPage } from '../support/pages/LoginPage'
import { DashboardPage } from '../support/pages/DashboardPage'
import { AdminPage } from '../support/pages/AdminPage'

describe('OrangeHRM Admin User Update Full Flow', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const adminPage = new AdminPage()

  it('Login and Update User Role in one complete flow', () => {
    // Step 1 & 2: Login
    loginPage.login()

    // Step 3: Navigate to Admin Module
    adminPage.navigateToAdmin()

    // Step 4: Search for Admin User
    adminPage.searchUser('Admin')

    // Step 5: Capture Current User Role
    adminPage.captureUserRoleFromFirstRow().as('currentRole')

    // Step 6: Click Edit Button
    adminPage.clickEditFirstUser()
    adminPage.verifyEditPageLoaded()

    // Step 7: Change User Role
    adminPage.selectUserRole('ESS')

    // Step 8: Save changes and validate success
    adminPage.clickSave()
    adminPage.verifySuccessMessage()
  })
})
