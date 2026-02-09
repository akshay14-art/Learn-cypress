import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  constructor() {
    super()
    this.usernameField = 'input[name="username"]'
    this.passwordField = 'input[name="password"]'
    this.loginButton = 'button[type="submit"]'
    this.loginHeader = 'h5'
  }

  navigate() {
    this.visit()
    return this
  }

  verifyLoginPageVisible() {
    cy.contains('Login', { timeout: 10000 }).should('be.visible')
    return this
  }

  enterUsername(username) {
    this.waitForElement(this.usernameField)
    this.fillInput(this.usernameField, username)
    return this
  }

  enterPassword(password) {
    this.waitForElement(this.passwordField)
    this.fillInput(this.passwordField, password)
    return this
  }

  clickLogin() {
    this.clickElement(this.loginButton)
    return this
  }

  verifyLoginSuccess() {
    this.verifyUrlContains('/dashboard')
    return this
  }

  login(username = 'Admin', password = 'admin123') {
    this.navigate()
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLogin()
    this.verifyLoginSuccess()
    return this
  }

  verifyPasswordMasked() {
    this.getElement(this.passwordField).should('have.attr', 'type', 'password')
    return this
  }
}
