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
 * Verifies that required columns exist in the Excel file
 * 
 * @param {string} fileName - The downloaded file name
 * @param {string[]} requiredColumns - Array of required column names
 */
verifyExcelColumns(fileName, requiredColumns = ['ID', 'Name', 'Email', 'Score', 'Date']) {
  const downloadsFolder = Cypress.config('downloadsFolder');
  const filePath = `${downloadsFolder}/${fileName}`;
  
  return cy.task('readExcelFile', filePath).then((data) => {
    cy.log('Excel file headers found:', data.headers);
    
    // Check if all required columns exist
    requiredColumns.forEach(column => {
      expect(data.headers).to.include(column, `Column "${column}" should exist in the Excel file`);
    });
    
    cy.log(`✅ All required columns exist: ${requiredColumns.join(', ')}`);
    
    // Optional: Also verify there is data in the file
    expect(data.rows.length).to.be.greaterThan(0, 'Excel file should contain data rows');
    cy.log(`✅ Excel file contains ${data.rows.length} rows of data`);
  });
}




}

/**
 * Pre-initialized instance of FileOperationsPage for immediate use in step definitions
 * 
 * @type {FileOperationsPage}
 */
export const fileOperationsPage = new FileOperationsPage();