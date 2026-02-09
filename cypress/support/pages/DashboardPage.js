import { BasePage } from './BasePage'

export class DashboardPage extends BasePage {
  constructor() {
    super()
  }

  navigateToPIM() {
    this.clickContains('PIM')
    return this
  }

  navigateToMyInfo() {
    this.clickContains('My Info')
    return this
  }

  verifyDashboardVisible() {
    this.containsText('Dashboard', { timeout: 30000 }).should('be.visible')
    return this
  }

  openUserDropdown() {
    this.waitForElement('.oxd-userdropdown-name')
    this.clickElement('.oxd-userdropdown-name')
    return this
  }

  clickLogout() {
    this.containsText('Logout').click()
    return this
  }

  logout() {
    this.openUserDropdown()
    this.clickLogout()
    return this
  }
}
