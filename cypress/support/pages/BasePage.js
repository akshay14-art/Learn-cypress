export class BasePage {
  constructor() {
    this.baseUrl = 'https://opensource-demo.orangehrmlive.com/'
  }

  visit(path = '') {
    cy.visit(this.baseUrl + path)
  }

  getElement(selector) {
    return cy.get(selector)
  }

  clickElement(selector) {
    cy.get(selector).click()
  }

  fillInput(selector, value) {
    cy.get(selector).type(value)
  }

  getText(selector) {
    return cy.get(selector)
  }

  waitForLoader() {
    cy.get('.oxd-form-loader').should('not.exist')
  }

  verifyUrlContains(text) {
    cy.url().should('include', text)
  }

  verifyElementVisible(selector) {
    cy.get(selector).should('be.visible')
  }

  verifyElementExists(selector) {
    cy.get(selector).should('exist')
  }

  scrollIntoView(selector) {
    cy.get(selector).scrollIntoView().should('be.visible')
  }

  containsText(text, options = {}) {
    return cy.contains(text, options)
  }

  clickContains(text, options = {}) {
    cy.contains(text, options).click()
  }

  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('be.visible')
  }

  intercept(method, url, alias) {
    cy.intercept(method, url).as(alias)
  }

  waitForRequest(alias) {
    cy.wait(`@${alias}`)
  }

  handleException(errorMessage, shouldFail = false) {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes(errorMessage)) {
        return !shouldFail
      }
      return true
    })
  }
}
