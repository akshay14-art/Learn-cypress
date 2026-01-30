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
    this.containsText('Dashboard').should('be.visible')
    return this
  }
}
