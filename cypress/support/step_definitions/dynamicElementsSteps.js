import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { dynamicElementsPage } from "../pages/DynamicElementsPage";



Then('I should see the delayed element appear', () => {
  dynamicElementsPage.verifyDelayedElementAppears(5000);
});
