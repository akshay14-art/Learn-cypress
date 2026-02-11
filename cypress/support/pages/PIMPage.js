import { BasePage } from './BasePage'

export class PIMPage extends BasePage {
  constructor() {
    super()
    this.employeeInfoHeader = 'Employee Information'
    this.addButton = 'Add'
    this.addEmployeeHeader = 'Add Employee'
    this.firstNameField = 'input[name="firstName"]'
    this.lastNameField = 'input[name="lastName"]'
    this.saveButton = 'Save'
    this.personalDetailsHeader = 'Personal Details'
    this.searchInput = 'input[placeholder="Type for hints..."]'
    this.searchButton = 'Search'
    this.resetButton = 'Reset'
    this.nextPageButton = 'button[aria-label="Next Page"]'
    this.tableBody = '.oxd-table-body'
    this.tableCard = '.oxd-table-card'
    this.tableCell = '.oxd-table-cell'
    this.viewDetailsUrl = '/viewPersonalDetails'
  }

  verifyEmployeeInformationVisible() {
    this.containsText(this.employeeInfoHeader, { timeout: 10000 }).should('be.visible')
    return this
  }

  clickAddButton() {
    cy.contains('button', this.addButton).scrollIntoView().should('be.visible').click()
    return this
  }

  verifyAddEmployeePageVisible() {
    this.containsText(this.addEmployeeHeader).should('be.visible')
    return this
  }

  waitForFormLoader() {
    this.waitForLoader()
    return this
  }

  enterFirstName(firstName) {
    this.fillInput(this.firstNameField, firstName)
    return this
  }

  enterLastName(lastName) {
    this.fillInput(this.lastNameField, lastName)
    return this
  }

  interceptSaveEmployee() {
    this.intercept('POST', '**/api/v2/pim/employees', 'saveEmployee')
    return this
  }

  clickSave() {
    this.clickContains(this.saveButton)
    return this
  }

  waitForSave() {
    this.waitForRequest('saveEmployee')
    return this
  }

  verifyPersonalDetailsVisible() {
    this.waitForLoader()
    cy.contains(this.personalDetailsHeader, { timeout: 10000 }).should('be.visible')
    return this
  }

  createEmployee(firstName, lastName) {
    this.verifyEmployeeInformationVisible()
    this.clickAddButton()
    this.verifyAddEmployeePageVisible()
    this.waitForFormLoader()
    this.enterFirstName(firstName)
    this.enterLastName(lastName)
    this.interceptSaveEmployee()
    this.clickSave()
    this.waitForSave()
    this.verifyPersonalDetailsVisible()
    return this
  }

  searchEmployee(employeeName) {
    cy.get(this.searchInput, { timeout: 10000 }).first().type(employeeName)
    this.clickContains(this.searchButton)
    return this
  }

  clickReset() {
    this.clickContains(this.resetButton)
    return this
  }

  goToNextPageIfEnabled() {
    cy.get('body').then($body => {
      if ($body.find(this.nextPageButton).length > 0) {
        cy.get(this.nextPageButton).then($btn => {
          if ($btn.is(':enabled')) {
            cy.wrap($btn).click()
          }
        })
      }
    })
    return this
  }

  verifySearchInputCleared() {
    cy.get(this.searchInput).first().should('have.value', '')
    return this
  }

  verifyTableVisible() {
    cy.get(this.tableBody).should('be.visible')
    return this
  }

  verifyTableRowsExist() {
    cy.get(this.tableCard, { timeout: 10000 }).its('length').should('be.gt', 0)
    return this
  }

  verifyTableCellNotEmpty(rowIndex = 0, cellIndex = 2) {
    cy.get(this.tableCard)
      .eq(rowIndex)
      .find(this.tableCell)
      .eq(cellIndex)
      .should('not.be.empty')
    return this
  }

  clickFirstEmployeeRow() {
    cy.get(this.tableCard, { timeout: 10000 }).first().should('be.visible').click()
    return this
  }

  getFirstEmployeeId() {
    return cy
      .get(this.tableCard, { timeout: 10000 })
      .first()
      .find(this.tableCell)
      .eq(1)
      .invoke('text')
  }

  verifyViewDetailsPage() {
    this.verifyUrlContains(this.viewDetailsUrl)
    return this
  }
}
