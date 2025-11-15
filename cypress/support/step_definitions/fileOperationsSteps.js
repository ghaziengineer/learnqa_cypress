import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fileOperationsPage } from "../pages/FileOperationsPage";




Then('the template Excel file should be downloaded successfully', () => {
  fileOperationsPage.verifyDownload(/^template.*\.xlsx$/, 'downloadedTemplateFile');
})