import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { footerPage } from "../pages/FooterPage.js";
import { homePage } from "../pages/HomePage.js";



Given("I scroll down to the footer section", () => {
  footerPage.scrollToFooter();
});

When("I click on the {string} link", (linkName) => {
  footerPage.clickLink(linkName);
});

Then("I should be redirected to the {string} page", (pageType) => {
  if (pageType.toLowerCase().includes("privacy")) {
    footerPage.verifyRedirection("/privacy/");
  } else if (pageType.toLowerCase().includes("terms")) {
    footerPage.verifyRedirection("/terms/");
  }
});

Then("the page should contain the text {string}", (expectedText) => {
  footerPage.verifyTextVisible(expectedText);
});

Then("a new tab should open with the provider's LinkedIn profile", () => {
  footerPage.clickLink("LinkedIn");
});
