import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/HomePage.js";

Given("I open the homepage", () => {
  homePage.visit();
});

Then("I should see the homepage title {string}", (titleText) => {
  homePage.elements.title().should("contain.text", titleText);
});

Then("I should see buttons {string} and {string}", (signIn, signUp) => {
  homePage.elements.signInButton().should("contain.text", signIn);
  homePage.elements.signUpButton().should("contain.text", signUp);
});

Then("I should see the {string} option", (option) => {
  homePage.elements.tryWithoutAccountButton().should("contain.text", option);
});
