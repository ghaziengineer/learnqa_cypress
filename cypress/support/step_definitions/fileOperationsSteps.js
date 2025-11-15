import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fileOperationsPage } from "../pages/FileOperationsPage";




Then('the template Excel file should be downloaded successfully', () => {
  fileOperationsPage.verifyDownload(/^template.*\.xlsx$/, 'downloadedTemplateFile');
})

Then('the file should contain the expected columns:', (dataTable) => {
  const expectedColumns = dataTable.rawTable.map(row => row[0]);
  
  cy.get('@downloadedTemplateFile').then((fileName) => {
    fileOperationsPage.verifyExcelColumns(fileName, expectedColumns);
  });
});