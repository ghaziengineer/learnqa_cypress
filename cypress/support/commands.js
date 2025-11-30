// NOTE: This does NOT affect real users. Animations still work normally in production.
// This ONLY disables animations in Cypress tests to increase stability.
/**
 * Disable all CSS animations and transitions during Cypress tests.
 *
 * Why?
 * - Eliminates flaky tests caused by fade-in / slide / opacity animations.
 * - Ensures elements become immediately visible for stable assertions.
 * - Does NOT change real application logic (only visuals).
 */

// Override Cypress's built-in 'visit' command to inject CSS that disables animations
// This uses Cypress.Commands.overwrite to modify the behavior of the existing 'visit' command
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // Call the original visit function but with custom onBeforeLoad hook
  return originalFn(url, {
    // Spread any existing options to maintain backward compatibility
    ...options,
    // onBeforeLoad hook executes before the page finishes loading
    onBeforeLoad(win) {
      // Create a new <style> HTML element that will contain our CSS rules
      const style = win.document.createElement('style');
      
      // Set the CSS content that will disable all animations and transitions
      style.innerHTML = `
        /* Apply these rules to ALL elements on the page */
        * {
          /* Disable all CSS transitions with !important to override any existing styles */
          transition: none !important;
          /* Disable all CSS animations with !important to override any existing styles */
          animation: none !important;
        }
      `;
      
      // Inject the style element into the <head> of the document
      // This happens before the application loads, ensuring animations are disabled from the start
      win.document.head.appendChild(style);
      
      // If the original options had its own onBeforeLoad, call it too
      if (options && options.onBeforeLoad) {
        options.onBeforeLoad(win);
      }
    }
  });
});