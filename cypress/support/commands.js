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
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {
    ...options,
    onBeforeLoad(win) {
      // Create a <style> element that disables animations globally
      const style = win.document.createElement('style');
      style.innerHTML = `
        * {
          transition: none !important;
          animation: none !important;
        }
      `;
      // Inject the style into the page <head> before the app loads
      win.document.head.appendChild(style);
    }
  });
});
