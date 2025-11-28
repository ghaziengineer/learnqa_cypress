import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { dynamicElementsPage } from "../pages/DynamicElementsPage";



Then('I should see the delayed element appear', () => {
  dynamicElementsPage.verifyDelayedElementAppears(5000);
});


Then('I should see the loading indicator', () => {
  dynamicElementsPage.verifyLoadingIndicator();
});

Then('I should wait for AJAX data to load successfully', () => {
  dynamicElementsPage.waitForAJAXDataToLoad();
});

Then('I should verify the loaded AJAX content', () => {
  dynamicElementsPage.verifyAJAXContent();
});

When('I scroll down to the lazy loading images section', () => {
  dynamicElementsPage.scrollToLazyLoadingSection();
});

Then('I should see some images are loaded and some are placeholders', () => {
  dynamicElementsPage.verifyInitialLazyLoadState();
});

When('I scroll down to load more images', () => {
  dynamicElementsPage.scrollToLoadMoreImages();
});

Then('I should see more images loaded', () => {
  dynamicElementsPage.verifyMoreImagesLoaded();
});





When('I scroll to the infinite scroll section', () => {
  dynamicElementsPage.scrollToInfiniteScrollSection();
});

Then('I should see the first 10 items loaded', () => {
  dynamicElementsPage.verifyInitialItemsLoaded();
});

When('I scroll to the bottom of the infinite scroll container', () => {
  dynamicElementsPage.scrollToBottomOfInfiniteScroll();
});

Then('I should see more items loaded automatically', () => {
  dynamicElementsPage.verifyMoreItemsLoaded();
});

When('I continue scrolling to load all pages', () => {
  dynamicElementsPage.scrollToLoadAllPages();
});

Then('I should see all 50 items loaded', () => {
  dynamicElementsPage.verifyAllItemsLoaded();
});

Then('I should see the "No more items to load" message', () => {
  dynamicElementsPage.verifyNoMoreItemsMessage();
});