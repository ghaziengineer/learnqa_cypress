const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

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

      // Optional: Log each failed step with stack trace
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
