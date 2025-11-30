// Import Cucumber step definition functions from the preprocessor package
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Import the file operations page object model for file-related interactions
import { fileOperationsPage } from "../pages/FileOperationsPage";

/**
 * Verifies that the template Excel file has been downloaded successfully
 * Uses regex pattern matching to identify the downloaded template file
 * Aliases the downloaded file for use in subsequent verification steps
 * 
 * @example
 * Then the template Excel file should be downloaded successfully
 */
// Define a Cucumber Then step to verify Excel template file download
Then('the template Excel file should be downloaded successfully', () => {
  // Call page object method to verify download with regex pattern matching
  // Pattern matches files starting with "template" and ending with ".xlsx" extension
  // The 'downloadedTemplateFile' alias stores the filename for later use
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
// Define a Cucumber Then step to verify Excel file column structure
Then('the file should contain the expected columns:', (dataTable) => {
  // Extract expected column names from the data table and flatten to array
  // dataTable.rawTable returns a 2D array, map gets first element of each row
  const expectedColumns = dataTable.rawTable.map(row => row[0]);
  
  // Retrieve the downloaded filename from the previously set alias
  cy.get('@downloadedTemplateFile').then((fileName) => {
    // Call page object method to verify Excel file contains expected columns
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
// Define a Cucumber Then step for selecting and uploading a valid file
Then('I select a valid file', (dataTable) => {
  // Extract file type and file name from the data table
  const rows = dataTable.rawTable;
  // Support both vertical and horizontal table formats
  let fileType, fileName;
  
  // Check if data table is in vertical format (two rows, one column each)
  if (rows[0][0].toLowerCase() === 'excel') {
    fileType = rows[0][0].toLowerCase(); // First row: file type
    fileName = rows[1][0];               // Second row: file name
  } else {
    // If table is horizontal (one row, two columns: | type | name |)
    fileType = rows[0][0].toLowerCase(); // First column: file type
    fileName = rows[0][1];               // Second column: file name
  }

  // Only proceed if fileType is 'excel' and fileName is defined
  if (fileType === 'excel' && fileName) {
    // Call page object method to upload the specified file
    fileOperationsPage.uploadFile(fileName);
  } else {
    // Throw error if file type is not excel or file name is missing
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
// Define an alternative Cucumber Then step with colon syntax for file selection
Then('I select a valid file :', function (dataTable) {
  // Extract file type and file name from the data table
  const rows = dataTable.rawTable;
  let fileType, fileName;
  
  // Support vertical table format (two rows, one column each)
  if (rows.length === 2 && rows[0][0].toLowerCase() === 'excel') {
    fileType = rows[0][0].toLowerCase(); // First row: file type
    fileName = rows[1][0];               // Second row: file name
  } 
  // Support horizontal table format (one row, two columns)
  else if (rows.length === 1 && rows[0].length === 2) {
    fileType = rows[0][0].toLowerCase(); // First column: file type
    fileName = rows[0][1];               // Second column: file name
  } else {
    // Throw error if data table format is not recognized
    throw new Error('Unrecognized data table format for file selection');
  }

  // Only proceed if fileType is 'excel' and fileName is defined
  if (fileType === 'excel' && fileName) {
    // Call page object method to upload the specified file
    fileOperationsPage.uploadFile(fileName);
  } else {
    // Throw error if file type is not excel or file name is missing
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
// Define a Cucumber Then step to verify successful file upload
Then('the file should be uploaded successfully', () => {
  // Check for a success message in the UI after upload
  // This verifies that the file was processed without errors
  cy.contains('File processed successfully!').should('be.visible');
});