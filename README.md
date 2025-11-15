# 🎯LearnaQa Platform – UI & E2E Tests with Cypress, JavaScript & Cucumber

## Overview 📝
This project contains **end-to-end (E2E)** 🚀 and **UI 🎨 automation tests** for the **Learna QA Automation Platform** 🌐https://www.learnaqa.info/  
It is designed to help practice **real-world automation scenarios** 🧪  
**The tests are built with:**
- ⚡ **Cypress** – Fast and reliable end-to-end testing framework

- 🧩 **Cucumber (Gherkin)** – Behavior-driven testing for readable scenarios

- 💻 **JavaScript** – Programming language for automation logic

## Project Structure 📂
```
.
├───.github
│   └───workflows
├───cypress
│   ├───e2e
│   │   └───features
│   │       ├───homepage.feautre
│   │       ├───logout.feautre
│   │       ├───dragAndDrop.feautre
│   │       ├───footerLinks.feautre
│   │       └───signin.feautre
│   ├───fixtures
│   │   └───testData.json
│   ├───screenshots
│   └───support
│   │   ├───pages
│   │       ├───HomePage.js
│   │       ├───FooterPage.js
│   │       ├───DragAndDropPage.js
│   │       └───SignInPage.js
│   │   └───step_definitions
│   │       ├───commonSteps.js
│   │       ├───dragAndDropSteps.js
│   │       ├───footerLinksSteps.js
│   │       ├───homepageSteps.js
│   │       └───signinSteps.js
├───cypress.config.js
├───package.json
├───.gitignore
└── README.md
```
## Getting Started 🚀
**1.** Clone the repository:
```bash
git clone https://github.com/ghaziengineer/learnqa_cypress.git
```
**2.** Install dependencies:
```bash
npm install
```
**3.** Run tests:
```bash
npx cypress open
```
## ⚠️ Important Notes
- ⚙️ **Environment Setup** – Ensure Node.js and Cypress are properly installed before running any test.  
- 🗂️ **Test Data Setup** – Before running tests, copy the file cypress/fixtures/testData.template.json 👉 rename it to testData.json, and fill it with your actual credentials.
- 🏷️ **Tag Management** – Use tags (like @ui, @e2e, @valid etc...) 👉 to easily filter and run specific scenarios with commands such as:  
```bash
npx cypress run --env tags='@ui'
```

![Profile view counter on GitHub](https://komarev.com/ghpvc/?username=ghaziengineer)
