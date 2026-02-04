import { LoginPage } from '../support/pages/LoginPage'

describe('Password Masking Validation', () => {
  let loginPage

  beforeEach(() => {
    loginPage = new LoginPage()
  })

  it('Verify password field is masked', () => {
    loginPage.navigate()
    loginPage.verifyPasswordMasked()
  })
})