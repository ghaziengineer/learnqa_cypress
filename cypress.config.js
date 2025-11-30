// Import the defineConfig function from Cypress to create configuration
const { defineConfig } = require("cypress");

// Import the esbuild bundler for processing test files
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

// Import Cucumber preprocessor plugin for BDD testing
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

// Import esbuild plugin specifically for Cucumber preprocessor
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// Import Node.js file system module for file operations
const fs = require('fs');

// Import xlsx library for Excel file manipulation
const xlsx = require('xlsx');

// Export the Cypress configuration object
module.exports = defineConfig({
  // End-to-End testing configuration
  e2e: {
    // Base URL for all tests - all relative URLs will be prefixed with this
    baseUrl: "https://www.learnaqa.info",

    // Pattern to find test files - looks for all .feature files in e2e directory
    specPattern: "cypress/e2e/**/*.feature",

    // Path to the support file that runs before tests
    supportFile: 'cypress/support/e2e.js',

    // Use 'spec' reporter to see step-by-step in terminal
    reporter: "spec",

    // Async function to set up Node events and plugins
    async setupNodeEvents(on, config) {
      // Initialize Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Preprocessor for esbuild + cucumber
      // Sets up file preprocessing for .feature files
      on(
        "file:preprocessor",  // Cypress event for file processing
        // Create bundler with esbuild and Cucumber plugin
        createBundler({
          plugins: [createEsbuildPlugin(config)],  // Array of plugins
        })
      );

      // Register custom tasks that can be called from test code
      on('task', {
        // Task to list files in a directory (used for download verification)
        listFiles(downloadsFolder) {
          try {
            // Check if directory exists
            if (!fs.existsSync(downloadsFolder)) {
              return [];  // Return empty array if directory doesn't exist
            }
            // Read and return directory contents
            return fs.readdirSync(downloadsFolder);
          } catch (error) {
            // Return empty array on any error
            return [];
          }
        },

        // Task to read and parse Excel files
        readExcelFile(filePath) {
          try {
            // Check if file exists
            if (!fs.existsSync(filePath)) {
              throw new Error(`File not found: ${filePath}`);
            }

            // Read Excel workbook from file
            const workbook = xlsx.readFile(filePath);
            // Get the first sheet name from the workbook
            const sheetName = workbook.SheetNames[0];
            // Get the worksheet object
            const worksheet = workbook.Sheets[sheetName];
            // Convert sheet data to JSON format
            const data = xlsx.utils.sheet_to_json(worksheet);

            // Get headers from the first row separately
            const headers = [];
            // Decode the worksheet range (e.g., A1:D10)
            const range = xlsx.utils.decode_range(worksheet['!ref']);
            // Loop through columns in the first row to extract headers
            for (let C = range.s.c; C <= range.e.c; ++C) {
              // Encode cell address (e.g., A1, B1, C1, etc.)
              const cellAddress = xlsx.utils.encode_cell({ r: range.s.r, c: C });
              // Get cell data
              const cell = worksheet[cellAddress];
              // If cell exists and has value, add to headers array
              if (cell && cell.v) {
                headers.push(cell.v);
              }
            }

            // Return both headers and data rows
            return { headers, rows: data };
          } catch (error) {
            // Log error and return null if file reading fails
            console.error('Error reading Excel file:', error);
            return null;
          }
        }
      });

      // Log each failed step with stack trace after each spec file runs
      on("after:spec", (spec, results) => {
        // Loop through all tests in the spec
        results.tests.forEach((test) => {
          // Loop through all attempts for each test (retries)
          test.attempts.forEach((attempt) => {
            // Check if the attempt failed
            if (attempt.state === "failed") {
              // Log failure details with emoji for visibility
              console.log("❌ Test failed:", test.title.join(" > "));
              // Log the error message and stack trace
              console.log("   Error:", attempt.displayError);
            }
          });
        });
      });

      // Return the modified config object
      return config;
    },
  },
});