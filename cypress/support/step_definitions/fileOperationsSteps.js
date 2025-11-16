import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fileOperationsPage } from "../pages/FileOperationsPage";

/**
 * File Operations Step Definitions
 * Handles file download, upload, and validation scenarios for Excel file operations
 * 
 * @namespace fileOperationsSteps
 */

/**
 * Verifies successful download of the template Excel file
 * Validates that the downloaded file matches the expected filename pattern
 * Aliases the downloaded file for subsequent verification steps
 * 
 * @example
 * Then the template Excel file should be downloaded successfully
 * 
 * @see verifyDownload
 */
Then('the template Excel file should be downloaded successfully', () => {
  fileOperationsPage.verifyDownload(/^template.*\.xlsx$/, 'downloadedTemplateFile');
});

/**
 * Validates that the downloaded Excel file contains the expected column structure
 * Compares actual Excel file columns against expected columns from data table
 * Requires prior execution of download verification step to access aliased file
 * 
 * @param {DataTable} dataTable - Cucumber data table containing expected column names
 * @param {string[]} dataTable.rawTable - 2D array of column names to verify
 * 
 * @example
 * Then the file should contain the expected columns:
 *   | Column A |
 *   | Column B |
 *   | Column C |
 * 
 * @see verifyExcelColumns
 * @requires @downloadedTemplateFile - File alias from download verification step
 */
Then('the file should contain the expected columns:', (dataTable) => {
  const expectedColumns = dataTable.rawTable.map(row => row[0]);
  
  cy.get('@downloadedTemplateFile').then((fileName) => {
    fileOperationsPage.verifyExcelColumns(fileName, expectedColumns);
  });
});

/**
 * Consolidated file selection step that handles multiple data table formats
 * Supports both vertical and horizontal data table configurations
 * Validates file type and name before proceeding with upload
 * 
 * @param {DataTable} dataTable - Cucumber data table specifying file parameters
 * @param {string} dataTable.rawTable - File type and name in various table formats
 * 
 * @example
 * // Vertical format
 * Then I select a valid file:
 *   | excel |
 *   | test_data.xlsx |
 * 
 * // Horizontal format  
 * Then I select a valid file:
 *   | type   | name           |
 *   | excel  | test_data.xlsx |
 * 
 * // Alternative syntax with colon
 * Then I select a valid file :
 *   | excel |
 *   | sample_data.xlsx |
 * 
 * @throws {Error} When file type is not 'excel', file name is undefined, or data table format is unrecognized
 * @see uploadFile
 */
Then('I select a valid file{optional_colon}', function (dataTable) {
  const rows = dataTable.rawTable;
  let fileType, fileName;

  // Determine data table format and extract parameters
  if (rows.length === 2 && rows[0].length === 1 && rows[0][0].toLowerCase() === 'excel') {
    // Vertical format: | excel | 
    //                 | filename.xlsx |
    fileType = rows[0][0].toLowerCase();
    fileName = rows[1][0];
  } else if (rows.length === 1 && rows[0].length === 2) {
    // Horizontal format: | type | name |
    fileType = rows[0][0].toLowerCase();
    fileName = rows[0][1];
  } else if (rows.length === 2 && rows[0].length === 2) {
    // Horizontal format with header: | type | name |
    //                               | excel | filename.xlsx |
    fileType = rows[1][0].toLowerCase();
    fileName = rows[1][1];
  } else {
    throw new Error(`Unrecognized data table format for file selection. Found ${rows.length} rows with ${rows[0]?.length} columns`);
  }

  // Validate parameters and execute upload
  if (fileType === 'excel' && fileName && fileName.trim() !== '') {
    fileOperationsPage.uploadFile(fileName);
  } else {
    throw new Error(`Invalid file parameters - type: '${fileType}', name: '${fileName}'`);
  }
});

/**
 * Verifies successful file upload by checking for success confirmation in UI
 * Validates that the file processing completed without errors
 * Looks for specific success message elements after upload operation
 * 
 * @example
 * Then the file should be uploaded successfully
 * 
 * @see contains - Cypress command for text verification
 */
Then('the file should be uploaded successfully', () => {
  // Check for a success message in the UI after upload
  cy.contains('File processed successfully!').should('be.visible');
});

/**
 * Custom parameter type registration for optional colon in step definitions
 * Enables flexible step matching with or without trailing colon
 */
const { defineParameterType } = require("@badeball/cypress-cucumber-preprocessor");

defineParameterType({
  name: "optional_colon",
  regexp: /:?/,
  transformer: (s) => s
});