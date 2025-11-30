/**
 * FileOperationsPage - Page Object Model for File Operations (download/upload/process)
 */

// Export a class that contains methods for testing file operations (download/upload)
export class FileOperationsPage {

  /**
   * Locates and returns the "Download Template Excel" button with visibility validation
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the add Download Template Excel button
   */
  DownloadTemplateExcel() {
    // Returns the button element that triggers Excel template download
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
    // Use Cypress task to list files in the downloads folder
    return cy.task('listFiles', Cypress.config('downloadsFolder')).then((files) => {
      // Log all available files for debugging purposes
      cy.log('Available files:', files);
      
      // Variable to store the found downloaded file
      let downloadedFile;
      
      // Handle different types of fileNamePattern: string, regex, or function
      if (typeof fileNamePattern === 'string') {
        // String pattern: check if file name includes the pattern string
        downloadedFile = files.find(file => file.includes(fileNamePattern));
      } else if (fileNamePattern instanceof RegExp) {
        // Regex pattern: test file name against the regular expression
        downloadedFile = files.find(file => fileNamePattern.test(file));
      } else if (typeof fileNamePattern === 'function') {
        // Function pattern: use custom function to match the file
        downloadedFile = files.find(fileNamePattern);
      }
      
      // Assert that a matching file was found
      expect(downloadedFile).to.exist;
      // Log success message with the found file name
      cy.log(`✅ Found downloaded file: ${downloadedFile}`);
      
      // If alias parameter provided, store the filename as an alias for later use
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
    // Construct full file path by combining downloads folder and file name
    const downloadsFolder = Cypress.config('downloadsFolder');
    const filePath = `${downloadsFolder}/${fileName}`;
    
    // Use Cypress task to read and parse the Excel file
    return cy.task('readExcelFile', filePath).then((data) => {
      // Log the actual headers found in the Excel file for debugging
      cy.log('Excel file headers found:', data.headers);
      // Log the expected columns for comparison
      cy.log('Expected columns:', expectedColumns);
      
      // Loop through each expected column and verify it exists in the file headers
      expectedColumns.forEach(column => {
        // Assert that each expected column is included in the actual headers
        expect(data.headers).to.include(column, `Column "${column}" should exist in the Excel file`);
      });
      
      // Log success message with all verified columns
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
    // Find the file input element and use cypress-file-upload plugin to attach the file
    // The attachFile command comes from the cypress-file-upload plugin
    cy.get('input[type="file"]').attachFile(fileName);
  }

}

/**
 * Pre-initialized instance of FileOperationsPage for immediate use in step definitions
 * 
 * @type {FileOperationsPage}
 */
// Create and export a singleton instance for easy import and use in test files
export const fileOperationsPage = new FileOperationsPage();