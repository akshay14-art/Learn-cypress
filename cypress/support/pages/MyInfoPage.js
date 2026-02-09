import { BasePage } from './BasePage'

export class MyInfoPage extends BasePage {
  constructor() {
    super()
    this.personalDetailsHeader = 'Personal Details'
    this.employeeImageSelector = '.employee-image'
    this.uploadButtonSelector = '[role="button"]'
    this.fileInput = 'input[type="file"]'
    this.saveButton = 'Save'
    this.successMessage = 'Successfully Updated'
    this.middleNameField = 'input[name="middleName"]'
    this.employeeIdField = 'input[name="employeeId"]'
  }

  verifyPersonalDetailsVisible() {
    cy.contains(this.personalDetailsHeader, { timeout: 10000 }).should('be.visible')
    return this
  }

  waitForPageLoad() {
    this.waitForLoader()
    return this
  }

  getFileInputCount() {
    return cy.get('body').then(($body) => {
      const fileInputs = $body.find(this.fileInput)
      cy.log(`Found ${fileInputs.length} file inputs`)
      return fileInputs.length
    })
  }

  clickProfileUploadArea() {
    return cy.get('body').then(($body) => {
      if ($body.find(this.employeeImageSelector).length > 0) {
        cy.get(this.employeeImageSelector).first().click({ force: true })
      } else if ($body.find(this.uploadButtonSelector).contains('upload').length > 0) {
        cy.contains('upload', { matchCase: false }).click({ force: true })
      } else {
        cy.log('No upload button found, attempting direct file input')
      }
    })
  }

  selectProfileImage(filePath) {
    cy.get(this.fileInput, { timeout: 10000 }).selectFile(filePath, {
      force: true
    })
    return this
  }

  waitForFileProcess() {
    cy.wait(2000)
    return this
  }

  clickSave() {
    cy.contains(this.saveButton).click({ force: true })
    return this
  }

  verifyUploadSuccess() {
    this.containsText(this.successMessage, { timeout: 10000 }).should(
      'be.visible'
    )
    return this
  }

  verifyToastVisible() {
    cy.contains('Success').should('be.visible')
    return this
  }

  verifyToastDisappears() {
    cy.contains('Success', { timeout: 10000 }).should('not.exist')
    return this
  }

  editMiddleName(name) {
    cy.get(this.middleNameField).type(name, { force: true })
    return this
  }

  editEmployeeId(id) {
    cy.get(this.employeeIdField).clear({ force: true }).type(id, { force: true })
    return this
  }

  uploadProfilePicture(filePath) {
    this.verifyPersonalDetailsVisible()
    this.waitForPageLoad()
    this.getFileInputCount()
    this.clickProfileUploadArea()
    this.selectProfileImage(filePath)
    this.waitForFileProcess()
    this.clickSave()
    this.verifyUploadSuccess()
    return this
  }
}
