const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require('fs');
const xlsx = require('xlsx'); // ✅ ADD THIS

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.learnaqa.info",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: false,

    // Use 'spec' reporter to see step-by-step in terminal
    reporter: "spec",

    async setupNodeEvents(on, config) {
      // Cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Preprocessor for esbuild + cucumber
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on('task', {
        listFiles(downloadsFolder) {
          try {
            if (!fs.existsSync(downloadsFolder)) {
              return [];
            }
            return fs.readdirSync(downloadsFolder);
          } catch (error) {
            return [];
          }
        },

        // ✅ ADD THIS TASK ONLY
        readExcelFile(filePath) {
          try {
            if (!fs.existsSync(filePath)) {
              throw new Error(`File not found: ${filePath}`);
            }
            
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
            
            // Get headers from the first row
            const headers = [];
            const range = xlsx.utils.decode_range(worksheet['!ref']);
            for (let C = range.s.c; C <= range.e.c; ++C) {
              const cellAddress = xlsx.utils.encode_cell({ r: range.s.r, c: C });
              const cell = worksheet[cellAddress];
              if (cell && cell.v) {
                headers.push(cell.v);
              }
            }
            
            return { headers, rows: data };
          } catch (error) {
            console.error('Error reading Excel file:', error);
            return null;
          }
        }
      });

      // Log each failed step with stack trace
      on("after:spec", (spec, results) => {
        results.tests.forEach((test) => {
          test.attempts.forEach((attempt) => {
            if (attempt.state === "failed") {
              console.log("❌ Test failed:", test.title.join(" > "));
              console.log("   Error:", attempt.displayError);
            }
          });
        });
      });

      return config;
    },
  },
});