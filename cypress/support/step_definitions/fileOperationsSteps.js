import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fileOperationsPage } from "../pages/FileOperationsPage";

/**
 * Verifies that the template Excel file has been downloaded successfully
 * Uses regex pattern matching to identify the downloaded template file
 * Aliases the downloaded file for use in subsequent verification steps
 * 
 * @example
 * Then the template Excel file should be downloaded successfully
 */
Then('the template Excel file should be downloaded successfully', () => {
  fileOperationsPage.verifyDownload(/^template.*\.xlsx$/, 'downloadedTemplateFile');
})

/**
 * Validates that the downloaded Excel file contains all expected columns
 * Compares the actual column structure against provided expected columns
 * Requires a previous download step that sets the file alias
 * 
 * @param {DataTable} dataTable - Table containing expected column names
 * @example
 * Then the file should contain the expected columns:
 *   | Column Name 1 |
 *   | Column Name 2 |
 *   | Column Name 3 |
 */
Then('the file should contain the expected columns:', (dataTable) => {
  const expectedColumns = dataTable.rawTable.map(row => row[0]);
  
  cy.get('@downloadedTemplateFile').then((fileName) => {
    fileOperationsPage.verifyExcelColumns(fileName, expectedColumns);
  });
});


/**
 * Handles file selection for upload operations using data table parameters
 * Supports multiple data table formats (vertical and horizontal)
 * Validates file type and name before initiating upload process
 * 
 * @param {DataTable} dataTable - Data table specifying file type and name
 * @throws {Error} When file type is not 'excel' or file name is undefined
 * @example
 * Then I select a valid file
 *   | excel |
 *   | test_data.xlsx |
 */
Then('I select a valid file', (dataTable) => {
  // Extract file type and file name from the data table
  const rows = dataTable.rawTable;
  // Support both vertical and horizontal table formats
  let fileType, fileName;
  if (rows[0][0].toLowerCase() === 'excel') {
    fileType = rows[0][0].toLowerCase();
    fileName = rows[1][0];
  } else {
    // If table is horizontal, e.g. | type | name |
    fileType = rows[0][0].toLowerCase();
    fileName = rows[0][1];
  }

  // Only proceed if fileType is 'excel' and fileName is defined
  if (fileType === 'excel' && fileName) {
    fileOperationsPage.uploadFile(fileName);
  } else {
    throw new Error('Invalid file type or file name in data table');
  }
});

/**
 * Alternative file selection step definition with colon syntax
 * Provides additional data table format validation and error handling
 * Maintains compatibility with different Gherkin step styling preferences
 * 
 * @param {DataTable} dataTable - Data table specifying file type and name
 * @throws {Error} When data table format is unrecognized or parameters are invalid
 * @example
 * Then I select a valid file :
 *   | excel |
 *   | sample_data.xlsx |
 */
Then('I select a valid file :', function (dataTable) {
  // Extract file type and file name from the data table
  const rows = dataTable.rawTable;
  let fileType, fileName;
  // Support vertical and horizontal table formats
  if (rows.length === 2 && rows[0][0].toLowerCase() === 'excel') {
    fileType = rows[0][0].toLowerCase();
    fileName = rows[1][0];
  } else if (rows.length === 1 && rows[0].length === 2) {
    fileType = rows[0][0].toLowerCase();
    fileName = rows[0][1];
  } else {
    throw new Error('Unrecognized data table format for file selection');
  }

  // Only proceed if fileType is 'excel' and fileName is defined
  if (fileType === 'excel' && fileName) {
    fileOperationsPage.uploadFile(fileName);
  } else {
    throw new Error('Invalid file type or file name in data table');
  }
});

/**
 * Verifies successful file upload by checking for success message in the UI
 * Confirms that the file processing operation completed without errors
 * Validates the presence of specific success indicator text
 * 
 * @example
 * Then the file should be uploaded successfully
 */
Then('the file should be uploaded successfully', () => {
  // Check for a success message in the UI after upload
  cy.contains('File processed successfully!').should('be.visible');
});