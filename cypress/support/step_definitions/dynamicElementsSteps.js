// Import Cucumber step definition functions from the preprocessor package
import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Import the dynamic elements page object model for element interactions
import { dynamicElementsPage } from "../pages/DynamicElementsPage";

// Define a Cucumber Then step to verify delayed element appears within timeout
Then('I should see the delayed element appear', () => {
  // Call page object method to verify delayed element appears within 7 seconds
  dynamicElementsPage.verifyDelayedElementAppears(7000);
});

// Define a Cucumber Then step to verify loading indicator is visible
Then('I should see the loading indicator', () => {
  // Call page object method to verify loading spinner and disabled button state
  dynamicElementsPage.verifyLoadingIndicator();
});

// Define a Cucumber Then step to wait for AJAX data loading to complete
Then('I should wait for AJAX data to load successfully', () => {
  // Call page object method to wait for loading state to clear and normal button to return
  dynamicElementsPage.waitForAJAXDataToLoad();
});

// Define a Cucumber Then step to verify AJAX content is loaded and visible
Then('I should verify the loaded AJAX content', () => {
  // Call page object method to verify AJAX container is visible with loaded items
  dynamicElementsPage.verifyAJAXContent();
});

// Define a Cucumber When step to scroll to the lazy loading images section
When('I scroll down to the lazy loading images section', () => {
  // Call page object method to scroll to lazy loading container and verify visibility
  dynamicElementsPage.scrollToLazyLoadingSection();
});

// Define a Cucumber Then step to verify initial lazy load state with mixed images and placeholders
Then('I should see some images are loaded and some are placeholders', () => {
  // Call page object method to verify container visibility and initial placeholder count
  dynamicElementsPage.verifyInitialLazyLoadState();
});

// Define a Cucumber When step to trigger loading of more images by scrolling
When('I scroll down to load more images', () => {
  // Call page object method to scroll to bottom of container and wait for image loading
  dynamicElementsPage.scrollToLoadMoreImages();
});

// Define a Cucumber Then step to verify additional images loaded after scrolling
Then('I should see more images loaded', () => {
  // Call page object method to verify actual images with src attributes are now loaded
  dynamicElementsPage.verifyMoreImagesLoaded();
});

// Define a Cucumber When step to scroll to the infinite scroll section
When('I scroll to the infinite scroll section', () => {
  // Call page object method to scroll to infinite scroll container and verify visibility
  dynamicElementsPage.scrollToInfiniteScrollSection();
});

// Define a Cucumber Then step to verify initial batch of items is loaded
Then('I should see the first 10 items loaded', () => {
  // Call page object method to verify exactly 10 items with correct content are loaded
  dynamicElementsPage.verifyInitialItemsLoaded();
});

// Define a Cucumber When step to trigger infinite scroll by scrolling to bottom
When('I scroll to the bottom of the infinite scroll container', () => {
  // Call page object method to scroll to bottom and wait for new items to load
  dynamicElementsPage.scrollToBottomOfInfiniteScroll();
});

// Define a Cucumber Then step to verify additional items loaded automatically
Then('I should see more items loaded automatically', () => {
  // Call page object method to verify at least 20 items total and page 2 items exist
  dynamicElementsPage.verifyMoreItemsLoaded();
});

// Define a Cucumber When step to recursively scroll until all items are loaded
When('I continue scrolling to load all pages', () => {
  // Call page object method that uses recursive scrolling to load all 50 items
  dynamicElementsPage.scrollToLoadAllPages();
});

// Define a Cucumber Then step to verify all 50 items are completely loaded
Then('I should see all 50 items loaded', () => {
  // Call page object method to verify exactly 50 items with proper pagination
  dynamicElementsPage.verifyAllItemsLoaded();
});

// Define a Cucumber Then step to verify the end of content message appears
Then('I should see the "No more items to load" message', () => {
  // Call page object method to verify the end message is visible after all items loaded
  dynamicElementsPage.verifyNoMoreItemsMessage();
});