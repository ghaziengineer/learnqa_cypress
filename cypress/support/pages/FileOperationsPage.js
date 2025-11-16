/**
 * FileOperationsPage - Page Object Model for File Operations (download/upload/process)
 */

export class FileOperationsPage {

  /**
   * Locates and returns the "Download Template Excel" button with visibility validation
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the add Download Template Excel button
   */
  DownloadTemplateExcel() {
    return cy.get('#download-template');
  }

 /**
   * Verifies that a file has been downloaded successfully
   * 
   * @param {string|RegExp|Function} fileNamePattern - Pattern to match the downloaded file
   * @param {string|null} expectedContent - Optional content to verify in the file
   * @param {string|null} alias - Optional alias to store the filename for later use
   * @returns {Cypress.Chainable} - Chainable Cypress object with the downloaded filename
   */
  verifyDownload(fileNamePattern, alias = null) {
    return cy.task('listFiles', Cypress.config('downloadsFolder')).then((files) => {
      cy.log('Available files:', files);
      
      let downloadedFile;
      
      if (typeof fileNamePattern === 'string') {
        downloadedFile = files.find(file => file.includes(fileNamePattern));
      } else if (fileNamePattern instanceof RegExp) {
        downloadedFile = files.find(file => fileNamePattern.test(file));
      } else if (typeof fileNamePattern === 'function') {
        downloadedFile = files.find(fileNamePattern);
      }
      
      expect(downloadedFile).to.exist;
      cy.log(`✅ Found downloaded file: ${downloadedFile}`);
      
      if (alias) {
        cy.wrap(downloadedFile).as(alias);
      }
    });
  }

/**
 * Verifies that expected columns exist in the Excel file
 * 
 * @param {string} fileName - The downloaded file name
 * @param {string[]} expectedColumns - Array of expected column names
 */
verifyExcelColumns(fileName, expectedColumns) {
  const downloadsFolder = Cypress.config('downloadsFolder');
  const filePath = `${downloadsFolder}/${fileName}`;
  
  return cy.task('readExcelFile', filePath).then((data) => {
    cy.log('Excel file headers found:', data.headers);
    cy.log('Expected columns:', expectedColumns);
    
    expectedColumns.forEach(column => {
      expect(data.headers).to.include(column, `Column "${column}" should exist in the Excel file`);
    });
    
    cy.log(`✅ All expected columns exist: ${expectedColumns.join(', ')}`);
  });
}

/**
 * Uploads the specified file of any type (Excel, image, PDF, doc, etc)
 *
 * @param {string} fileName - The name of the file to upload
 * @param {string} [fileType] - Optional type of the file (e.g., 'excel', 'image', 'pdf', 'doc')
 */
uploadFile(fileName, fileType = null) {
  cy.get('input[type="file"]').attachFile(fileName);
}


}
/**
 * Pre-initialized instance of FileOperationsPage for immediate use in step definitions
 * 
 * @type {FileOperationsPage}
 */
export const fileOperationsPage = new FileOperationsPage();