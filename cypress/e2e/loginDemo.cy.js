import { LoginPage } from '../support/pages/LoginPage'

describe('Login Functionality', () => {
  let loginPage

  beforeEach(() => {
    loginPage = new LoginPage()
  })

  it('Verify user can login successfully', () => {
    loginPage.navigate()
    loginPage.verifyLoginPageVisible()
    loginPage.enterUsername('Admin')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()
    loginPage.verifyLoginSuccess()
  })
})
  