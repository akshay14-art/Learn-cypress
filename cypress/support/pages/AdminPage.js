import { BasePage } from './BasePage'

export class AdminPage extends BasePage {
  constructor() {
    super()
    this.usernameSearchField = '.oxd-input'
    this.searchButton = 'Search'
    this.tableBody = '.oxd-table-body'
    this.tableCard = '.oxd-table-card'
    this.tableCell = '.oxd-table-cell'
    this.editButton = 'button'
    this.selectDropdown = '.oxd-select-text'
    this.saveButton = 'Save'
    this.successMessage = 'Successfully Updated'
    this.adminMenuLink = 'Admin'
  }

  navigateToAdmin() {
    this.clickContains(this.adminMenuLink, { timeout: 10000 })
    this.verifyUrlContains('/admin')
    return this
  }

  searchUser(username) {
    cy.get(this.usernameSearchField, { timeout: 10000 }).eq(1).clear().type(username)
    this.clickContains(this.searchButton)
    this.verifyTableVisible()
    return this
  }

  verifyTableVisible() {
    cy.get(this.tableBody, { timeout: 10000 }).should('be.visible')
    return this
  }

  captureUserRoleFromFirstRow() {
    return cy
      .get(this.tableCard, { timeout: 10000 })
      .first()
      .find(this.tableCell)
      .eq(2)
      .invoke('text')
      .then(text => text.trim())
  }

  clickEditFirstUser() {
    cy.get(this.tableCard, { timeout: 10000 })
      .first()
      .find(this.tableCell)
      .last()  
      .find('button')
      .eq(1)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.url({ timeout: 10000 }).should('include', '/saveSystemUser')
    return this
  }

  verifyEditPageLoaded() {
    this.verifyUrlContains('/saveSystemUser')
    return this
  }

  selectUserRole(roleName) {
    cy.get(this.selectDropdown, { timeout: 10000 }).first().click()
    this.clickContains(roleName)
    return this
  }

  clickSave() {
    this.clickContains(this.saveButton)
    return this
  }

  verifySuccessMessage() {
    this.containsText(this.successMessage, { timeout: 10000 }).should('be.visible')
    return this
  }

  getUpdatedUserRole() {
    return cy
      .get(this.tableCard, { timeout: 10000 })
      .first()
      .find(this.tableCell)
      .eq(2)
      .invoke('text')
      .then(text => text.trim())
  }
}
