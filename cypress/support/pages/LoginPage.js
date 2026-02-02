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
    this.getText(this.loginHeader).should('contain.text', 'Login')
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
}
